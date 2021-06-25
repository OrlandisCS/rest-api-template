const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
	let { limite = 10, desde = 0, page = 1 } = req.query;
	if (page !== '1') {
		desde = Number(limite) * Number(page) - 5;
	}
	const query = { estado: true };
	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments(query),
		Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
	]);
	res.json({
		total,
		usuarios,
	});
};

const usuariosPost = async (req, res = response) => {
	//Validamos los errores de el middleware de los routes
	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({
		nombre,
		correo,
		password,
		rol,
	});
	//encryptar pwd
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);
	//Guardar en db
	await usuario.save();
	res.json({ usuario });
};
const usuariosPut = async (req, res = response) => {
	const id = req.params.id;
	const { _id, password, google, correo, ...info } = req.body;
	//TODO validar contra db
	if (password) {
		//encryptar pwd
		const salt = bcryptjs.genSaltSync();
		info.password = bcryptjs.hashSync(password, salt);
	}
	const usuario = await Usuario.findByIdAndUpdate(id, info);
	res.json({
		usuario,
	});
};

const usuariosDelete = async (req, res = response) => {
	const { id } = req.params;
	//leer usuario
	const uid = req.uid;
	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
	res.json({
		usuario,
	});
};

const usuariosPatch = (req, res = response) => {
	res.json({
		msg: 'Patch a mi API Node',
	});
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete,
};
