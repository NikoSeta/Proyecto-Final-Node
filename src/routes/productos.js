const express = require('express');
const { Router } = express;
const prodControll = require('../controllers/productos');
const routerProd = Router();

// Trae todos los productos
routerProd.get('/', prodControll.verProductos);
// Trae UN producto
routerProd.get('/:id', prodControll.verUnProducto);
// Cargo un producto nuevo
routerProd.put('/id', prodControll.agregarProd);
// Agrego un producto a la BBDD
routerProd.post('/', prodControll.agregarProd);
//Borrar un producto por ID
routerProd.delete('/:id', prodControll.borrarUnProd);

module.exports = routerProd;