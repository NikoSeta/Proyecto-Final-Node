const ProductosDAO = require(`../daos/productos/ProductosDAO`);
const CarritoDAO = require(`../daos/carritos/CarritoDAO`);

const getStorage = () => {
    return {
        productos: new ProductosDAO(),
        carrito: new CarritoDAO()
    }
}

module.exports = getStorage;