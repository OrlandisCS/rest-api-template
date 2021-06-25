const { request, response } = require('express')
const { Categoria } = require('../models')

const obtenerCategorias = async (req = request, res = response) => {
    try {
        let { limite = 5, desde = 1, page = 1 } = req.query
        if (page !== '1') {
            desde = Number(page) * Number(limite) - 5
        }
        const query = {
            estado: true
        }
        const [categorias, total] = await Promise.all([
            Categoria.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate("usuario", 'nombre'),
            Categoria.countDocuments(query)
        ])
        if (!categorias) return res.status(401).json({
            msg: 'No se ha encontrado ningúna categoria'
        })

        res.status(200).json({
            total,
            page,
            categorias,
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const obtenerCategoriaById = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const categoria = await Categoria.findById(id).populate("usuario", 'nombre')
        if (!categoria.estado) return res.status(401).json({
            msg: 'No se puede acceder a la categoria'
        })
        res.status(200).json({
            categoria
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const crearCategoria = async (req = request, res = response) => {
    try {
        const nombre = req.body.nombre.toUpperCase()
        const categoriadb = await Categoria.findOne({ nombre })
        if (categoriadb) {
            return res.status(400).json({
                msg: `La categoria: ${categoriadb.nombre} ya existe en la base de datos`
            })
        }
        //datos a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }
        const categoria = new Categoria(data)
        await categoria.save()
        res.status(201).json({ categoria })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
const actualizarCategoria = async (req = request, res = response) => {
    try {
        const { id } = (req.params)
        const { estado, usuario, ...data } = req.body
        data.nombre = data.nombre.toUpperCase()
        data.usuario = req.usuario._id

        const existeCategoria = await Categoria.findOne({ nombre: data.nombre })
        if (existeCategoria) {
            return res.status(400).json({
                msg: `La categoria: ${existeCategoria.nombre} ya existe en la base de datos`
            })
        }

        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, data, { new: true }).populate("usuario", 'nombre')
        res.status(200).json({ categoriaActualizada })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const delCategoria = await Categoria.findByIdAndUpdate(id, { estado: false, new: true })
    res.status(200).json({
        delCategoria
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaById,
    actualizarCategoria,
    borrarCategoria
}
