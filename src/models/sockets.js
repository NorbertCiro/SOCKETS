class Sockets {

    constructor( io ) {
        this.io = io;

        this.socketsEvents();

    }

    socketsEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            //Enviar evento al server
            socket.emit('mensaje-bienvenida', { msg:'Bienvenido al server',
            fecha: new Date() });
        
            //Escuchar el evento del servidor
            socket.on('mensaje-cliente', ( data ) => {
                console.log( data )
            });
        
            socket.on('message-customer', ( data ) => {
                console.log( data );
        
                this.io.emit('message-from-server' , data );     
            });
        });   
    }
}

module.exports = Sockets;