const carritoMongo = require('../models/carritoMongo');
const contenedorCarrito = require ('../contenedores/contenedorCarrito');
const carrito = new contenedorCarrito;

let nuevoCarrito = []

function verCarrito(req, res){
    nuevoCarrito = carrito.getAll();
    res.render('product/carrito', {
        carrito:carrito
    });  
}

function agregarAlCarrito(req, res) {
    let productoById = carrito.getById;
    if(productoById != null){
        productoById.push(carritoMongo);
        res.render('carrito/carrito',{ productoById: productoById })
    }else{
        console.log('No se pudo agregar al carrito');
    }
};

function borrarDelCarrito(req, res) {
    let id = req.params['id']
    carrito.delete(id)
}

module.exports = {
    verCarrito,
    agregarAlCarrito,
    borrarDelCarrito
}