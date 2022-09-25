const nodemailer = require('nodemailer');
const MAIL_ADM = require('../config/globals');
const CLIENT_ID = require('../config/globals');
const CLIENT_SECRET = require('../config/globals');
const REFRESH_TOKEN = require('../config/globals');
const ACCES_TOKEN = require('../config/globals');
const user = require('../dataBase/models/usuariosMongo');
const productoCarrito = require('../dataBase/models/carritoMongo');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: `${MAIL_ADM}`,
        type: 'OAuth2',
        clientId: `${CLIENT_ID}`,
        clientSecret: `${CLIENT_SECRET}`,
        refreshToken: `${REFRESH_TOKEN}`,
        accessToken: `${ACCES_TOKEN}`
    }
});

const mailNewUser = {
    from: 'Servidor de node.js',
    to: `${MAIL_ADM}`,
    subject: `${user.nombre}, compraste`,
    html:`<h1 style="margin-top: 35px;
            text-align: center;
            color:#ffc107;
            background-color: #212529;
            padding-bottom: 8px;
            border-radius: 10px;">
            Nuevo usuario creado
        </h1>
        <div>
            <p>Bienvenido ${user.username} a productos Node</p>
        </div>`
}

const mailNewSell = {
    from: 'Servidor de node.js',
    to: `${MAIL_ADM}`,
    subject: 'Nuevo usuario',
    html:`<h1 
            style="margin-top: 35px;
            text-align: center;
            color:#ffc107;
            background-color: #212529;
            padding-bottom: 8px;
            border-radius: 10px;">
            Compraste en Productos Node
        </h1>
        <div style="color: green">
        <p>${productoCarrito.name}</p>
        <p>${productoCarrito.date}</p>
        </div>`
}

async function sendMailNewUser() {
    try {
        const info = await transporter.sendMail(mailNewUser);
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}

async function sendMailForSell() {
    try {
        const info = await transporter.sendMail(mailNewSell);
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {sendMailNewUser, sendMailForSell}