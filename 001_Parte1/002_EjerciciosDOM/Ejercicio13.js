function anade() {
    // 1. Crear el nuevo elemento <li>
    var nuevoElemento = document.createElement("li");

    // 2. Crear el texto para el nuevo elemento
    var texto = document.createTextNode("Nuevo elemento añadido");

    // 3. Meter el texto dentro del <li>
    nuevoElemento.appendChild(texto);

    // 4. Obtener la lista <ul> por su id
    var lista = document.getElementById("lista");

    // 5. Añadir el <li> a la lista
    lista.appendChild(nuevoElemento);
}