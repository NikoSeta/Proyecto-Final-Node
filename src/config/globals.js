require('dotenv').config()

const mongoUri = `${process.env.MONGO_URI}`;
const PORT = process.env.PORT;
const TIEMPO_EXPIRACION = process.env.TIEMPO_EXPIRACION;
const MAIL_ADM = process.env.MAIL_ADM;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ACCES_TOKEN = process.env.ACCES_TOKEN;

module.exports = {
  mongoUri,
  PORT,
  TIEMPO_EXPIRACION,
  MAIL_ADM,
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  ACCES_TOKEN
}