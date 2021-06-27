const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

const isValidateRol = async (rol = '') => {
	const existeRol = await Role.findOne({ rol });
	if (!existeRol) throw new Error(`El rol ${rol} no es válido`);
};

const emailExist = async (correo = '') => {
	const verificarEmail = await Usuario.findOne({ correo });
	if (verificarEmail) throw new Error(`El email ${correo} ya esta en uso`);
};
const idExist = async (id) => {
	const userIdExistist = await Usuario.findById(id);
	if (!userIdExistist) throw new Error(`El id: ${id} no es válido`);
};
const existeCategoria = async (id) => {
	const categoriaIdExistist = await Categoria.findById(id);
	if (!categoriaIdExistist)
		throw new Error(`El id: ${id} no es válido en ningúna categoria`);
};
const existeProducto = async (id) => {
	const productoIdExistist = await Producto.findById(id);
	if (!productoIdExistist) {
		throw new Error(`El id: ${id} no es válido en ningún producto`);
	}
	if (productoIdExistist && !productoIdExistist.estado)
		throw new Error(`Producto no disponible`);
};
const permetCollections = (collection = '', colecciones = []) => {
	const incluida = colecciones.includes(collection);
	if (!incluida)
		throw new Error(
			`${collection} no está permitido por favor use: ${colecciones}`
		);
	return true;
};

module.exports = {
	emailExist,
	existeCategoria,
	existeProducto,
	isValidateRol,
	idExist,
	permetCollections,
};
