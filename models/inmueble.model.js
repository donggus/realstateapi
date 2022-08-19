const { Schema, model } = require('mongoose');

const InmuebleSchema = Schema({
    inmobiliaria: {
        type: String,
        required: [true, 'El campo inmobiliaria es obligatorio']
    },
    domicilio: {
        type: String,
        required: [true, 'El campo domicilio es obligatorio']
    },
    altura: {
        type: String,
        required: [true, 'El campo altura es obligatorio'],
    },
    piso: {
        type: String,
        default: null
    },
    img: {
        type: String,
        default: null
    }
});


InmuebleSchema.methods.toJSON = function() {
    const { __v, ...inmueble } = this.toObject();
    return inmueble;
}


module.exports = model( 'Inmueble', InmuebleSchema );