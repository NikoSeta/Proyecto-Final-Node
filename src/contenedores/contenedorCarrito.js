const ContainerMongoDB = require('./ContenedorMongoDB')
const productosModel = require('../models/productosMongo')

class CartMongoDB extends ContainerMongoDB {
    constructor() {
        super(productosModel);
        let cart = this.getAll();
        this.id = (cart.length > 0) ? cart[cart.length -1].id + 1 : 1;
    }

    save(product, price) {
        let carts = this.getAll();
        let cart = {id:this.id, product: product, price: price}
        carts.push(cart);
        this.update(carts);
        this.id++;
	return cart
    }

    getAllCarts() {
        let carts = this.getAll();
        return carts;
    }
}

module.exports =  CartMongoDB ;