const { request, response } = require('express');

const validarArchivo = async (req = request, res = response, next) => {
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
		return res.status(400).json({
			msg: 'Por favor seleccione un archivo',
		});
	}
	next();
};

module.exports = {
	validarArchivo,
};
