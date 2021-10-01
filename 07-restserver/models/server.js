const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //endpoint de usuarios

        this.paths ={
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }

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
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor Corriendo en el puerto:',this.port);
        }); 
    }
}

module.exports = Server;