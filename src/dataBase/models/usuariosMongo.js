const mongoose = require('mongoose');

const usuariosCollection = 'usuarios';

const UsuarioSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    date: {type: Number, require: true, max: 15}
});

let userModel = mongoose.model(usuariosCollection, UsuarioSchema)

module.exports = {userModel};