//Traigo dos botones, uno para ingresa el nombre de la persona y darle la bienvenida. 
//Otro para empezar el test

let botonComenzar = document.getElementById("botonComenzar");
let botonEjecutar = document.getElementById("botonEjecutar");
let nombreUsuario = document.getElementById("nombreUsuarioInput");
let contenedor = document.getElementById("contenedor");

//oculto el boton comenzar ya que quiero luego usarlo una vez que haya saludado al usuario y uso un evento para llamar mi funcion 

botonEjecutar.style.display = "none";
contenedor.style.display = "none";

botonComenzar.addEventListener("click", function() {
    saludo();
});

//crea una funcion y por parametro le doy como valor el id de los div y otro que se llame "mensaje" que voy a usar debajo dentro de mi condicional para el saludo al usuario

function mostrarMensaje(idDiv, mensaje) {
    let div = document.getElementById(idDiv);
    div.innerHTML = "<p>" + mensaje + "</p>";
}

//creo la funcion saludo (ahora muestro el boton comenzar test y oculto el boton ingresar)
function saludo() {
    let respuestaSaludo = nombreUsuario.value;

    if (respuestaSaludo !== "") {
        mostrarMensaje("bienvenida", "Bienvenid@ " + respuestaSaludo + "!");
        mostrarMensaje("inicioTest", "A continuación comenzaremos con el test, solo tenes que responder Verdadero o Falso")
        botonComenzar.style.display = "none";
        botonEjecutar.style.display = "inline-block";
        contenedor.style.display = "block"; 
        botonEjecutar.addEventListener("click", ejecutarTest);

        
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

    // creo un evento para que cada vez que el usuario escriba su respuesta y haga click se guarde (push) en mi array respuesta usuario
    botonSiguiente.addEventListener("click", function() {
        let respuestaUsuario = inputRespuesta.value.trim().toLowerCase();
        respuestasUsuario.push({ pregunta: pregunta.enunciado, respuesta: respuestaUsuario });

        if (respuestaUsuario === 'verdadero' || respuestaUsuario === 'falso') {
            if (comprobarRespuesta(pregunta, respuestaUsuario === 'verdadero')) {
                puntaje++;
            }

            // Muestra la siguiente pregunta si hay más, o muestra el puntaje final
            currentIndex++;
            if (currentIndex < arrayDePreguntas.length) {
                mostrarPregunta(arrayDePreguntas[currentIndex]);
            } else {
                mostrarResultado();
            }
        } else {
            alert("Respuesta incorrecta. Por favor, responde verdadero o falso.");
        }
    });
}

function mostrarResultado() {
    contenedor.innerHTML = "<p>Has obtenido " + puntaje + " respuestas correctas de " + arrayDePreguntas.length + "</p>";
}

mostrarPregunta(arrayDePreguntas[currentIndex]);

