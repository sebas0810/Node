
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({  //como va a ser el modelo de la coleccion dentro de la BD
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio'] // 1er si es requerido, 2do mensaje en caso de que no se defina
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true   //La BD verifica que sea unico en la coleccion
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'] 
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE'] //Indica que valores puede tomar
    },
    estado:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});



module.exports = model('Usuario',UsuarioSchema);  //DB le pone este nombre a la coleccion, por defecto mongosse le añade una s al final