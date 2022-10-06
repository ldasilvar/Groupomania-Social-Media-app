const express = require('express');
const userCtrl = require('../controllers/user.js');
const auth = require('../middleware/auth.js');

exports.router = (function() {
    const Router = express.Router();

    Router.route('/users/signup/').post(userCtrl.signup);
    Router.route('/users/login/').post(userCtrl.login);
    Router.route('/users/myprofile/').get(auth, userCtrl.userProfil);
    Router.route('/users/:id/').delete(auth, userCtrl.userDelete);
    Router.route('/users/edit/:id').put(auth, userCtrl.userUpdate);

    return Router;
})();
