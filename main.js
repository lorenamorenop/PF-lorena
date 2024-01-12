async function init() {
    // DECLARACIÓN DE VARIABLES

    //Traigo un boton para ingresa el nombre de la persona y darle la bienvenida y el contenedor donde va a suceder el test.
    let botonComenzar = document.getElementById("botonComenzar");
    let nombreUsuario = document.getElementById("nombreUsuarioInput");
    let contenedor = document.getElementById("contenedor");

    //oculto mi contenedor ya que quiero que se muestre una vez que el usuario ha ingresado su nombre y ha hecho click en "comenzar test" y uso un evento para la funcion saludar.
    contenedor.style.display = "none";
    botonComenzar.addEventListener("click", saludo);

    let puntaje = 0;
    let currentIndex = 0;
    let respuestasUsuario = [];
    let arrayDePreguntas;
    let intervaloTiempo;

    // Uso un local storage para que en caso de que el usuario vuelva a reiniciar la pagina o la cierre por error, quede en la pregunta que estaba respondiendo
    let currentIndexGuardado = localStorage.getItem("currentIndex");
    let preguntaActualGuardada = localStorage.getItem("preguntaActual");

    if (currentIndexGuardado === "12" || !currentIndexGuardado) {
    currentIndex = 0;
    } else {
    currentIndex = parseInt(currentIndexGuardado);
    }
    function obtenerPreguntas() {
    fetch("preguntas.json")
        .then((respuesta) => respuesta.json())
        .then((data) => {
        arrayDePreguntas = data;
        mostrarPregunta(arrayDePreguntas[currentIndex]);
        })
        .catch((error) => console.error("Error al obtener las preguntas:", error));
    }

    // FUNCIONES

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
        mostrarMensaje(
        "inicioTest",
        "A continuación comenzaremos con el test de 12 preguntas, solo tenes que responder Verdadero o Falso"
        );
        botonComenzar.style.display = "none";
        contenedor.style.display = "block";
        obtenerPreguntas();
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

    //Establezco un límite de tiempo de 30 segundos para que la persona responda cada pregunta. Si el tiempo supera el límite de 30 segundos, muestra una alerta y pasa a la siguiente pregunta. Tambien uso clearInterval para limpiar el intervalo de tiempo al hacer clic en "Siguiente Pregunta" para evitar que la verificación de tiempo continúe después de responder la pregunta.

    function mostrarPregunta(pregunta) {
    contenedor.innerHTML = "";
    let tiempoInicio = Date.now();
    let tiempoAgotadoAlerta = false;
    let tiempoLimite = 30000;

    if (!tiempoAgotadoAlerta) intervaloTiempo = setInterval(verificarTiempo, 1000);
    
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

    function verificarTiempo() {
        let tiempoTranscurrido = Date.now() - tiempoInicio;

        if (tiempoTranscurrido >= tiempoLimite && !tiempoAgotadoAlerta) {
        tiempoAgotadoAlerta = true;
        clearInterval(intervaloTiempo);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tiempo agotado!!.La respuesta no fue registrada",
            footer: '<a href="#">Why do I have this issue?</a>',
        }).then(() => {
            tiempoAgotadoAlerta = false;
            if (currentIndex < arrayDePreguntas.length) mostrarPregunta(arrayDePreguntas[currentIndex]);
        });
        currentIndex++;
        if (currentIndex < arrayDePreguntas.length) {
            guardarEstadoActual(currentIndex);
            if (!tiempoAgotadoAlerta) mostrarPregunta(arrayDePreguntas[currentIndex]);
        } else {
            mostrarResultado();
        }
        }
    }

      // creo un evento para que cada vez que el usuario escriba su respuesta y haga click se guarde (push) en mi array respuesta usuario
    botonSiguiente.addEventListener("click", function () {
        let respuestaUsuario = inputRespuesta.value.trim().toLowerCase();

        respuestasUsuario.push({
        pregunta: pregunta.enunciado,
        respuesta: respuestaUsuario,
        });
        if (respuestaUsuario === "verdadero" || respuestaUsuario === "falso") {
        clearInterval(intervaloTiempo);
        if (comprobarRespuesta(pregunta, respuestaUsuario === "verdadero")) {
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
            footer: '<a href="#">Why do I have this issue?</a>',
        });
        }
});
    }
    //Utilizo el API de localStorage para guardar y recuperar el estado actual del test, como el índice actual y la pregunta actual.
    function guardarEstadoActual() {
    localStorage.setItem("currentIndex", currentIndex.toString());
    localStorage.setItem("preguntaActual", JSON.stringify(arrayDePreguntas[currentIndex]));
    }
    function mostrarResultado() {
    contenedor.innerHTML =
        "<p>Has obtenido " + puntaje + " respuestas correctas de " + arrayDePreguntas.length + "</p>";

    clearInterval(intervaloTiempo);
    localStorage.clear();
}
}
init();