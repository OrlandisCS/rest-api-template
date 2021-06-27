const { Router } = require('express');
const { check } = require('express-validator');
const {
	cargarArchivo,
	actualizarImg,
	mostrarImg,
	actualizarCloudinary,
} = require('../controllers/uploads');
const { permetCollections } = require('../helpers');
const { validarCampos, validarArchivo } = require('../middlewares');

const router = Router();

router.get(
	'/:collection/:id',
	[
		check('id', 'No es un id Válido').isMongoId(),
		check('collection').custom((c) =>
			permetCollections(c, ['usuarios', 'productos'])
		),
		validarCampos,
	],
	mostrarImg
);
router.post('/', validarArchivo, cargarArchivo);
router.put(
	'/:collection/:id',
	[
		validarArchivo,
		check('id', 'No es un id Válido').isMongoId(),
		check('collection').custom((c) =>
			permetCollections(c, ['usuarios', 'productos'])
		),
		validarCampos,
	],
	actualizarCloudinary
	//actualizarImg
);
module.exports = router;
