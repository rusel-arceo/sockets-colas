var socket = io(); //io para tener usar la libreria socket pero en lado del front

// socket.on('connect',function (){
//     console.log('Conectado al servidor desde el escritorio');
//     });
// socket.on('disconnect',function (){
//     console.log('Desconectado al servidor desde el escritorio');
//     });

var searchParams = new URLSearchParams(window.location.search); //obtiene todos los parametros pasados por el url
var label = $('small');
var labelEscritorio = document.querySelector('h1');
//console.log(searchParams); //imrpime todos un objeto
//console.log(searchParams.has('escritorio')); //Revisa si existe el escritorio

if(!searchParams.has('escritorio')) //si no existe el paramatro escritorio
{
    window.location ="index.html"; //mandamos al index
    throw new Error('El escritorio es necesario');
}
var escritorio = searchParams.get('escritorio'); //obtenemos el escritorio
labelEscritorio.innerHTML = "Escritorio " + escritorio;

console.log(escritorio);
$('button').on('click', function  (){
    socket.emit('atenderTicket',{escritorio:escritorio}, function(resp){
        if(resp.ok===false) //Si no hay tickets devuleve ok: false
        {
            alert("No hay más tickets");
            label.text("No hay más tickets");
        }else{
            label.text(resp.numero);
        }


    });
});
//     document.querySelector();    




