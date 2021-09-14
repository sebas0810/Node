const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //endpoint de usuarios
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){ //los middlewares es son con el use
        // CORS es un paquete que nos ayuda a proteger superficialmente nuestras aplicaciones.
        this.app.use(cors()); // Funciona como un middleware

        // Lectura y parseo del body 
        // Cualquiera informacion que venga de pot, put, delete la va a intentar serializar a formato json
        this.app.use(express.json()); //json= javascript objetc notation

        //Directorio Publico
        this.app.use(express.static('public'))
    }

    routes(){
        // cuando se vala a la ruta '/api/usuarios' va a usar las rutas definidas en '../routes/user'
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor Corriendo en el puerto:',this.port);
        }); 
    }
}

module.exports = Server;