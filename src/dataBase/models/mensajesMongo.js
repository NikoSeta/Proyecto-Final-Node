const mongoose = require ("mongoose");

const mensajesCollection = 'mensajes';

const mensajesSchema = new mongoose.Schema({
    username: {type: String, required: true, max: 100},
    age: {type: Number, required: true},
    alias: {type: String, required: true, max: 100},
    avatar: {type: String, required: true, max: 250},
    text: {type: String, required: true, max: 500},
    time: {type: String, required: true, max: 50}
});

let mensajesModel = mongoose.model(mensajesCollection, mensajesSchema);

module.exports = {mensajesModel};