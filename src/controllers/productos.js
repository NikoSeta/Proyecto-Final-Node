const prodModel = require('../models/productosMongo');
const ContenedorMongoDB = require ('../contenedores/contenedorMongoDB');
const contenedor = new ContenedorMongoDB(prodModel);

async function productosPrincipal(req, res) {
    let products = await contenedor.getAll();
    let seleccionados = products.slice(1,5)
    res.render('product/prodMock',{
        products: seleccionados
    });  
};

async function verProductos(req, res) {
    let products = await contenedor.getAll();
    res.render('product/productos',{
        products: products
    });  
};

function agregarProd (req, res){
    try {
        const newProducto = req.body
        contenedor.update(newProducto)
        res.redirect("/")
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }    
}

module.exports = {
    verProductos,
    productosPrincipal,
    agregarProd
};