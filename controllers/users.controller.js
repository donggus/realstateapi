const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const getAdminUsers = async(req, res = response) => {

    const admins = await User.find({ rol: "ADMIN_ROLE" })

    const adminNames = admins.map( arr => {
        return arr.username
    })

    res.json({
        msg: "get API - controller",
        inmobiliarias: adminNames
    })
}

const getUsers = async(req, res = response) => {

    const users = await User.find({ rol: "USER_ROLE" })

    const usernames = users.map( arr => {
        return arr.username
    })

    res.json({
        msg: "get API - controller",
        usuarios: usernames
    })
}

const getUserByUsername = async(req, res = response) => {

    const { username } = req.body;

    const user = await User.find({ username })

    res.json({
        msg: "get API - controller",
        user
    })
}

const editInmueble = async(req, res = response) => {

    // FUNCIONA RARO!!!!
    const { id } = req.params
    const { inmuebleID, inmobiliaria, domicilio, altura, piso } = req.body
    
    const { propiedades: existingInmuebles } = await User.findById(id)
    console.log('aqui estoy senor', existingInmuebles)
    
    // const foundID = await User.findById( inmuebleID )

    const filtered = existingInmuebles.filter( arr => arr._id == inmuebleID )
    // console.log('foundID', foundID)
    console.log('filtered', filtered[0])
    const edited = await User.findOneAndUpdate(filtered,
        { propiedades: [...existingInmuebles, 
        {
            inmobiliaria,
            domicilio,
            altura,
            piso
        }]}
    )
    console.log('acaca', edited)
    try {
        await edited.save();
        res.status(200).json({
            msg: 'SALVA3',
            edited
        })
        
    } catch (error) {
        console.log(error)
    }
}

const putUsers = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: "put API - controller",
        id
    })
}

const postUsers = async(req, res = response) => {

    const { username, nombre, correo, password, rol } = req.body;
    const usuario = new User({ username, nombre, correo, password, rol });

    // Verificar si el correo existe
    const existeEmail = await User.findOne({ correo })
    if ( existeEmail ) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        })
    }

    // Encriptar la password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    try {
        await usuario.save();
        res.json({
            msg: "post API - controller",
            usuario
        })
    } catch (error) {
        console.log('error POST', error)
        res.status(400).json(error)
    }

}

const postInmuebles = async(req, res = response) => {

    const { id } = req.params;
    const { inmuebleID } = req.body;
    const { propiedades: existingInmuebles } = await User.findById(id)
    const usuario = await User.findByIdAndUpdate( id, {
        propiedades: [
            ...existingInmuebles,
            inmuebleID
        ]
    });

    try {
        await usuario.save();
        res.status(200).json({
            msg: "post API - controller",
            usuario
        })
    } catch (error) {
        console.log('error POST', error)
        res.status(400).json(error)
    }

}

const deleteUsers = async(req, res = response) => {

    const { id } = req.params;

    const userStatus = await User.findByIdAndUpdate( id, { estado: false });
    
    res.json({userStatus})
}

module.exports = {
    getAdminUsers,
    getUsers,
    getUserByUsername,
    putUsers,
    postUsers,
    deleteUsers,
    postInmuebles,
    editInmueble
}