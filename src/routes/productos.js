const express = require('express');
const { Router } = express;
const prodControll = require('../controllers/productos');
const routerProd = Router();


routerProd.get('/', prodControll.verProductos);
//routerProd.post('/productos', prodControll)
//routerProd.get('/', prodControll);
//routerProd.post('/productos:id', prodControll);

module.exports = routerProd;