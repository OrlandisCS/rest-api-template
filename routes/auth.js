const { Router } = require("express");
const { check } = require("express-validator");
const { loginController } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-datos");

const router = Router();
router.post("/login",[
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], loginController);

module.exports  = router