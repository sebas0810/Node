const {Router} = require('express'); //metodo de express
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const {esRolValido,emailExiste,usuarioIdExiste} = require('../helpers/db-validators');

const router = Router();

//Se envia la req y res a usuarios
router.get('/', usuariosGet);

// Actualizar informacion. :id se captura de la req, http://localhost:8080/api/usuarios/10 el 10 seria el id
router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuarioIdExiste),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

// Crear nuevos recuros
// Los middleware se ejecutaran para validar antes que la peticion termine, si uno falla no se ejecuta
//el segundo parametro es el middleware, varios []
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(), //usa la funcion cheak de express-validation para verificar que el campo correo del body sea correcto
    //almacena el error en la req que se trabaja en el usuariosPost
    check('correo').custom(emailExiste),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),  // = check('rol').custom((rol) => esRolValido(rol))
    validarCampos //middlewarare que creamos, este valida que todos los anteriores middlewares esten bien
], usuariosPost);

// Borrar algo, o que se elimina
router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuarioIdExiste),
    validarCampos
],usuariosDelete);

router.patch('/',usuariosPatch);




module.exports = router;