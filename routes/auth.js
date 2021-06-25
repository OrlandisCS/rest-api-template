const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares");

const { loginController, googleController } = require("../controllers/auth");

const router = Router();
router.post("/login", [
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], loginController);
router.post("/google", [
    check('id_token', 'El token es necesario').notEmpty(),
    validarCampos
], googleController);

module.exports = router