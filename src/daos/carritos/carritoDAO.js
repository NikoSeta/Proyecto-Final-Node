const iniciarMongo = require(`../../dataBase/mongo/connectMongoDB`);

const carritoModel = require(`../../dataBase/models/carritoMongo`);
const productsModel = require(`../../dataBase/models/productosMongo`);

const CrudMongoDB = require(`../../dataBase/contenedores/contenedorCarrito`);

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(iniciarMongo, carritoModel, productsModel);
    };
};

module.exports = CarritoDAOMongoDB;