const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //endpoint de usuarios
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){ //los middlewares son funciones que se ejecutan antes de los controladoreso seguir con ejecucion de peticiones. con el use
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
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor Corriendo en el puerto:',this.port);
        }); 
    }
}

module.exports = Server;