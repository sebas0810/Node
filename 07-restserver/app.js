require('dotenv').config();      //Orden primero los modulos de express como fs, luego de terceros y luego de la app
const Server = require('./models/server');

const server = new Server();

server.listen();