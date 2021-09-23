const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async(req,res= response) =>{
    const {correo, password} = req.body;

    try {
        
        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos -- correo'
            });
        }

        // Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos -- estado: false'
            });
        }
        

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos -- password'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);



        res.json({
            msg: 'Login OK',
            usuario,
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Hablar con el administrador'
        })
    }
    
}

const googleSignIn = async(req,res= response) =>{
    const{ id_token } = req.body;

    try {
        const {nombre,img,correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});
        
        if(!usuario){
            //Creacion de usuario
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true,
                rol: 'ADMIN_ROLE'
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario en DB
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            msg: 'Todo bien!',
            usuario,
            token
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'El token no se pudo verificar',
            error: error
        })
    }


    
}


module.exports = {
    login,
    googleSignIn
}