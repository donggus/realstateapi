const { User } = require("../models")

const validarRepetidoID = async( req, res, next ) => {

    const { id } = req.params;
    const { inmuebleID } = req.body;

    const { propiedades } = await User.findById({ _id: id })

    console.log('first,', propiedades)

    const foundFilter = propiedades.filter( arr => arr == inmuebleID )
    console.log('second', foundFilter)
    if (foundFilter.length > 0) {
        return res.json({
            msg: 'Ese inmueble ya esta ingresado en la cuenta.'
        })
    }
    
    next();
}

module.exports = validarRepetidoID