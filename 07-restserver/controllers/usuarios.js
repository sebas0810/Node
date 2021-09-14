const {response,request} = require('express')


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

usuariosPost = (req,res=response) =>{

    const {nombre,edad} = req.body;

    res.json({
        msg:"post API - controlador",
        nombre,
        edad
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