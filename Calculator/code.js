const pantalla = document.querySelector(".pantalla");

function agregar(caracter) {
    pantalla.value += caracter;
}

function borrar() {
    pantalla.value = "";
}

function calcular() {
    try {
        pantalla.value = eval(pantalla.value);
    }
    catch(e) {
        pantalla.value = "Error";
    }
}