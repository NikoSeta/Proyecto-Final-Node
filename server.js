//Servidor Express
const express = require('express');
const app = express();
//HTTP server para Socket.IO
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
//Session
const session = require('express-session');
const passport = require('passport');
const { TIEMPO_EXPIRACION } = require('./src/config/globals');
const LocalStrategy = require('passport-local').Strategy;
const { userModel } = require('./src/dataBase/models/usuariosMongo');
const log = require('./src/controllers/session');
const { createHash } = require ('./src/utils/hashGenerator');
//Mensajería
const mensajesModel = require('./src/dataBase/models/mensajesMongo');
const messages = mensajesModel;
//Puerto
const { PORT } = require ('./src/config/globals') || process.env.PORT;
//Routs
const routerCart = require('./src/routes/carrito');
const routerProd = require('./src/routes/productos');
const { infoNode } = require('./src/dataBase/models/infoSistema');
const { multiServer } = require('./src/services/cluster');

//Creación de servidores con Cluster
//multiServer();

//Session
app.use(session({
    secret: 'keyboard cat',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: parseInt(TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
   })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use(express.static(__dirname + "/partial"));
app.use(passport.initialize());
app.use(passport.session());

//Login de usuario existente
passport.use('logIn', new LocalStrategy(
    (username, password, callback) => {
        userModel.findOne({ username: username }, (err, user) => {
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
));
// Signup de nuevo usuario
passport.use('signUp', new LocalStrategy(
    {passReqToCallback: true}, (req, username, password, callback) => {
        userModel.findOne({ username: username }, (err, user) => {
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
            userModel.create(newUser, (err, userWithId) => {
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

// RUTAS
app.use('/cart', routerCart);
app.use('/', routerProd);
//  INDEX
app.get('/session', log.getRoot);
//  LOGIN
app.get('/logIn', log.getLogin);
app.post('/logIn', passport.authenticate('logIn', { failureRedirect: '/failLogIn' }), log.postLogin);
app.get('/failLogIn', log.getFaillogin);
//  SIGNUP
app.get('/signUp', log.getSignup);
app.post('/signUp', passport.authenticate('signUp', { failureRedirect: '/failSignUp' }), log.postSignup);
app.get('/failSignUp', log.getFailsignup);
//  LOGOUT
app.get('/logOut', log.getLogout);
// PROFILE
app.get('/profileUser', log.getProfile);
app.get('/ruta-protegida', log.checkAuthentication, (req, res) => {
    res.render('protected')
});
//Passport-local
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    user.findById(id, done);
});

// Mensajería SOCKET.IO
app.get('/chat', (req, res)=>{
    io.on('connection', socket => {
        socket.emit('messages', 'Bienvenido usuario');
        
        socket.broadcast.emit('messages', 'Usuario se ha conectado al chat')

        socket.on('disconnect', function () {
            console.log('Usuario desconectado');
        });
        socket.on('chatMessage', msg =>{
            console.log(msg);
        })
    });
    res.render('chat')
});

// INFO SISTEMA
app.get('/info', (req, res)=>{
    res.render('infoSistema', {infoNode: infoNode})
});
// Error 404
app.get('*', (req, res) =>{
    res.render('routing-err')
});
// SERVIDOR ESCUCHANDO
server.listen(PORT, () => {
    console.log(`Ir a la página http://localhost:${PORT}`);
});
server.on('error', error => console.log(`Error en el servidor ${error}`))