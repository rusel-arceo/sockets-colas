const fs = require ('fs');
class Ticket
{
    constructor(numero,escritorio)
    {
        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl
{
    constructor()
    {
        this.ultimo = 0;
        this.hoy = new Date().getDate();  //Obtenenemos el días actual
        this.tickets = []; //lleva el control de los tickets pendientes
        this.ultimos4 = []; //mantiene el ticket en servicio mas los ultimos 3, esto se mostrará en la pantalla
        let data = require('../data/data.json'); //El archivo donde guardaremos la infornmacionm del ticket y fechas, podria ser una base de datos pero en este ejemplo se usara un .json
        
        //Verifica que acuando se reinicie el servidor no sea un nuevo día, si es el mismo se recoge la info del archivo, de lo contrario todo se reinicia
        if(this.hoy === data.hoy)
        {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets; //gargamos los tickets pendientes
            this.ultimos4 = data.ultimos4; 
        }
        else{
            this.reiniciarConteo();
            console.log("Reiniciado el sistema");
        }        
    }
    
    reiniciarConteo(){  //Nota que no lleva function y no es función de flecha, esto es porque esta dentro de la clase
        this.ultimo = 0;
        this.tickets= []; //reiniciamos los ticket pendiente
        this.ultimos4= []; 
        this.grabarArchivo();    
    }
    
    siguienteTicket(){ // Lleva el control de número de tokens, los aumenta y guarda en la BD
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket); //Lo mete en orden del 0 a al n
        this.grabarArchivo();
        return this.ultimo;
    }
    
    getUltimoTicket()
    {
        return this.ultimo;
    }
    getUltimos4()
    {
        return this.ultimos4;
    }
/*Lógica para atender tickets en los escritorios*/
    atenderTicket(escritorio)
    {
        if(this.tickets.length===0)
        {
            return {ok:false}
        }
        
        let numTicket= this.tickets[0].numero; //Se extrae el número para romper el paso por referencia que maneja javascript
        this.tickets.shift(); //Elimina el primer elemento del arreglo
        let atenderTicket = new Ticket (numTicket,escritorio);
        console.log(this.ultimos4);

        this.ultimos4.unshift(atenderTicket);  //Agrega un elemento al principio del arreglo.
        
        if(this.ultimos4.length>4)
        {
            console.log("desde la considción");
            this.ultimos4= this.ultimos4.slice(0,4); // Borra el ultimo elemento
        }
        this.grabarArchivo();
        console.log("ultimos4: ");
        console.log(this.ultimos4);
        return atenderTicket;  //Aunque yo retornaría el arreglo
    }

    grabarArchivo()  //Se encarga de recibir los datoas actuales y guardar en el arhivo
    {
        let jsonData = {     //Para reinicar creamos en objeto con los valores de día actual y el último ticket en caso de perdia, esto se pasará a texto json
            ultimo: this.ultimo, 
            hoy: this.hoy,
            tickets: this.tickets, //Guardamos los tixkets pendientes en el archivo
            ultimos4: this.ultimos4
        };

        let jsonString = JSON.stringify(jsonData); //Convierte un objeto literal a texto json {"ultimo":10}
        
        fs.writeFileSync('./server/data/data.json',jsonString);   //Este toma la raíz, en este caso como se importa el archivo en el server se toma el server como punto de partida  
        //Graba en el archivo de forma sincrona
    }

        

        
}

module.exports = {
    TicketControl
}