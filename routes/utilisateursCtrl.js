//imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models/');
const asyncLib = require('async');

//constantes de vérification
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^[a-zA-Z]\w{3,14}$/;

//Routes
module.exports = {
    register: function(req, res) {
        //parametres
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var token = req.body.token;
        var role = req.body.role;
        var picture = req.body.picture;

        //fonction de vérification de complétiion de champ
        if (username == null || email == null || password == null){
            return res.status(400).json({'error': 'parametre manquant'});
        }

        //fonction de vérification username
        if(username.length >= 13 || username.length <= 3){
            return res.status(400).json({'error': 'Votre username doit être compris entre 3 et 13 caractères'});
        }

        //fonction de vérification email
        if (!EMAIL_REGEX.test(email)){
            return res.status(400).json({'error': 'Votre email n\'est pas valide'});
        }

        //fonction de vérification password
        if (!PASSWORD_REGEX.test(password)){
            return res.status(400).json({'error': 'Votre mot de passe ne corresponds pas aux critères de base'});
        }

        models.Utilisateur.findOne({
            attributes: ['email'],
            where: {email: email}
        })
        .then(function(userFound){
            if (!userFound){
                bcrypt.hash(password, 5, function(err, bcryptedPassword){
                    var newUtilisateur = models.Utilisateur.create({
                        username: username,
                        email: email,
                        password: bcryptedPassword,
                        token: 'new',
                        role: 'user',
                        picture: ''
                    })
                    .then(function(newUtilisateur){
                        return res.status(201). json({
                            'idUtilisateur': newUtilisateur.id,
                        })
                    })
                    .catch(function(err){
                        return res.status(500).json({'error': 'ne peux pas ajouter un nouveau utilisateur'})
                    })
                });
            } else{
                return res.status(409).json({'error': 'le compte existe déja'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'error': 'impossible de vérifier le compte'});
        });
    },
    login: function(req, res) {
        
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null){
            return res.status(400).json({'error': 'parametre manquant'});
        }

        models.Utilisateur.findOne({
            where: {email: email}
        })
        .then(function(userFound){
            if (userFound){
               bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                if(resBycrypt){
                    return res.status(200).json({
                        'userId': userFound.id,
                        'token': jwtUtils.generateTokenForUser(userFound)
                    });
                } else{
                    return res.status(403).json({"error": "identifiants invalides"});
                }
               })
            } else{
                return res.status(409).json({'error': 'le compe n\'existe pas'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'error': 'impossible de vérifier le compte'});
        });
    },

    //Edition du profil
    getUserProfile: function(req, res){
        //auth header
        var headerAuth = req.headers['authorization'];
        var idUtilisateur = jwtUtils.getUtilisateurid(headerAuth);

        if(idUtilisateur < 0)
            return res.status(400).json({'error': 'Mauvais token'});

        models.Utilisateur.findOne({
            attributes: ['id', 'username', 'email', 'token', 'role', 'picture'],
            where: {id: idUtilisateur}
        }).then(function(user){
            if(user){
                res.status(201).json(user);
            }else{
                res.status(404).json({'error': 'utilisateur introuvable'});
            }
        }).catch(function(err){
            res.status(500).json({'error': 'impossible des récupérer des utilisateurs'})
        })
    },
    updateUtilisateurProfile: function(req, res){
        //GET Authorization header
        var headerAuth = req.headers['authorization'];
        var idUtilisateur = jwtUtils.getUtilisateurid(headerAuth);

        //Parametres
        var username = req.body.username;

        asyncLib.waterfall([
            function(done) {
                models.Utilisateur.findOne({
                    attributes: ['id', 'username'],
                    where: {id: idUtilisateur}
                }).then(function (userFound){
                    done(null,userFound);
                }).catch(function(err){
                    return res.status(500).json({'error': 'impossible de vérifier l\'utilisateur'});
                });
            },
            function(userFound, done){
                if(userFound){
                    userFound.update({
                        username: (username ? username: userFound.username)
                    }).then(function(){
                        done(userFound);
                    }).catch(function(err){
                        res.status(500).json({'error': 'impossible de mettre a jour l\'utilisateur'});
                    });
                }else{
                    res.status(400).json({'error': 'utilisateur introuvable'});
                }
            },
        ], function(userFound){
            if(userFound){
                return res.status(201).json(userFound);
            }else{
                return res.status(500).json({'error': 'impossible de mettre a jour le profile'});
            }
        })
    }
}