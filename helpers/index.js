const dbValidators = require('./db-validators');
const paginar = require('./paginar');
const jwt = require('./jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');
module.exports = {
	...dbValidators,
	...paginar,
	...jwt,
	...googleVerify,
	...subirArchivo,
};
