var socket = io();

socket.on('connect', function (){
    console.log("conexión pantalla publica establecida");
});

socket.on('disconnect', function (){
    console.log("conexión pantalla publica finalizada");
});

socket.on('estadoActual', function (data){  //Estará a la escucha de los últinmos 4 para mostrar en pantalla
    console.log(data);
 
    for (var i=0; i<data.ultimos4.length;i++)
    {
        document.querySelector(`#lblTicket${i+1}`).innerHTML = 'Ticket ' + data.ultimos4[i].numero;
        document.querySelector(`#lblEscritorio${i+1}`).innerHTML = 'Escritorio ' + data.ultimos4[i].escritorio;
    }
        
});
