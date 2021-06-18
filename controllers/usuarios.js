const { response, request } = require("express");
const usuariosGet = (req = request, res = response) => {
  const {nombre} = req.query;
  res.json({
    msg: "Get a mi API Node",
    nombre,
  });
};
const usuariosPost = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: "POst a mi API Node",
    body,
  });
};
const usuariosPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "Put a mi API Node",
    id,
  });
};
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "Patch a mi API Node",
  });
};
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "Delete a mi API Node",
    desde: "Controller",
    func: "usuariosDelete",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
