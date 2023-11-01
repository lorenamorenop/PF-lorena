let usuario = true;
while (usuario) {
    let nombre = prompt("Ingresa tu nombre");
    if (nombre != "") {
        alert("Bienvenid@ " + nombre + ".");
        usuario = false;
    } else {
        alert("El usuario ingresado es incorrecto");
    }
}

function calcularsueldo(sueldobruto, obrasocial = 0.03, jubilacion = 0.11, ley19032 = 0.03) {
    let descuentos = sueldobruto * (obrasocial + jubilacion + ley19032);
    alert("El descuento total es: $" + descuentos);
    return sueldobruto - descuentos;
}

let ingresodatos = true;
while (ingresodatos) {
    let ingresosueldo = parseFloat(prompt("Por favor, introduzca su ingreso mensual en peso, sin simbolos"));
    let obrasocial = parseFloat(prompt("Ingrese la tasa de Obra social (por ejemplo, 0.03 para 3%) sin simbolos:"));
    let jubilacion = parseFloat(prompt("Ingrese la tasa de Jubilación (por ejemplo, 0.11 para 11%) sin simbolos:"));
    let ley19032 = parseFloat(prompt("Ingrese la tasa de la Ley 19032 (por ejemplo, 0.03 para 3%) sin simbolos:"));
    
    let sueldoneto = calcularsueldo(ingresosueldo, obrasocial, jubilacion, ley19032);
    alert("Su sueldo neto a cobrar es de: $" + sueldoneto);
    
    let accionconfirmar = prompt("¿Desea calcular otro sueldo?  Ingrese SI o N0");
    if (accionconfirmar == "NO") {
        ingresodatos = false;
    }
}
alert("Gracias, hasta pronto.");