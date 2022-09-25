const express = require('express');
const { Router } = express;
const carrito = require('../controllers/carrito');
const routerCart = Router();

// CARRITO
routerCart.get('/', carrito.getAllProductsByIdCart);
routerCart.post('/cart:id', carrito.addProduct);
routerCart.delete('/prod/:id', carrito.deleteProductById);
routerCart.put('/prod-cart:id', carrito.createCart);
routerCart.delete('/prod-cart:id', carrito.deleteCartById);


module.exports = routerCart;