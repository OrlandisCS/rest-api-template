const { request, response } = require('express');
const paginacion = require('../helpers/paginar');
const { Producto } = require('../models');

const obtenerProductos = async (req = request, res = response) => {
	try {
		let { desde = 0, limite, page = 1 } = req.query;

		const [productos, total, mostrando] = await Promise.all([
			Producto.find({ estado: true })
				.skip(paginacion(page).desde)
				.limit(paginacion(page, limite).limite)
				.populate('usuario', 'nombre')
				.populate('categoria', 'nombre'),
			Producto.countDocuments({ estado: true }),
			Producto.countDocuments({ estado: true })
				.skip(paginacion(page).desde)
				.limit(paginacion(page, limite).limite),
		]);
		res.json({
			page,
			total,
			mostrando,
			productos,
		});
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
const obtenerProducto = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const producto = await Producto.findById(id)
			.populate('usuario', 'nombre')
			.populate('categoria', 'nombre');
		if (!producto.estado)
			return res.status(401).json({ msg: 'Producto no disponible' });
		res.json({ producto });
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

const crearProducto = async (req = request, res = response) => {
	try {
		const { usuario, ...data } = req.body;
		data.nombre = data.nombre.toUpperCase();
		const datos = {
			...data,
			usuario: req.usuario._id,
		};
		const existe = await Producto.findOne({ nombre: data.nombre });
		if (existe)
			return res.status(401).json({
				msg: 'Ya existe este producto',
			});
		const producto = await new Producto(datos);
		await producto.save();
		res.json({ producto });
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
const actualizarProducto = async (req = request, res = response) => {
	try {
		const { _id, usuario, estado, ...data } = req.body;
		const { id } = req.params;
		data.nombre = data.nombre.toUpperCase();
		if (data.descripcion === '') {
			delete data.descripcion;
		}
		const existName = await Producto.findOne({ nombre: data.nombre });
		if (existName)
			return res
				.status(401)
				.json({ msg: `El producto: ${data.nombre} ya existe en DB` });
		const datos = {
			...data,
			usuario: req.usuario._id,
		};
		const producto = await Producto.findByIdAndUpdate(id, datos, { new: true })
			.populate('usuario', 'nombre')
			.populate('categoria', 'nombre');
		res.json({ producto });
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
const eliminarProducto = async (req = request, res = response) => {
	const { id } = req.params;
	const producto = await Producto.findByIdAndUpdate(id, {
		estado: false,
		new: true,
	});
	res.json({ producto });
};

module.exports = {
	actualizarProducto,
	crearProducto,
	eliminarProducto,
	obtenerProducto,
	obtenerProductos,
};
