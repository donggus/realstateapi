const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, 'El campo usuario es requerido'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    inmobiliarias: {
        type: [String],
        default: []
    },
    propiedades: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
});


UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id
    return user;
}


module.exports = model( 'User', UserSchema );