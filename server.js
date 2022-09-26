//Servidor Express
const express = require('express');
const app = express();
//HTTP server para Socket.IO
const { Server: HttpServer } = require('http');
const { Server:IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
//Session
const session = require('express-session');
const passport = require('passport');
const { TIEMPO_EXPIRACION } = require('./src/config/globals')

//Mensajería
const mensajesModel = require('./src/dataBase/models/mensajesMongo');
const messages = mensajesModel;
//Puerto
const { PORT } = require ('./src/config/globals') || process.env.PORT;
//Routs
const routerCart = require('./src/routes/carrito');
const routerProd = require('./src/routes/productos');
const routerLog = require('./src/routes/session');
const homeProd = require('./src/routes/home');

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

passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use(express.static(__dirname + "/partial"));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeProd);
app.use('/session', routerLog);
app.use('/cart', routerCart);
app.use('/productos', routerProd);

app.get('/chat', (req, res)=>{
    // Mensajería SOCKET.IO
    io.on('connection', (socket) => {
        console.log('Cliente conectado');
        socket.emit('messages', messages);
        socket.on('new-message', data => {
            messages.push(data);
            io.sockets.emit('messages', messages);
        })
        socket.on('disconnect', function () {
            console.log('Cliente desconectado');
        });
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
httpServer.listen(PORT, () => {
    console.log(`Ir a la página http://localhost:${PORT}/productos`);
});
httpServer.on('error', error => console.log(`Error en el servidor ${error}`))