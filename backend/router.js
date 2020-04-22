const express = require('express');
const passport = require('passport');  //authentication middleware for Node

const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_OWNER = require('./constants').ROLE_OWNER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;

const AuthenticationController = require('./controllers/authenticatoin');

const passportService = require('./config/passport');

const requireAuth = passport.authenticate('jwt', {session:false});
const requireLogin = passport.authenticate('local', {session:false});


module.exports = function (app) {
    const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        userRoutes = express.Router();


    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login',requireLogin, AuthenticationController.login);

    app.use('/api', apiRoutes);
}