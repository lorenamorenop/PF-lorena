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

