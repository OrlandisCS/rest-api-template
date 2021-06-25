const paginacion = (page = 1, limite = 10, desde = 0) => {
	if (page !== '1') {
		desde = Number(limite) * Number(page) - limite;
	}
	return {
		desde: Number(desde),
		limite: Number(limite),
	};
};

module.exports = paginacion;
