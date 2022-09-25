const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function logInUser() {
    passport.use('logIn', new LocalStrategy(
        (username, password, callback) => {
            UserModel.findOne({ username: username }, (err, user) => {
                if (err) {
                    return callback(err)
                }
    
                if (!user) {
                    console.log('No se encontro usuario');
                    return callback(null, false)
                }
    
                if(!validatePass(user, password)) {
                    console.log('Invalid Password');
                    return callback(null, false)
                }
    
                return callback(null, user)
            })
        }
    ))
};

function signUpUser() {
    passport.use('signUp', new LocalStrategy(
        {passReqToCallback: true}, (req, username, password, callback) => {
            UserModel.findOne({ username: username }, (err, user) => {
                if (err) {
                    console.log('Hay un error al registrarse');
                    return callback(err)
                }
    
                if (user) {
                    console.log('El usuario ya existe');
                    return callback(null, false)
                }
    
                console.log(req.body);
    
                const newUser = {
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    email: req.body.email,
                    username: username,
                    password: createHash(password)
                }
                console.log(newUser);
                UserModel.create(newUser, (err, userWithId) => {
                    if (err) {
                        console.log('Hay un error al registrarse');
                        return callback(err)
                    }
                    console.log(userWithId);
                    console.log('Registro de usuario satisfactoria');
                    return callback(null, userWithId)
                })
            })
        }
    ))
}
  
module.exports = {logInUser, signUpUser}