const ValidarCampos = require('./validar-datos');
const ValidarJWT = require('./validar-jwt');
const Roles = require('./roles');
const validarArchivo = require('./validar-archivo');

module.exports = {
	...ValidarCampos,
	...ValidarJWT,
	...validarArchivo,
	...Roles,
};
