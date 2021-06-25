const ValidarCampos = require("./validar-datos");
const ValidarJWT = require("./validar-jwt");
const Roles = require('./roles')

module.exports = {
    ...ValidarCampos,
    ...ValidarJWT,
    ...Roles,
}