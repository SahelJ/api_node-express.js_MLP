//Imports
const express = require('express');
const utilisateursCtrl = require('./routes/utilisateursCtrl');

//Routes
exports.router = (function() {
    const apiRouter = express.Router();

    // Utilisateurs routes
    apiRouter.route('/utilisateur/register/').post(utilisateursCtrl.register);
    apiRouter.route('/utilisateur/login/').post(utilisateursCtrl.login);
    apiRouter.route('/utilisateur/profile/').get(utilisateursCtrl.getUserProfile);
    apiRouter.route('/utilisateur/profile/').put(utilisateursCtrl.updateUtilisateurProfile);

    //Foyer routes
    

    return apiRouter;
})();