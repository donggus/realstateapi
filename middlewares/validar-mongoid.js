const Inmueble = require("../models/inmueble.model");

const validarMongoID = async( req, res, next ) => {

    const { inmuebleID } = req.body 

    const ids = await Inmueble.findById(inmuebleID)
    if (!ids) {
        return res.status(400).json({
            msg: 'BAD REQUEST, ese ID no existe'
        })
    }

    next();
}

module.exports = validarMongoID