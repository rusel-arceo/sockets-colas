var socket = io();
var label = document.querySelector('#lblNuevoTicket');
socket.on('connect',function (){
    console.log("Conectado al server");
});

/*socket.emit('ultimoTicket',null,function(ultimoTicket){
    label.innerHTML =`Ticket número ` + ultimoTicket;

});*/  //Tambien pudo ser alreves, al conectarse, el sevidor podria mandar el estado actual y aquí se recibía con el on y se mostraba en la pantalla

socket.on('estadoActual', function(resp){
    label.innerHTML =`Ticket número ` + resp.ultimoTicket;
});

socket.on('disconnect',function (){
    console.log("Servidor desconectado");
});

/*Establecemos una acción para eschucdar el clisk en el botón pero usaremos jquery */
$('button').on('click', function (){  //Todos los botones al hacer click ejecutara el callback
    console.log('click');
  
    socket.emit('siguienteTicket',{ usuario: "escritorio-n" },function(sigTicket){
        console.log(`Ticket número: `, sigTicket);
        label.innerHTML =`Ticket número ` + sigTicket;

    });  //Si no quiero enviar mensaje mando null
});
/*Este codigo funciona bien pero se va a implementar dentro del emit, que cuando se reciba el mensaje en el servidor
este ejecute el callback de ok y ahí se hará la implementación al html */
// socket.on("siguienteToken",function (respuesta){
//     console.log(`Ticket número: `, respuesta);
// });
