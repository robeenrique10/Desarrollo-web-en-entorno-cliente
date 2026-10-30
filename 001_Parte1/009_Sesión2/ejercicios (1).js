// =====================================================================
// SESIÓN 2 · PROMESAS · Ejercicios 2.1, 2.2, 2.3, 2.4, 2.5 y 2.7
// Escribe tu código debajo de cada enunciado.
// Para ejecutarlo: node ejercicios.js
// (El ejercicio 2.6 está en semaforo.js)
//
// OJO: estos ejercicios tardan en terminar, así que sus mensajes se
// pueden mezclar en la consola. Cuando acabes uno, coméntalo
// (selecciónalo y pulsa Ctrl + /) antes de pasar al siguiente.
// =====================================================================


// ---------- Código que ya tienes hecho (no hace falta tocarlo) ----------

// Para el ejercicio 2.1
function hervirAgua(litros) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (litros > 0) resolve('Agua hirviendo: ' + litros + ' litros');
      else reject(new Error('No hay agua en la olla'));
    }, 3000);
  });
}

// Para el ejercicio 2.4
function pedirPizza(tipo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tipo === 'piña') reject(new Error('No hacemos pizza con piña'));
      else resolve('Pizza ' + tipo);
    }, 1000);
  });
}

function hornearPizza(pizza) {
  return new Promise(resolve => {
    setTimeout(() => resolve(pizza + ' horneada'), 1000);
  });
}
// ------------------------------------------------------------------------


// ---------------------------------------------------------------------
// EJERCICIO 2.1 · Usar una promesa ya hecha
// La función hervirAgua (arriba) ya está hecha y devuelve una promesa.
// Úsala con then, catch y finally:
//   - con 2 litros debe salir el mensaje de éxito
//   - con 0 litros debe salir el error
//   - en los dos casos, al final debe salir «Fuego apagado»
// ---------------------------------------------------------------------

// Tu código aquí:
// Llamamos al método hervirAgua con 2 litros
hervirAgua(2).then((mensaje) => {
    // Si la promesa se cumple, mostramos el mensaje de éxito
    console.log(mensaje);
  }) 
   // Si la promesa es falsa, mostramos el mensaje de error
  .catch((error) => {
    console.error(error.message);
  })
   // Al final, se ejecuta el bloque finally, mostrando el mensaje de "Fuego apagado"
  .finally(() => {
    console.log('Fuego apagado');
  });

// Llamamos al método hervirAgua con 0 litros
hervirAgua(0)
  // Si la promesa se cumple, mostramos el mensaje de éxito
  .then((mensaje) => {
    console.log(mensaje);
  })
  // Si la promesa es falsa, mostramos el mensaje de error
  .catch((error) => {
    console.log(error.message);
  })
  // Al final, se ejecuta el bloque finally, mostrando el mensaje de "Fuego apagado"
  .finally(() => {
    console.log('Fuego apagado');
  });

// ---------------------------------------------------------------------
// EJERCICIO 2.2 · Mi primera promesa: lanzar una moneda
// Crea lanzarMoneda(), que devuelva una promesa que tarde 500 ms y:
//   - se cumpla (resolve) con 'cara', o
//   - se rechace (reject) con new Error('cruz'),
// cada caso con un 50 % de probabilidad (pista: Math.random() < 0.5).
// Consúmela con then, catch y finally, mostrando el resultado en la
// consola. Ejecútalo varias veces.
// Pista: copia la plantilla de pedirPizza y cambia lo de dentro.
// ---------------------------------------------------------------------

// Tu código aquí:

// Creamos la función lanzarMoneda que devuelve una promesa
function lanzarMoneda() {
  return new Promise((resolve, reject) => {

    // Usamos setTimeout para simular un retraso de 500 ms
    setTimeout(() => {
      // Usamos Math.random() para que cada caso solo tenga un 50% de probabilidad de salir
      if (Math.random() < 0.5) {
        resolve('cara');
      } else {
        reject(new Error('cruz'));
      }
    }, 500);
  });
}

