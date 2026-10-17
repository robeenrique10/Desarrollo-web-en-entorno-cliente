function muestra() {
    // 1. Seleccionamos los elementos mediante su ID
    const elementoAdicional = document.getElementById("adicional");
    const enlace = document.getElementById("enlace");

    // 2. Cambiamos la clase del texto adicional para que pase a ser visible
    elementoAdicional.className = "visible";

    // 3. Ocultamos el enlace para que deje de mostrarse
    enlace.className = "oculto";
}