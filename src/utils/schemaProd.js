const { buildSchema } = require('graphql');

let schemaProductos = buildSchema(`
    type Producto{
        id: ID!
        name: String
        price: Int
        img: String
        stock: Int
    }
    type Query {
        getById(id: Int!): content
        getAll: [products]
    }
    type Mutation {
        update(id: Int!, name: String)
    }
`);

module.exports = { schemaProductos };