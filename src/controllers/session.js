
const main = 'logg/main';
const profile = 'profile';
const login = 'logg/login';
const signup = 'logg/signup';
const logError = 'logg/login-err';
const signError = 'logg/signup-err';
const routError = 'routing-err';

function getRoot(req, res) {
    res.render(main)
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect(profile)
    } else {
        res.render(login);
    }
}

function getSignup(req, res) {
    res.render(signup);
}

function postLogin (req, res) {
    if (req.isAuthenticated()) {
        res.redirect(profile)
    } else {
        res.redirect(login)
    }
}

function postSignup (req, res) {
    if (req.isAuthenticated()) {
        res.redirect(profile)
    } else {
        res.redirect(login)
    }
}

function getProfile (req, res) {
    if (req.isAuthenticated()) {
        let user = req.user;
        res.render('logg/profile', { user: user, isUser:true })
    } else {
        res.redirect(login)
    }
}

function getFaillogin (req, res) {
    console.log('logg/error en login');
    res.render(logError, {});
}

function getFailsignup (req, res) {
    console.log('logg/error en signup');
    res.render(signError, {});
}

function getLogout (req, res) {
    req.logout( (err) => {
        if (!err) {
            res.render(main);
        } 
    });
}

function failRoute(req, res){
    res.status(404).render(routError, {});
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect(login);
    }
}

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup,
    checkAuthentication,
    getProfile
}