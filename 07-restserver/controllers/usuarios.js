const {response,request} = require('express')
const bycryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


//el =response es para que sepa que tipo de dato es, es decir, una respuesta
// con req se puede hacer
//Se solicita a la ruta /api
// res.status(403).json()
const usuariosGet = async(req=request,res=response) =>{
    // http://localhost:8080/api/usuarios?q=hola&nombre=sebas&apikey=12156641 los query son opciones y van luego del ?
    //const {q,nombre='No name',apikey} = req.query;
    
    const {limite=5, desde=5} = req.query;

    // const usuarios = await Usuario.find({estado: true})        Se ejecuta esto y hasta que no termine por el await no continua
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments({estado: true}); 

    const [total,usuarios] = await Promise.all([                  //Dado que las promesas no tiene relacion entre si es decir no depende una de otra
        Usuario.countDocuments({estado: true}),       //De esta forma se envian varias promesas a ejecutar al tiempo lo que disminuye el tiempo de ejecucion
        Usuario.find({estado: true})
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
}

usuariosPost = async(req,res=response) =>{


    const {nombre,correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});


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

usuariosPut = async(req,res=response) =>{

    // saco el id que me mandan como request en la url http://localhost:8080/api/usuarios/10 el 10
    const { id } = req.params;
    const {_id,password,google,...resto} = req.body;

    if(password){
            //Encriptar la contraseña, hash
        const salt = bycryptjs.genSaltSync(); //Una sola via. Se establece un valor que es el numero de vueltas para mas seguridad default:10
        resto.password = bycryptjs.hashSync(password,salt) //Genera el hash del password
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg:"put API - controlador",
        usuario
    })
}

usuariosPatch = (req,res=response) =>{
    res.json({
        msg:"patch API - controlador"
    })
}

usuariosDelete = async(req,res=response) =>{

    const {id} = req.params;

    const usuarioAuth = req.usuarioAuth;
    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});

    res.json({
        msg:"delete API - controlador",
        usuario,
        usuarioAuth
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}