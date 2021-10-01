const {Router} = require('express'); //metodo de express
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole} = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/',obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoria);

// Crear categoria - privada - cualqueira con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar registro - Privado - cualqueira con token valido 
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);

// Borrar una categoria - Admin -Cambiar estado
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],borrarCategoria);

module.exports = router;

