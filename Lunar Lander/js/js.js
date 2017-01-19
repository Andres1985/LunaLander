var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;
var veloc=v;
var altur=y;
var aterrizaje=70;

//al cargar por completo la página...
window.onload = function(){
	//definición de eventos
	
	//mostrar menú móvil
		stop();
		motorOff();
	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	
	//Ocultar Menu Movil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}	
	
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
		cambiar();
  		motorOn();
 	  
	  } else {
		volver();
  		motorOff();
 	  }
	}
	
	//encender/apagar al apretar/soltar una tecla
		document.onkeydown = motorOn;
		document.onkeyup = motorOff;
	
	
	//Empezar a mover nave
	start();
	
	
	/*Mostrar Menu Instruccion*/
	document.getElementById("inst").onclick = function () {
		document.getElementsByClassName("instruccion")[0].style.display = "block";
		stop();
	}
	
	/*Ocultar Menu Instruccion*/
	document.getElementById("continue").onclick = function () {
		document.getElementsByClassName("instruccion")[0].style.display = "none";
		start();
	}
	
	//Mostrar Menu Acerca de..
	document.getElementById("about").onclick = function () {
		document.getElementsByClassName("acerca")[0].style.display = "block";
		stop();
	}
	
	//Ocultar Menu Acerca de ..
	document.getElementById("continua").onclick = function () {
		document.getElementsByClassName("acerca")[0].style.display = "none";
		start();
	}
	
	
}


//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
	if (fuel <=0){
		motorOff();
	}
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	veloc = v.toFixed(2);
	document.getElementById("velocidad").innerHTML=veloc;
	y +=v*dt;
	altur = (aterrizaje-y).toFixed(2)
	document.getElementById("altura").innerHTML=altur;
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
		
	} else { if(v > 5){
		fuego();
		
	} 
		stop();
		
	}
}
function motorOn(){
	if (fuel > 0) {
		cambiar();
		a = -g;
		if (timerFuel == null)
			timerFuel = setInterval(function () { actualizarFuel(); }, 10);

	}
	else
		motorOff();
}
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	volver();
}
function actualizarFuel(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
	if (fuel > 0) {
		fuel -= 0.1;
	}
	else
		fuel = 0;
	document.getElementById("fuel").innerHTML = fuel.toFixed(2);
}


//Cuando la nave explota
function fuego(){
	document.getElementById("nave").src = "img/explosion.gif";
}

//la nave con el motor en marcha
function cambiar() {
	document.getElementById("nave").src = "img/CoheteFuego.png";

}
//la nave con el motor en OFF
function volver() {
	document.getElementById("nave").src = "img/Cohete.png";
	
}
