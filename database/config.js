const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN)
        console.log('Base de datos Online!')

    } catch (error) {
        console.log('db error', error)
        throw new Error('error en la conexion del DB')
    }

}

module.exports = {
    dbConnection
}