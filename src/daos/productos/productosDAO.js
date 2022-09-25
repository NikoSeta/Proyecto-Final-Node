const iniciarMongo = require(`../../dataBase/mongo/connectMongoDB`);
const productsModel = require(`../../dataBase/models/productosMongo`);

const CrudMongoDB = require(`../../dataBase/contenedores/contenedorProductos`);

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(iniciarMongo, productsModel);
    };
};

module.exports = ProductosDAOMongoDB;