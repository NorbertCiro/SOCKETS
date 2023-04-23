// Servidor de express
const express  = require('express');
//Servidor de sockets
const http     = require('http');
//Configuración del socket server
const socketio = require('socket.io');
//Path para moverse entre directorios
const path     = require( 'path' );
const Sockets  = require('./sockets');
const cors     = require('cors');


class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );

        // Configuración de sockets
        this.io = socketio(this.server,  { /* configuraciones */} );
    }

    middlewares() {
        //Desplegar el directorio público
        this.app.use(express.static( path.resolve( __dirname, '../public' ) ) );
        this.app.use( cors() );
    }

    configureSockets(){
        new Sockets( this.io );
    }

    execute() {

        //Inicializar middlewares
        this.middlewares();
        
        //Inicializar Sockets 
        this.configureSockets();

        //Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server escuchando en el puerto ', this.port );
        });
    }
}


module.exports = Server;