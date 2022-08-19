const { User } = require("../models");
const Role = require("../models/rol.model");

const isValidRole = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await User.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    isValidRole,
    existeUsuarioPorId
}