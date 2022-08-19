const bcrypt = require('bcryptjs')
const { response } = require("express");
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/user.model');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Pass no son correctos'
            })
        }

        // Verificar si el user no esta deshabilitado
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Estado: false'
            })
        }

        // Verificar la contrasenia
        const validPass = bcrypt.compareSync( password, usuario.password )
        if (!validPass) {
            return res.status(400).json({
                msg: 'Password no correcto'
            })
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        res.status(200).json({
            usuario, 
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal..',
            error
        })
    }

    
}

module.exports = {
    login
}