const Role = require("../models/role");
const Usuario = require("../models/usuario");

const isValidateRol = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) throw new Error(`El rol ${rol} no es válido`);
};

const emailExist = async (correo = "") => {
  const verificarEmail = await Usuario.findOne({ correo });
  if (verificarEmail) throw new Error(`El email ${correo} ya esta en uso`);
};
const idExist = async (id) => {
  const userIdExistist = await Usuario.findById(id);
  if (!userIdExistist) throw new Error(`El id: ${id} no es válido`);
};

module.exports = {
  isValidateRol,
  emailExist,
  idExist,
};
