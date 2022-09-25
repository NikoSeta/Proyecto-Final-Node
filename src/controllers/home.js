const storage = require(`../daos/index`);

let rutaError = 'routing-err'

const productsStorage = storage().productos;

const getAllProducts = async (req, res) => {
    try {
        let allProducts = await productsStorage.getAll();
        res.render('index', {
            products: allProducts
        })
    } catch (err) {
        res.render(rutaError)
    }
};

module.exports = {getAllProducts};