// =====================================================================
// EJERCICIO 2.6 · Adiós, pirámide: el semáforo con promesas
// Abre semaforo.html en el navegador para ver el resultado.
//
// Rehaz el semáforo del ejercicio 1.4 (verde 3 s → ámbar 1 s → rojo 3 s,
// y vuelta a empezar), pero ahora con promesas:
//
// 1. Copia aquí tu función esperar(ms) del ejercicio 2.5.
// 2. Crea color(c, ms), que pinte el círculo con el color c
//    y DEVUELVA esperar(ms).
// 3. Encadena los tres colores con then, sin meter un then dentro de otro.
//
// Compara la forma del código con la de tu versión del ejercicio 1.4.
// =====================================================================

const semaforo = document.getElementById('semaforo');

// Tu código aquí:

// Creamos la función esperar que devuelve una promesa
function esperar(ms) {
  return new Promise(resolve => {
    // Usamos setTimeout para simular un retraso de ms milisegundos
    setTimeout(resolve, ms);
  });
}

// Creamos la función color que cambiara el color del semáforo dependindo de lo que reciba por parámetro y devolverá 
// la promesa de esperar(ms)
function color(c, ms) {
  semaforo.style.backgroundColor = c;
  return esperar(ms);
}

// Crearemos un ciclo para el semáforo, el cual cambiará el color del semáforo dependiendo de lo que reciba por
// parámetro con una espera también dependiendo del parámetro.
const cicloSemaforo = () => {
  color('green', 3000)
    .then(() => color('yellow', 1000))
    .then(() => color('red', 3000))
    .then(cicloSemaforo);
}

// Ejecutamos el ciclo del semáforo
cicloSemaforo();