const { request, response } = require("express");
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const loginController = async (req = request, res = response) => {
    const { correo, password } = req.body
    try {
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) return res.status(400).json({
            msg: 'Usuario y/o contraseña no válido'
        })
        if (!usuario.estado) return res.status(400).json({
            msg: 'Usuario y/o contraseña no válido'
        })
        const validatePassord = bcrypt.compareSync(password, usuario.password)
        if (!validatePassord) return res.status(400).json({
            msg: 'Usuario y/o contraseña no válido'
        })
        //Generar JWT
        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Error en el servidor contacte con el backend dev'
        })
    }

}
const googleController = async (req = request, res = response) => {
    const { id_token } = req.body
    try {
        const { nombre, img, correo } = await googleVerify(id_token)
        let usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            const data = {
                nombre,
                img,
                correo,
                password: 'abc',
                google: true
            }
            usuario = new Usuario(data)
            await usuario.save()
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado ',
            })
        }
        const token = await generarJWT(usuario.id)

        res.json({
           usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: 'Ha ocurrido un error en la validación',
        })

    }
}



module.exports = {
    loginController,
    googleController
}