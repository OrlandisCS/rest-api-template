const { validationResult } = require("express-validator");

const validarCampos = (req, res, next ) => {
    //Validamos los errores de el middleware de los routes
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
 next()
};

module.exports = { validarCampos };
