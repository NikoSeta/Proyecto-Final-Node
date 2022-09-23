const prodModel = require('../models/productosMongo');
const ContenedorMongoDB = require ('../contenedores/contenedorMongoDB');
const contenedor = new ContenedorMongoDB(prodModel);

async function verProductos(req, res) {
    let products = await contenedor.getAll();
    res.render('product/productos',{
        products: products
    });  
};

async function verUnProducto(req, res) {
    try {
        let idProd = req.params.id;
        let producto = await contenedor.getById( idProd );

        if (!producto) {
            console.log(error, `Producto con ID: ${idProd} no encontrado`);
        } else {
            res.render('/product/productos', {
                product: producto
            })
        }
    } catch (err) {
        console.log('No se encuentra productos');
    }
};

const updateById = async (req, res) => {
    try {
        const idProduct = req.params.id;
        const name = req.body.nombre;
        const price = Number(req.body.precio);
        const img = req.body.thumbnail;
        const date = new Date().toDateString();
        const stock = Number(req.body.stock);
        const productoUpdate = await contenedor.updateById(idProduct, name, price, img, date, stock);
        res.render('/product/productos', {
            product : productoUpdate
        })
    } catch (err) {
        console.log(`Error al actualizar un producto ${err}`)
    }
};

async function agregarProd (req, res){
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
        const id = await contenedor.update(newProducto)
        res.redirect('/product/productos')
        console.log(req.body);
    } catch (err) {
        console.log(`Error al crear un producto ${err}`);
    }
};


async function borrarUnProd(req, res) {  
    try {
        const id = req.params.id;
        await contenedor.delete( req.id );
        res.render('/product/productos', {
            product: producto
        })
        console.log(`Se eliminó de forma correcta el prodcuto con ID:${id}`);
    } catch (err) {
        console.log(`Error al borrar un producto por id ${err}`);
    }
}

module.exports = {
    verProductos,
    agregarProd,
    verUnProducto,
    borrarUnProd,
    updateById
};