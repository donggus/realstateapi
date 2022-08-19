const { response } = require("express");
const { Inmobiliaria } = require("../models");

const postInmobiliaria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Inmobiliaria.findOne({nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La inmobiliaria ${ categoriaDB } ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        // usuario: req.usuario._id
    }

    const inmobiliaria = new Inmobiliaria( data )
    // Guardar en DB
    await inmobiliaria.save();

    res.status(201).json(inmobiliaria);
}

module.exports = {
    postInmobiliaria
}