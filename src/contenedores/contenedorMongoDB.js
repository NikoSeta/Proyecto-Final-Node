const prodModel = require('../models/productosMongo');
let model = prodModel

class ContenedorMongoDB {
    constructor(model) {
        this.model = model;
    }
    
    async getAll(){
        let products = await this.model.find();
        return products;
    }

    async createProd(){
        const productoSaveModel = new model.productos(productos);
        let productsSave = await model.productos.save();
        console.log(productsSave);
    }

    async getById(id) {
        let productoArray = this.getAll();
        let content = null;

        if(productoArray.length > 0) {
            let producto = await model.productos.find(elem => elem.id == id);
            if(producto) {
                content = producto;
            }
        }
        return content;
    }

    async update(content) {
        let contentArray = this.getAll();
        let index = contentArray.find(elem => {
            return elem.id === content.id;
        });

        if (index != -1) {
            let newProducto = await model.productos.updateOne(
                {"name": content.name},
                {"price": content.price},
                {"img": content.img},
                {"stock": content.stock}
            );
            console.log("Nuevo producto cargado:" + newProducto);
        }
        return content;
    }

    async delete(id) {
        let productosArray = this.getAll();
      
        if(productos.length > 0) {
            let productDelete = await model.productos.deleteOne(elem => elem.id != id);
            console.log(productDelete);
        }
        return productosArray
    }
}

module.exports = ContenedorMongoDB;