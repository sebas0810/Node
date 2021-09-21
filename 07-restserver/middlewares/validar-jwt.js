const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req=request,res=response,next) =>{

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg :'No hay token en la petición'
        })
    }

    try {
        //Devuelve el payload
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'token no valido -usuario no existe DB'
            })
        }

        //verificar si el uid tiene estado en true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'token no valido -usuario con estado: false'
            })
        }
        req.usuarioAuth = usuario; 
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token invalido'
        })
    }
}



module.exports = {
    validarJWT
}