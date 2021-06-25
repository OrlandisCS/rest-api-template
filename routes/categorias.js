const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerCategorias, crearCategoria, obtenerCategoriaById, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validators");

//middleware para validar ID
const { validarJWT, validarCampos, adminRole } = require('../middlewares')

const router = Router();
//Obtener todas las categorias-publico
router.get('/', obtenerCategorias)
//Obtener una categoria especifica por id - publico
router.get('/:id',
    [
        check('id', 'Ingrese un id válido').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos
    ],
    obtenerCategoriaById)
//Crear una categoria - Private
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('nombre', 'El nombre ha de ser mayor a 4 carácteres').isLength({ min: 4 }),
        validarCampos
    ], crearCategoria)
//Actualizar una categoria - Private
router.put('/:id',
    [
        validarJWT,
        adminRole,
        check('id', 'Ingrese un id válido').isMongoId(),
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('nombre', 'El nombre ha de ser mayor a 4 carácteres').isLength({ min: 4 }),
        check('id').custom(existeCategoria),
        validarCampos
    ],
    actualizarCategoria)
//Eliminar una categoria - Private
router.delete('/:id',
    [
        validarJWT,
        adminRole,
        check('id', 'Ingrese un id válido').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos
    ],
    borrarCategoria)

module.exports = router