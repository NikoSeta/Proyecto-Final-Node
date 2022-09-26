const mongoose = require ("mongoose");

const carritoCollection = 'carrito';

const carritoSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    img: {type: String, required: true},
    date: {type: Number, required: true}
});

const cartModel = mongoose.model(carritoCollection, carritoSchema);

module.exports = {cartModel};