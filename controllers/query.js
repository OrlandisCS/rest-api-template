const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto, Role } = require('../models');
const trueCollections = ['categorias', 'usuarios', 'productos', 'roles'];
const buscarUsuario = async (q = '', res = response) => {
	const mongoID = ObjectId.isValid(q);
	console.log(q);
	if (mongoID) {
		const usuario = await Usuario.findById(q);
		return res.json({
			results: usuario ? [usuario] : [],
		});
	}
	const regex = new RegExp(q, 'i');
	const [usuarios, total] = await Promise.all([
		Usuario.find({
			$or: [{ nombre: regex }, { correo: regex }],
			$and: [{ estado: true }],
		}),
		Usuario.countDocuments({
			$or: [{ nombre: regex }, { correo: regex }],
			$and: [{ estado: true }],
		}),
	]);

	res.json({
		results: {
			total,
			usuarios,
		},
	});
};
const buscarCategoria = async (q = '', res = response) => {
	const mongoID = ObjectId.isValid(q);
	if (mongoID) {
		const categoria = await Categoria.findById(q).populate('usuario', 'nombre');
		return res.json({
			results: categoria ? [categoria] : [],
		});
	}
	const regex = new RegExp(q, 'i');
	const [categorias, total] = await Promise.all([
		Categoria.find({
			nombre: regex,
		}),
		Categoria.countDocuments({
			nombre: regex,
		}),
	]);

	res.json({
		results: {
			total,
			categorias,
		},
	});
};
const buscarProducto = async (q = '', res = response) => {
	const mongoID = ObjectId.isValid(q);

	if (mongoID) {
		const producto = await Producto.findById(q)
			.populate('usuario', 'nombre')
			.populate('categoria', 'nombre');
		return res.json({
			results: producto ? [producto] : [],
		});
	}
	const regex = new RegExp(q, 'i');
	let categoria;
	const categorias = await Categoria.findOne({
		nombre: regex,
	});
	if (categorias) {
		categoria = categorias._id;
		console.log(categoria);
	}
	const [productos, total] = await Promise.all([
		Producto.find({
			$or: [{ nombre: regex }, { descripcion: regex }, { categoria }],
			$and: [{ estado: true }],
		})
			.populate('usuario', 'nombre')
			.populate('categoria', 'nombre'),
		Producto.countDocuments({
			$or: [{ nombre: regex }, { correo: regex }],
			$and: [{ estado: true }],
		}),
	]);

	res.json({
		results: {
			total,
			productos,
		},
	});
};
const query = async (req = request, res = response) => {
	const { collection, q } = req.params;
	if (!trueCollections.includes(collection))
		return res.status(400).json({
			mgs: `Las colecciones permitidas son: ${trueCollections}`,
		});
	switch (collection) {
		case 'categorias':
			buscarCategoria(q, res);
			break;
		case 'usuarios':
			buscarUsuario(q, res);
			break;
		case 'productos':
			buscarProducto(q, res);
			break;
		case 'roles':
			break;

		default:
			res.status(500).json({
				mgs: 'Validación no disponible',
			});
			break;
	}
};

module.exports = {
	query,
};
