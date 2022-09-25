const bcrypt = require('bcrypt');
// Encrypta la constaseña del usuario
function createHash(password) {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10),
        null
    )
};

module.exports = {createHash}