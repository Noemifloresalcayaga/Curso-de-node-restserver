const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/usuarios'

        //Middelwares funcion que se ejecutan cuando inica el servidor
        this.middlewares();
        this.routes();

    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }
   
    routes (){
       this.app.use(this.usersPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

module.exports = Server;