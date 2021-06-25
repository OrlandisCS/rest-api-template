const { response, request } = require("express")

const adminRole = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere validar el Token'
        })
    }
    const { rol, estado, nombre } = req.usuario
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no tienes los permisos suficientes para esta acción`
        })
    }

    next()

}
const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se requiere validar el Token'
            })
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(500).json({
                msg: 'Se requiere un rol válido'
            })
        }
        next()
    }
}




module.exports = {
    adminRole,
    tieneRole
}