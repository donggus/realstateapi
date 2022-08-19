const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            inmobiliaria: '/api/inmobiliarias',
            inmuebles: '/api/inmuebles'
        }

        // Conectar a DB
        this.conectarDB();

        // Middlewares
        this.middlewares();
        this.routes();
    }

    routes() {
        
        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.users, require('../routes/users.route'));
        this.app.use(this.paths.inmobiliaria, require('../routes/inmobiliaria.route'));
        this.app.use(this.paths.inmuebles, require('../routes/inmueble.route'));

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use( express.json() );
        
        // Directorio publico
        this.app.use( express.static('public') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }

}

module.exports = Server;