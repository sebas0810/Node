const {Router} = require('express'); //metodo de express
const { check } = require('express-validator');

const { ObtenerProductos, CrearProducto, ObtenerProductoID, ActualizarProducto, EliminarProducto } = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');

const router = Router();

//Obtener todos los productos - Publico
router.get('/',ObtenerProductos);

//Obtener un producto por id - Publico
router.get('/:id',[
    check('id','El id ingresado no es de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],ObtenerProductoID)


// Crear Producto - Privado - Admin
router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre','el nombre no puede ser vacio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],CrearProducto);


//Actulzizar Producto - Privado
router.put('/:id',[
    validarJWT,
    check('id','El id ingresado no es de mongo').isMongoId(),
    check('id').custom(existeProducto),
    check('precio').isInt({min:0}),
    check('cantidad').isInt({min:0}),
    validarCampos
],ActualizarProducto);


//Eliminar Producto - Privado -Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','El id ingresado no es de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],EliminarProducto);


module.exports = router;