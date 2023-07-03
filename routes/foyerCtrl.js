//Imports
const models = require('../models/');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');

//Constantes


//Routes
module.exports = {
    createFoyer: function(req, res){
        //auth header
        var headerAuth = req.headers['authorization'];
        var idUtilisateur = jwtUtils.getUtilisateurid(headerAuth);

        //Parametres
        var name = req.body.name;
        var banner = req.body.banner;
        var region = req.body.region;
        var departement = req.body.departement;
        var ville = req.body.ville;
        var rue = req.body.rue;
        var numero = req.body.numero;

        //fonction de vérification de complétiion de champ
        if (name == null || region == null || departement == null || ville == null || rue == null || numero == null){
            return res.status(400).json({'error': 'parametre manquant'});
        }

        //fonction de vérification name
        if(name.length >= 13 || name.length <= 3){
            return res.status(400).json({'error': 'Le nom de votre foyer doit être compris entre 3 et 13 caractères'});
        }

        //fonction de vérification region
        if(region.length >= 60 || region.length <= 3){
            return res.status(400).json({'error': 'Ce champ ne peut comporter qu\'entre 2 et 60 caractères'});
        }

        //fonction de vérification departement
        if(departement.length >= 60 || departement.length <= 2){
            return res.status(400).json({'error': 'Ce champ ne peut comporter qu\'entre 2 et 60 caractères'});
        }

        //fonction de vérification ville
        if(ville.length >= 60 || ville.length <= 2){
            return res.status(400).json({'error': 'Ce champ ne peut comporter qu\'entre 2 et 60 caractères'});
        }

        //fonction de vérification rue
        if(rue.length >= 120 || rue.length <= 2){
            return res.status(400).json({'error': 'Ce champ doit être renseigné (max 120 caracteres)'});
        }

        //fonction de vérification numero
        if(numero.length >= 11 || numero.length <= 1){
            return res.status(400).json({'error': 'Ce champ doit être renseigné (max 11 caracteres)'});
        }

    },
    ListFoyer: function(req, res){
    
    }
}
