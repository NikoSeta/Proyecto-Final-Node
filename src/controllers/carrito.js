const carritoMongo = require('../models/carritoMongo');
const CartMongoDB = require ('../contenedores/contenedorCarrito');
const carrito = new CartMongoDB;


const verCarrito = async (req, res) => {
    try {
        let idCart = req.params.id;
        let productsbyId = await carrito.getProductsByID(idCart);
        if (productsbyId.length == 0) {
            res.render('product/carrito')
        }
    } catch (err) {
        console.log('No hay productos en el carrito', err);
    }
};

const createCart = async (req, res) => {
    try {
        const id = await carrito.createCart();
        console.log(`Nuevo carrito creado`);
    } catch (err) {
        console.log(`Error al crear el carrito ${err}`);;
    }
};

const agregarAlCarrito = async (req, res) => {
    try {
        let idCart = req.params.idCar;
        let idProduct = req.params.idProd;
        await carrito.addProduct(idCart, idProduct);
        res.render('product/carrito')
        console.log(`Se agregó el producto con id ${idProduct} al carrito con id ${idCart}`);
    } catch (err) {
        console.log(`Error al agregar un producto ${err}`);
    }
};

const borrarCarrito = async (req, res) => {
    try {
        const idCart = req.params.id;

        await carrito.deleteCartById(idCart);
        res.render('product/carrito')
        console.log(`Se eliminó el carrito de forma correcta`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al eliminar el carrito ${err}`
        });
    }
};

const borrarDelCarrito = async (req, res) => {
    try {
        const idCart = req.params.id;
        const idProduct = req.params.id_prod;

        await carrito.deleteProductById(idCart, idProduct);

        return res.json(`Producto  con ID: ${idProduct} del carrito con ID ${idCart} fue eliminado`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al eliminar un producto específico de un carrito ${err}`
        });
    }
};

module.exports = {
    createCart,
    verCarrito,
    agregarAlCarrito,
    borrarDelCarrito,
    borrarCarrito
}

