const getStorage = require(`../daos/index`);
let rutaError = 'routing-err';
const productsStorage = getStorage().productos;

const addProduct = async (req, res) => {
    try {
        const name = req.body.nombre;
        const price = Number(req.body.precio);
        const img = req.body.thumbnail;
        const date = new Date().toDateString();
        const stock = Number(req.body.stock);

        const newProducto = {
            timestamp: date,
            nombre: `${name}`,
            thumbnail: `${img}`,
            precio: price,
            stock: stock
        };
        const id = await productsStorage.save(newProducto);
        let products = await productsStorage.getAll();
        res.render('product/listaProductos', {
            products: products
        })
    } catch (err) {
        res.render(rutaError)
    }
}

const getAllProducts = async (req, res) => {
    try {
        let productos = await productsStorage.getAll();
        res.render('index', {
            products: productos
        });
    } catch (err) {
        console.log(err);
    }
}

const getProductById = async (req, res) => {
    try {
        let idCart = req.params.id;
        let productbyId = await productsStorage.getById(idCart);

        if (!productbyId) {
            res.render(rutaError)
        } else {
            res.render('product/listaProd', {
                product: productbyId
            })
        }
    } catch (err) {
        res.render(rutaError)
    }
}

const updateProductById = async (req, res) => {
    res.render('product/agregarProducto')
    try {
        const idProduct = req.params.id;
        const name = req.body.nombre;
        const price = Number(req.body.precio);
        const img = req.body.thumbnail;
        const date = new Date().toDateString();
        const stock = Number(req.body.stock);
        await productsStorage.updateById(idProduct, name, price, img, date, stock);
        res.render('product/listaProd', {
            product: productbyId
        })
    } catch (err) {
        res.render(rutaError)
    }
}

const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        await productsStorage.deleteById(id);
        return res.json(`Se elimin?? de forma correcta el ID:${id}`);
    } catch (err) {
        res.render(rutaError)
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
};