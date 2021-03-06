const { Router } = require("express");
const { check } = require("express-validator");
//Importación de los middlewares
const {
  adminRole,
  tieneRole,
  validarCampos,
  validarJWT
} = require("../middlewares");
//Importaciones de diferentes funciones de utilidad
const {
  isValidateRol,
  emailExist,
  idExist,
} = require("../helpers/db-validators");
//Controllers
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check(
      "password",
      "El password es obligatorio & ha de ser mayor a 6 carácteres"
    ).isLength({ min: 6 }),
    check("correo", "El correo introducido no es valido").isEmail(),
    check("correo", "El correo introducido ya esta en uso").custom((req) =>
      emailExist(req)
    ),
    //check("rol", "Este rol no es válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol", "Este rol no es válido").custom(isValidateRol),
    validarCampos,
  ],
  usuariosPost
);
router.put(
  "/:id",
  [
    check("id", " No es un id válido").isMongoId(),
    check("id").custom(idExist),
    check("rol", "Este rol no es válido").custom(isValidateRol),
    validarCampos,
  ],
  usuariosPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    adminRole,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check("id", " No es un id válido").isMongoId(),
    check("id").custom(idExist),
    validarCampos,
  ],
  usuariosDelete
);
router.patch("/", usuariosPatch);
module.exports = router;
