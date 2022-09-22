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
        let productsSave = await productoSaveModel.save();
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
        let contentArray = await this.getAll();
        let index = contentArray.find(elem => {
            return elem.id === content.id;
        });

        if (index != -1) {
            let usuarioUpdate = this.model.updateOne(
                {"name": content.name},
                {"price": content.price},
                {"img": content.img},
                {"stock": content.stock}
            );
            console.log("Nuevo producto cargado:" + usuarioUpdate);
        }
        return content;
    }

    async delete(id) {
        let productosArray = this.getAll();
      
        if(productos.length > 0) {
            let usuarioDelete = await model.usuarios.deleteOne(elem => elem.id != id);
            console.log(usuarioDelete);
        }
        return productosArray
    }
}

module.exports = ContenedorMongoDB;