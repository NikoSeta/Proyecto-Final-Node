const { mongoUri } = require ('../config/globals');
const mongoose = require('mongoose');

const iniciarMongo = mongoose.connect(`${mongoUri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    },()=>console.log('Base de datos MongoDB conectada')
);

module.exports = {
    iniciarMongo
};