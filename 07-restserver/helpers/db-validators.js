const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol='') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD `);
    }
}

//Verificar si el correo existe
const emailExiste = async(correo='') =>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){  // Distinto de null es decir existe
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

const usuarioIdExiste = async(id='') =>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){ 
        throw new Error(`El id ${id} no existe `);
    }
}

const existeCategoria = async(id='') =>{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id ${id} no existe`);
    }
}

const existeProducto = async(id='') =>{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id ${id} no existe`);
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    usuarioIdExiste,
    existeCategoria,
    existeProducto
}