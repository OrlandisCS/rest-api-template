const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) return res.status(401).json({ msg: 'Usuario no autorizado se requiere token' })

    try {
        const { uid } = jwt.verify(token, process.env.FIRMA)
        const usuario = await Usuario.findById(uid)
        if (!usuario) return res.status(401).json({ msg: 'Usuario no válido' })

        //comprobar si el usuario esta activo
        if (!usuario.estado) return res.status(401).json({ msg: 'Usuario no autorizado' })

        req.usuario = usuario
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ msg: 'Token no válido' })
    }
}

module.exports = {
    validarJWT
}

