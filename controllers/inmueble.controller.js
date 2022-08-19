const { response } = require("express");
const { User } = require("../models");
const Inmueble = require("../models/inmueble.model");


const registrarInmueble = async(req, res = response) => {

    const { inmobiliaria, domicilio, altura, piso, img } = req.body;
    const inmueble = new Inmueble({ inmobiliaria, domicilio, altura, piso, img })

    try {
        await inmueble.save();
        res.json({
            msg: 'Inmueble registrado',
            inmueble
        })
    } catch (error) {
        console.log('error POST', error)
        res.status(400).json(error)
    }
}

const getInfoInmueble = async(req, res = response) => {

    const { id } = req.params;

    const info = await Inmueble.findOne({ _id: id });

    console.log('revisar:', info)
    res.json({
        msg: 'info inmueble',
        info
    })

}

const getInmueblePorInmobiliaria = async(req, res = response) => {

    const { inmobiliaria } = req.body;

    const propsInmobiliaria = await Inmueble.find({ inmobiliaria });

    res.json({
        msg: 'info inmueble',
        propsInmobiliaria
    })

}

const getInmueblesByID = async(req, res = response) => {

    const { id } = req.params;
    // const { inmueblesIDs } = req.body;
    const { propiedades } = await User.findById({ _id: id })
    console.log('user', propiedades)

    const info = await Inmueble.find().where('_id').in(propiedades).exec();

    res.json({
        msg: 'inmuebles para esta cuenta:',
        info
    })
    
}

module.exports = {
    registrarInmueble,
    getInfoInmueble,
    getInmueblePorInmobiliaria,
    getInmueblesByID
}