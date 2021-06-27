const path = require('path');
const { v4: uuidv4 } = require('uuid');
const subirArchivo = (
	files,
	extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'],
	carpeta = ''
) => {
	return new Promise((resolve, reject) => {
		const { archivo } = files;
		const nombreCortado = archivo.name.split('.');
		const extencion = nombreCortado[nombreCortado.length - 1];

		//validar extenciones
		if (!extensionesValidas.includes(extencion)) {
			return reject(`Archivo no válido, por favor use: ${extensionesValidas}`);
		}
		const tempName = uuidv4() + '.' + extencion;
		const uploadPath = path.join(__dirname, '../uploads/', carpeta, tempName);

		archivo.mv(uploadPath, function (err) {
			if (err) {
				return reject({ err });
			}

			resolve(tempName);
		});
	});
};
module.exports = {
	subirArchivo,
};
