const { response, request } = require("express");

const { Categoria }= require('../models');
const usuario = require("../models/usuario");


//ObtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req=request,res=response) =>{
    const {limite=5,desde=0} = req.query;
    
    const [total,categorias] = await Promise.all([
        Categoria.countDocuments({estado: true}),
        Categoria.find({estado:true})
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('usuario','nombre')
    ])

    res.json({
        total,
        categorias
    })
}


//ObtenerCategoria - populate
const obtenerCategoria = async(req,res=response) =>{
    const { id } = req.params;

    const categoria = await Categoria.findById(id)
                                    .populate('usuario','nombre')

    res.json(categoria);
}

// Crear categoria
const crearCategoria = async(req,res=response) =>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    //Generar la data a guardar

    const data = {
        nombre,
        usuario: req.usuarioAuth._id 
    }

    const categoria = new Categoria(data);

    //Guardar DB
    await categoria.save();

    res.status(201).json(categoria);
}

//Actualziar Categoria 
const actualizarCategoria = async(req,res=response) =>{
    const { id } = req.params;

    const {estado,usuario,...datos} = req.body;
    
    const nombre = datos.nombre.toUpperCase();

    const existeNombre = await Categoria.findOne({nombre})

    if(existeNombre){
        return res.status(401).json({
            msg: `ya existe una categoria con nombre ${nombre}`
        })
    }

    const data = {
        nombre,
        usuario: req.usuarioAuth._id 
    }

    const categoria = await Categoria.findByIdAndUpdate(id,data).populate('usuario','nombre');

    res.json({
        categoria
    })
}

//Borrar Categoria -estado: false
const borrarCategoria = async(req,res=response)=>{
    const {id} = req.params;

    const categoria = await Categoria.findById(id);

    if (!categoria.estado) {
        return res.status(401).json({
            msg: 'La categoria ya esta eliminada'
        })
    }
    const cat = await Categoria.findByIdAndUpdate(id,{estado: false})

    res.json({
        cat
    })
}


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}