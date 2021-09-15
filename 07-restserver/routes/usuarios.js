const {Router} = require('express'); //metodo de express
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');


const router = Router();

//Se envia la req y res a usuarios
router.get('/', usuariosGet);

// Actualizar informacion. :id se captura de la req, http://localhost:8080/api/usuarios/10 el 10 seria el id
router.put('/:id', usuariosPut);

// Crear nuevos recuros
// Los middleware se ejecutaran para validar antes que la peticion termine, si uno falla no se ejecuta
//el segundo parametro es el middleware, varios []
router.post('/',[
    check('correo','El correo no es valido').isEmail() //usa la funcion cheak de express-validation para verificar que el campo correo del body sea correcto
    //almacena el error en la req que se trabaja en el usuariosPost
], usuariosPost);

// Borrar algo, o que se elimina
router.delete('/',usuariosDelete);

router.patch('/',usuariosPatch);




module.exports = router;