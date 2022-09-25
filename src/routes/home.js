const express = require('express');
const { Router } = express;
const homeControll = require('../controllers/home');
const homeProd = Router();

homeProd.get('/', homeControll.getAllProducts);

module.exports = homeProd;