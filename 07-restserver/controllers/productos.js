const { response } = require("express");
const { Producto } = require("../models");


//Obtener Productos -paginado - total - populate
const ObtenerProductos = async(req,res=response) =>{
    const { limite=5,desde=0} = req.params;

    const [total,productos] = await Promise.all([
        Producto.countDocuments({estado: true}),
        Producto.find({estado:true})
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('usuario','nombre')
                .populate('categoria','nombre')
    ])

    res.json({
        total,
        productos
    })
}

//Obtener Producto por id - populate
const ObtenerProductoID = async(req,res=response) =>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
                                    .populate('usuario','nombre')
                                    .populate('categoria','nombre')

    res.json(producto);
}

//Crear Producto - populate
const CrearProducto = async(req,res=response) =>{
    const {estado,usuario,nombre,...body} = req.body;

    const productoDB = await Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }

    const datos ={
        ...body,
        nombre: nombre.toUpperCase(),
        usuario: req.usuarioAuth._id
    }

    const producto = new Producto(datos);

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);

}

//Actualizar producto - populate
const ActualizarProducto = async(req,res= response) =>{
    const {id} = req.params;

    let {estado,usuario,nombre,...body} = req.body;
    
    if(nombre){
        nombre = nombre.toUpperCase();
    }

    const existeProducto = await Producto.findOne({nombre});

    if(existeProducto){
        return res.status(400).json({
            msg: `El producto ${existeProducto.nombre}, ya existe`
        })
    }

    const data = {
        ...body,
        nombre,
        usuario: req.usuarioAuth._id,
    }

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true})
                                    .populate('usuario','nombre')
                                    .populate('categoria','nombre')

    res.json({
        producto
    })
}


//Eliminar producto - populate - estado:false
const EliminarProducto = async(req,res= response) =>{
    const {id} = req.params;

    const existeProducto = await Producto.findById(id);

    if(!existeProducto.estado){
        return res.status(400).json({
            msg: `El producto ${existeProducto.nombre}, ya esta eliminado`
        })
    }

    const  producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true})
                                    .populate('usuario','nombre')
                                    .populate('categoria','nombre')

    res.json({
        producto
    })
}

module.exports = {
    ObtenerProductos,
    ObtenerProductoID,
    CrearProducto,
    ActualizarProducto,
    EliminarProducto
}