// Lanzamos la moneda
lanzarMoneda()
  // Si la promesa se cumple, mostramos el resultado en la consola
  .then((resultado) => {
    console.log(resultado);
  })
  // Si la promesa es falsa, mostramos el mensaje de error
  .catch((error) => {
    console.error(error.message);
  })
  // Al final, se ejecuta el bloque finally, mostrando el mensaje de "Lanzamiento de moneda finalizado"
  .finally(() => {
    console.log('Lanzamiento de moneda finalizado');
  });


// ---------------------------------------------------------------------
// EJERCICIO 2.3 · Comprobar la edad
// Crea comprobarEdad(edad), que devuelva una promesa que tarde 1 segundo:
//   - si la edad es 18 o más, se cumple con 'Puede entrar'
//   - si no, se rechaza con new Error('Es menor de edad')
// Pruébala con 20 y con 15.
// ---------------------------------------------------------------------

// Tu código aquí:

// Creamos la función comprobarEdad que devuelve una promesa
function comprobarEdad(edad) {
  return new Promise((resolve, reject) => {
    // Usamos setTimeout para simular un retraso de 1 segundo
    setTimeout(() => {
      // Comprobamos si la edad es 18 o más, en el caso de ser 18 o más, se cumple y 
      // puede entrar en caso contrario lo rechazamos con un error
      if (edad >= 18) {
        resolve('Puede entrar');
      } else {
        reject(new Error('Es menor de edad'));
      }
    }, 1000);
  });
}

// Probamos la función comprobarEdad con 20
comprobarEdad(20)
  // Si la promesa se cumple, mostramos el mensaje de éxito
  .then((mensaje) => {
    console.log(mensaje);
  })
  // Si la promesa es falsa, mostramos el mensaje de error
  .catch((error) => {
    console.error(error.message);
  });

// Probamos la función comprobarEdad con 15
comprobarEdad(15)
  // Si la promesa se cumple, mostramos el mensaje de éxito
  .then((mensaje) => {
    console.log(mensaje);
  })
  // Si la promesa es falsa, mostramos el mensaje de error
  .catch((error) => {
    console.error(error.message);
  });


// ---------------------------------------------------------------------
// EJERCICIO 2.4 · Encuentra el fallo
// Este código debería mostrar 'Pizza margarita horneada', pero muestra
// undefined. Quita el /* y el */, ejecútalo, explica por qué pasa
// y corrígelo.
// ---------------------------------------------------------------------

// Por qué falla: Falla porque el primer then no hace nada, por lo que el segundo then recibe undefined. La solución
//es añadirle el return al primer then para que devuelva la prromesa de hornearPizza.


pedirPizza('margarita')
  .then(pizza => {
     return hornearPizza(pizza);
  })
  .then(pizza => console.log(pizza));


// ---------------------------------------------------------------------
// EJERCICIO 2.5 · esperar(ms) y cuenta atrás
// Escribe esperar(ms), que devuelva una promesa que se cumpla pasados
// ms milisegundos. Úsala para mostrar 3, 2, 1 y ¡Ya!, con un segundo
// entre cada uno, ENCADENANDO then (un then debajo de otro, sin meter
// uno dentro de otro).
// ---------------------------------------------------------------------

// Tu código aquí:

// Creamos la función esperar que devuelve una promesa
function esperar(ms) {
  return new Promise(resolve => {
    // Usamos setTimeout para simular un retraso de ms milisegundos
    setTimeout(resolve, ms);
  });
}

// Encadenamos los then para mostrar 3, 2, 1 y ¡Ya! con un segundo de espera entre cada uno
esperar(1000)
  .then(() => {
    console.log(3);
    return esperar(1000);
  })
  .then(() => {
    console.log(2);
    return esperar(1000);
  })
  .then(() => {
    console.log(1);
    return esperar(1000);
  })
  .then(() => {
    console.log('¡Ya!');
  });

// ---------------------------------------------------------------------
// EJERCICIO 2.7 · Predice el orden (reto)
// ANTES de ejecutar, escribe tu predicción. Luego quita /* y */.
// ---------------------------------------------------------------------

// Mi predicción: Lo que sucede es que en primer lugar se ejecuta el console.log('A'), luego promise.resolve('C'), 
// luego se ejecuta el console.log('D'), y finalmente se ejecuta el setTimeout. Por lo tanto el orden de salida 
// será: A, D, C, B.


console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve('C').then(v => console.log(v));
console.log('D');

