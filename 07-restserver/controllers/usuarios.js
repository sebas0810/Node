const {response,request} = require('express')
const bycryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

//el =response es para que sepa que tipo de dato es, es decir, una respuesta
// con req se puede hacer
//Se solicita a la ruta /api
// res.status(403).json()
const usuariosGet = (req=request,res=response) =>{
    // http://localhost:8080/api/usuarios?q=hola&nombre=sebas&apikey=12156641 los query son opciones y van luego del ?
    const {q,nombre='No name',apikey} = req.query;
    
    res.json({
        msg:"get API - controlador",
        q,
        nombre,
        apikey
    });
}

usuariosPost = async(req,res=response) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const {nombre,correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){  // Distinto de null es decir existe
        return res.status(400).json({ //Estado para que el front se de cuenta del error
            msg: 'Ese correo ya esta registrado'
        })
    }

    //Encriptar la contraseña, hash
    const salt = bycryptjs.genSaltSync(); //Una sola via. Se establece un valor que es el numero de vueltas para mas seguridad default:10
    usuario.password = bycryptjs.hashSync(password,salt) //Genera el hash del password

    //Guardar en DB
    await usuario.save();
    res.json({
        msg:"post API - controlador",
        usuario
    })
}

usuariosPut = (req,res=response) =>{

    // saco el id que me mandan como request en la url http://localhost:8080/api/usuarios/10 el 10
    const { id } = req.params;

    res.json({
        msg:"put API - controlador",
        id
    })
}

usuariosPatch = (req,res=response) =>{
    res.json({
        msg:"patch API - controlador"
    })
}

usuariosDelete = (req,res=response) =>{
    res.json({
        msg:"delete API - controlador"
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}