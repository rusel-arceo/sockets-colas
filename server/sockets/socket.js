const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    /*client.on('ultimoTicket',(data,call)=>{
        let ultimoTicket = ticketControl.getUltimoTicket();
        call(ultimoTicket);
    });*/ //Funcionaba bien solo que a la inversa del curso, usaré la opcion del curson para adecuarme a lo que sigue

    client.emit('estadoActual', {
        ultimoTicket: ticketControl.getUltimoTicket()
        });

    client.on('atenderTicket',(data,callback)=>{
        if(!data.escritorio) //SI no viene el escritorio mandar error
        {
            return callback(
                {
                    err:true,
                    mensaje:'El escritorio es necesario'
                });

            }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio); //solicitamos atender el ticket
        callback(atenderTicket); //Respondemos a la petición llamando el callback de respuesta mandando el ticket correcto

        //Se debe emitir o avisar de los cambios en los ultimos4 para que se reflejen  en la pantalla.
    });

    client.on('siguienteTicket',(data,call)=>{
        console.log(data);
        let ultimoTicket = ticketControl.siguienteTicket();
        call(ultimoTicket);

        /*Este codigo funciona bien pero fue reemplazado por la respuesta en el callback mandado por el front */
        // client.emit('siguienteToken', {
        //     mensaje: ultimoTicket
        // });
    });

    
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});