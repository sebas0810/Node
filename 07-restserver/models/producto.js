const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean,
        default: true
    },
    cantidad:{
        type: Number,
        default: 0
    }
    
});

ProductoSchema.methods.toJSON = function () { 
    const {__v,estado,... producto} = this.toObject();  //Nos va a devolver el objeto literal, {__v,password,... usuario} saca los atributos v y pass
    // y los demas los deja como un objeto en usuario
    return producto;
    
}

module.exports = model('Producto',ProductoSchema);