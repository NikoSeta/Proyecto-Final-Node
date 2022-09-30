const express = require('express');
const prodControll = require('../controllers/productos');
const routerProd = express.Router();

// Trae todos los productos
routerProd.get('/', prodControll.getAllProducts);
// Trae UN producto
routerProd.get('/:id', prodControll.getProductById);
// Cargo un producto nuevo
routerProd.put('/:id', prodControll.updateProductById);
// Agrego un producto a la BBDD
routerProd.post('/', prodControll.addProduct);
//Borrar un producto por ID
routerProd.delete('/:id', prodControll.deleteProductById);

module.exports = routerProd;