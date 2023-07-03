const jwt = require('jsonwebtoken');

const JWT_SING_SECRET = "nfefmzoekfmoknÖMmjsjdndjnezkefnvjnzlefnzkjnurozefplecnvjnezoekffejnzef"

//Fonction exportée
module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            idUtilisateur: userData.id,
            usAdmin: userData.isAdmin
        },
        JWT_SING_SECRET,
        {
            expiresIn: '1h'
        })
    },
    parseAuthorization: function(authorization){
        return (authorization != null) ? authorization.replace('Bearer', '') : null;
    },
    getUtilisateurid: function(authorization){
        var idUtilisateur = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null){
            try{
                var jwtToken = jwt.verify(token, JWT_SING_SECRET);
                if(jwtToken != null)
                    idUtilisateur = jwtToken.idUtilisateur;
            }catch(err) {}
        }
        return idUtilisateur;
    }
}