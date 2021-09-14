const {Router} = require('express'); //metodo de express
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');


const router = Router();

//Se envia la req y res a usuarios
router.get('/', usuariosGet);

// Actualizar informacion. :id se captura de la req, http://localhost:8080/api/usuarios/10 el 10 seria el id
router.put('/:id', usuariosPut);

// Crear nuevos recuros
router.post('/', usuariosPost);

// Borrar algo, o que se elimina
router.delete('/',usuariosDelete);

router.patch('/',usuariosPatch);




module.exports = router;