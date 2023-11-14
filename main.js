

//funcion constructora que luego usare en el array
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
function ejecutarTest() {
    let puntaje = 0;

    arrayDePreguntas.forEach(function(preguntas) {
        let respuesta;
        do {
            respuesta = prompt(preguntas.enunciado + " (Escribé verdadero o falso)").toLowerCase();
        
            if (respuesta === 'verdadero' || respuesta === 'falso' || respuesta === 'v' || respuesta === 'f') {
                if (comprobarRespuesta(preguntas, respuesta === 'verdadero' || respuesta === 'v')) {
                    puntaje++;
                }
            } else {
                alert("Respuesta incorrecta. Por favor, responde Verdadero o Falso.");
            }
        } while (respuesta !== 'verdadero' && respuesta !== 'falso' && respuesta !== 'v' && respuesta !== 'f');
    });

    alert("Has obtenido " + puntaje + " respuestas correctas de " + arrayDePreguntas.length);
}

ejecutarTest();

//HACER UN SWITCH DE VALORES CASE SI RETURN 1 CASE NO RETURN -1 CASE INDIFERENTE RETURN 0
// let valor = function (a, b, c) {
//         a == 1;
//         b == -1;
//         c == 0;
// }
//function("VERDADERO", "FALSO")

//let suma = suma + valor

// for (let i = 0; i < arrayDePreguntas.length; i++) {
//     let respuesta = ''
//     while(respuesta !== 'verdadero' || respuesta !== 'falso'){
//         respuesta = prompt (arrayDePreguntas[i]).toLowerCase
//         if ( respuesta !== 'verdadero' || respuesta !== 'falso') {
//             alert("solo se acepta VERDADERO ó FALSO")
//         }
        
//     }

// }

