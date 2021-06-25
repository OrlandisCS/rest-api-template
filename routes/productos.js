const { Router } = require('express');
const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productos');
const { check } = require("express-validator");
const { obtenerCategorias, crearCategoria, obtenerCategoriaById, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
//middleware para validar ID
const { validarJWT, validarCampos, adminRole } = require('../middlewares');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerProductos)
router.get('/:id', [
    check('id', 'Ingrese un id válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto)
router.post('/', [
    validarJWT,
    adminRole,
    check('nombre', 'El producto a de tener mínimo 4 carácteres').isLength({ min: 4 }),
    check('categoria', 'No es una categoria valida').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto)
router.put('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un id  válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto)
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un id  válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], eliminarProducto)

module.exports = router