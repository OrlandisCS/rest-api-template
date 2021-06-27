const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');
const cargarArchivo = async (req, res = response) => {
	try {
		const pathName = await subirArchivo(req.files, undefined, 'imgs');
		res.json({
			pathName,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ error });
	}
};
const actualizarImg = async (req, res = response) => {
	const { collection, id } = req.params;
	let modelo;

	switch (collection) {
		case 'usuarios':
			modelo = await Usuario.findById(id);
			if (!modelo)
				return res.status(400).json({
					msg: 'Usuario no válido',
				});
			break;
		case 'productos':
			modelo = await Producto.findById(id);
			if (!modelo)
				return res.status(400).json({
					msg: 'Producto no válido',
				});
			break;

		default:
			return res.status(500).json({
				msg: 'Validación pendiente sorry',
			});
			break;
	}
	//Limpieza de archivos
	if (modelo.img) {
		const pathImagen = path.join(
			__dirname,
			'../uploads',
			collection,
			modelo.img
		);
		if (fs.existsSync(pathImagen)) {
			fs.unlinkSync(pathImagen);
		}
	}
	modelo.img = await subirArchivo(req.files, undefined, collection);
	await modelo.save();
	res.json({
		modelo,
	});
};
const mostrarImg = async (req, res = response) => {
	const { collection, id } = req.params;
	let modelo;

	switch (collection) {
		case 'usuarios':
			modelo = await Usuario.findById(id);
			if (!modelo)
				return res.status(400).json({
					msg: 'Usuario no válido',
				});
			break;
		case 'productos':
			modelo = await Producto.findById(id);
			if (!modelo)
				return res.status(400).json({
					msg: 'Producto no válido',
				});
			break;

		default:
			return res.status(500).json({
				msg: 'Validación pendiente sorry',
			});
	}
	//Limpieza de archivos
	if (modelo.img) {
		const pathImagen = path.join(
			__dirname,
			'../uploads',
			collection,
			modelo.img
		);
		if (fs.existsSync(pathImagen)) {
			return res.sendFile(pathImagen);
		}
	}
	return res.sendFile(path.join(__dirname, '../assets', 'no-image.jpg'));
};
//Cloudinary
const actualizarCloudinary = async (req, res = response) => {
	const { collection, id } = req.params;
	let modelo;

	switch (collection) {
		case 'usuarios':
			modelo = await Usuario.findById(id);
			if (!modelo)
				return res.status(400).json({
					msg: 'Usuario no válido',
				});
			break;
		case 'productos':
			modelo = await Producto.findById(id);
			if (!modelo)
				return res.status(400).json({
					msg: 'Producto no válido',
				});
			break;

		default:
			return res.status(500).json({
				msg: 'Validación pendiente sorry',
			});
			break;
	}
	//Limpieza de archivos
	if (modelo.img) {
		const arrName = modelo.img.split('/');
		const name = arrName[arrName.length - 1];
		const [publicId] = name.split('.');
		cloudinary.uploader.destroy(publicId);
	}
	const { tempFilePath } = req.files.archivo;
	const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

	modelo.img = secure_url;
	await modelo.save();
	res.json({
		modelo,
	});
};

module.exports = {
	cargarArchivo,
	actualizarImg,
	mostrarImg,
	actualizarCloudinary,
};
