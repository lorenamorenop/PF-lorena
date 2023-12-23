//Traigo un boton para ingresa el nombre de la persona y darle la bienvenida y el contenedor donde va a suceder el test. 
let botonComenzar = document.getElementById("botonComenzar");
let nombreUsuario = document.getElementById("nombreUsuarioInput");
let contenedor = document.getElementById("contenedor");


//oculto mi contenedor ya que quiero que se muestre una vez que el usuario ha ingresado su nombre y ha hecho click en "comenzar test" y uso un evento para la funcion saludar.
contenedor.style.display = "none";
botonComenzar.addEventListener("click", saludo)

//creo una funcion y por parametro le doy como valor el id de los div y otro que se llame "mensaje" que voy a usar debajo dentro de mi condicional para el saludo al usuario
function mostrarMensaje(idDiv, mensaje) {
    let div = document.getElementById(idDiv);
    div.innerHTML = "<p>" + mensaje + "</p>";
}

//creo la funcion saludo (oculto el boton ingresar) y muestro mi contenedor
function saludo() {
    let respuestaSaludo = nombreUsuario.value;

    if (respuestaSaludo !== "") {
        mostrarMensaje("bienvenida", "Bienvenid@ " + respuestaSaludo + "!");
        mostrarMensaje("inicioTest", "A continuación comenzaremos con el test de 12 preguntas, solo tenes que responder Verdadero o Falso")
        botonComenzar.style.display = "none";
        contenedor.style.display = "block";         
    } else {
        alert("El usuario ingresado es incorrecto, intente de nuevo");
    }
}

function Preguntas(enunciado, valor) {
    this.enunciado = enunciado;
    this.valor = valor;
}

function comprobarRespuesta(preguntas, respuestaUsuario) {
    return preguntas.valor === respuestaUsuario;
}

//AGREGAR OBJETOS 
    let arrayDePreguntas = [
    new Preguntas("La clorofila es responsable del color verde en las plantas",true),
    new Preguntas("La energía no se crea ni se destruye, solo se transforma",true),
    new Preguntas("El hombre pisó la luna por primera vez en el año 1950",false),
    new Preguntas("Quién pintó 'El grito' fue Edvard Munch",true),
    new Preguntas("España ganó su primer Mundial de fútbol en el año 2006.",false),
    new Preguntas("El primer presidente de los Estados Unidos fue Thomas Jefferson", false),
    new Preguntas("El hígado está en el lado derecho del cuerpo", true),
    new Preguntas("Blancanieves fue la primera película de Disney", true),
    new Preguntas("En un equipo de voleibol hay 7 jugadores", false),
    new Preguntas("Leo Messi nacio en Salta, Argentina", false),
    new Preguntas("El carbono está presente en absolutamente todas las moléculas orgánicas", true),
    new Preguntas ("El Sol está más cerca de la Tierra en el mes de Diciembre.", true)
]

let puntaje = 0;
let currentIndex = 0;
let respuestasUsuario = [];

// Uso un local storage para que en caso de que el usuario vuelva a reiniciar la pagina o la cierre por error, quede en la pregunta que estaba respondiendo 
let currentIndexGuardado = localStorage.getItem('currentIndex');
let preguntaActualGuardada = localStorage.getItem('preguntaActual');
currentIndex = currentIndexGuardado ? parseInt(currentIndexGuardado) : 0;

function mostrarPregunta(pregunta) {
    contenedor.innerHTML = "";

    // creo un parrafo para los enunciados 
    let preguntaParrafo = document.createElement("p");
    preguntaParrafo.textContent = pregunta.enunciado;
    contenedor.appendChild(preguntaParrafo);

    // luego creo un input para que el usuario escriba la respuesta
    let inputRespuesta = document.createElement("input");
    inputRespuesta.type = "text";
    inputRespuesta.id = "respuestaInput";
    contenedor.appendChild(inputRespuesta);

    // tambien creo un botón de "siguiente pregunta"
    let botonSiguiente = document.createElement("button");
    botonSiguiente.textContent = "Siguiente Pregunta";
    contenedor.appendChild(botonSiguiente);

    //Establezco un límite de tiempo de 30 segundos para que la persona responda cada pregunta. Si el tiempo supera el límite de 30 segundos, muestra una alerta y pasa a la siguiente pregunta. Tambien uso clearInterval para limpiar el intervalo de tiempo al hacer clic en "Siguiente Pregunta" para evitar que la verificación de tiempo continúe después de responder la pregunta.

    let tiempoAgotadoAlerta = false;
    let tiempoLimite = 30000;
    let tiempoInicio = Date.now();
    
    function verificarTiempo() {
        let tiempoTranscurrido = Date.now() - tiempoInicio;
        if (tiempoTranscurrido >= tiempoLimite && !tiempoAgotadoAlerta) {
            tiempoAgotadoAlerta = true;
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tiempo agotado!!.La respuesta no fue registrada",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            currentIndex++;
            if (currentIndex < arrayDePreguntas.length) {
                tiempoAgotadoAlerta = false;
                guardarEstadoActual(currentIndex); 
                mostrarPregunta(arrayDePreguntas[currentIndex]);
            } else {
                mostrarResultado();
            }
        }
    }
    
        let intervaloTiempo = setInterval(verificarTiempo, 1000);
    

    // creo un evento para que cada vez que el usuario escriba su respuesta y haga click se guarde (push) en mi array respuesta usuario
    botonSiguiente.addEventListener("click", function() {
        clearInterval(intervaloTiempo);
        let respuestaUsuario = inputRespuesta.value.trim().toLowerCase();
        respuestasUsuario.push({ pregunta: pregunta.enunciado, respuesta: respuestaUsuario });

        if (respuestaUsuario === 'verdadero' || respuestaUsuario === 'falso') {
            if (comprobarRespuesta(pregunta, respuestaUsuario === 'verdadero')) {
                puntaje++;
            }
            currentIndex++;
            if (currentIndex < arrayDePreguntas.length) {
                guardarEstadoActual();
                mostrarPregunta(arrayDePreguntas[currentIndex]);
            } else {
                mostrarResultado();
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Respuesta incorrecta. Por favor, responde verdadero o falsos",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    });
}
//Utilizo el API de localStorage para guardar y recuperar el estado actual del test, como el índice actual y la pregunta actual.
function guardarEstadoActual() {
    localStorage.setItem('currentIndex', currentIndex.toString());
    localStorage.setItem('preguntaActual', JSON.stringify(arrayDePreguntas[currentIndex]));
}
function mostrarResultado() {
    contenedor.innerHTML = "<p>Has obtenido " + puntaje + " respuestas correctas de " + arrayDePreguntas.length + "</p>";
}

mostrarPregunta(arrayDePreguntas[currentIndex]);