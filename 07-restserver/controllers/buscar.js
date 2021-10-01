const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Producto, Categoria} = require('../models');

const coleccionPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino='',res=response)=>{

    const esMongoID = ObjectId.isValid(termino);  // Si es mongoID

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [usuario] : []  //ternario : Pregunta si existe usuario(no null), no es nul devuelve arreglo vacio
        })
    }

    const regex = new RegExp(termino,'i'); //insensible

    const usuarios = await Usuario.find({
        $or:[{nombre: regex},{correo: regex}], //nombre cumple la condiccion o el correo
        $and: [{estado: true}] // estados true
    });

    res.json({
        results: usuarios // find devuelve un arreglo de usuarios o un arreglo vacio
    })
        
}

const buscarCategoria= async(termino='',res=response)=>{

    const esMongoID = ObjectId.isValid(termino);  // Si es mongoID

    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: ( categoria ) ? [categoria] : []  //ternario : Pregunta si existe usuario(no null), no es nul devuelve arreglo vacio
        })
    }

    const regex = new RegExp(termino,'i'); //insensible

    const categorias = await Categoria.find({nombre: regex,estado:true});

    res.json({
        results: categorias // find devuelve un arreglo de usuarios o un arreglo vacio
    })
        
}

const buscarProducto= async(termino='',res=response)=>{

    const esMongoID = ObjectId.isValid(termino);  // Si es mongoID

    if(esMongoID){
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: ( producto ) ? [producto] : []  //ternario : Pregunta si existe usuario(no null), no es nul devuelve arreglo vacio
        })
    }

    const regex = new RegExp(termino,'i'); //insensible

    const productos = await Producto.find({nombre: regex,estado:true}).populate('categoria','nombre');;

    res.json({
        results: productos // find devuelve un arreglo de usuarios o un arreglo vacio
    })
        
}

const buscar = (req,res=response)=>{

    const {coleccion,termino} = req.params;

    if(!coleccionPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg : `Las colecciones permitidas son: ${coleccionPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res);
        break;
        case 'categorias':
            buscarCategoria(termino,res);
        break;
        case 'productos':
            buscarProducto(termino,res);
        break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
            break;
    }
}

module.exports = {
    buscar
}