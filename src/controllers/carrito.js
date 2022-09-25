const storage = require(`../daos/index`);

let rutaError = 'routing-err';

const productsStorage = storage().carrito;

const getAllProductsByIdCart = async (req, res) => {
    try {
        let idCart = req.params.id;
        let productsbyId = await productsStorage.getProductsByID(idCart);
        res.render('carrito/carrito', {
            carrito: productsbyId
        });
    } catch (err) {
        res.render(rutaError)
        console.log(err);
    }
};

const createCart = async (req, res) => {
    try {
        const id = await productsStorage.createCart();
        return console.log(`Nuevo carrito creado`);
    } catch (err) {
        res.render(rutaError)
        console.log(`Error al crear el carrito ${err}`);
    }
};

const addProduct = async (req, res) => {
    try {
        let idCart = req.params.idCar;
        let idProduct = req.params.idProd;
        await productsStorage.addProduct(idCart, idProduct);
        res.render('carrito/carrito', {
            carrito: productsbyId
        });
        console.log(`Se agregó el producto con id ${idProduct} al carrito con id ${idCart}`);
    } catch (err) {
        res.render(rutaError)
        console.log(`Error al crear el carrito ${err}`);
    }
};

const deleteCartById = async (req, res) => {
    try {
        const idCart = req.params.id;

        await productsStorage.deleteCartById(idCart);
        console.log(`Se eliminó el carrito de forma correcta`);
    } catch (err) {
        res.render(rutaError)
        console.log(`Error al eliminar el carrito ${err}`)
    }
};

const deleteProductById = async (req, res) => {
    try {
        const idCart = req.params.id;
        const idProduct = req.params.id_prod;

        await productsStorage.deleteProductById(idCart, idProduct);

        console.log(`Producto  con ID: ${idProduct} del carrito con ID ${idCart} fue eliminado`);
    } catch (err) {
        res.render(rutaError)
        console.log(`Error al eliminar un producto específico de un carrito ${err}`)
    }
};

module.exports = {
    getAllProductsByIdCart,
    createCart,
    addProduct,
    deleteCartById,
    deleteProductById
};
