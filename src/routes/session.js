const express = require('express');
const passport = require('passport');
const { Router } = express;
const log = require('../controllers/session')
const routerLog = Router();
const { logInUser, signUpUser } = require ('../services/passport');

logInUser();
signUpUser();

//  INDEX
routerLog.get('/', log.getRoot);
//  LOGIN
routerLog.get('/logIn', log.getLogin);
routerLog.post('/logIn', passport.authenticate('logIn', { failureRedirect: '/failLogIn' }), log.postLogin);
routerLog.get('/failLogIn', log.getFaillogin);
//  SIGNUP
routerLog.get('/signUp', log.getSignup);
routerLog.post('/signUp', passport.authenticate('signUp', { failureRedirect: '/failSignUp' }), log.postSignup);
routerLog.get('/failSignUp', log.getFailsignup);
//  LOGOUT
routerLog.get('/logOut', log.getLogout);
// PROFILE
routerLog.get('/profileUser', log.getProfile);
routerLog.get('/ruta-protegida', log.checkAuthentication, (req, res) => {
    res.render('protected')
});

module.exports = routerLog;