// =====================================================================
// SESIÓN 3 · COMBINAR PROMESAS · Ejercicios 3.1, 3.2 y 3.4
// Escribe tu código debajo de cada enunciado.
// Para ejecutarlo: node ejercicios.js
// (El ejercicio 3.3, la tienda, está en la carpeta tienda/)
//
// OJO: cuando acabes un ejercicio, coméntalo (Ctrl + /) antes de pasar
// al siguiente, para que los mensajes no se mezclen.
// =====================================================================


// ---------- Código que ya tienes hecho (no hace falta tocarlo) ----------
// esperar(ms): promesa que se cumple pasados ms milisegundos
const esperar = ms => new Promise(resolve => setTimeout(resolve, ms));

// tarea(nombre, ms, falla): promesa que tarda ms milisegundos.
// Si falla es true, se rechaza; si no, se cumple con el nombre.
const tarea = (nombre, ms, falla = false) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (falla) reject(new Error(nombre + ' ha fallado'));
    else resolve(nombre);
  }, ms);
});
// ------------------------------------------------------------------------


// ---------------------------------------------------------------------
// EJERCICIO 3.1 · ¿En serie o en paralelo?
// Lanza tres tareas de 1000 ms:
//   a) primero encadenadas con then (una detrás de otra)
//   b) después todas a la vez con Promise.all
// Mide el tiempo de cada versión con console.time('nombre') al empezar
// y console.timeEnd('nombre') al terminar.
// ¿Cuánto tarda cada una y por qué?
// ---------------------------------------------------------------------

// Tu código aquí:
console.time('serie');
tarea('Tarea 1', 1000)
  .then(resultado1 => {
    console.log(resultado1);
    return tarea('Tarea 2', 1000)    
  })
  .then(resultado2 => {
    console.log(resultado2);
    return tarea('Tarea 3', 1000)
  })
  .then(resultado3 => {
    console.log(resultado3);
    console.timeEnd('serie');
  })
  .catch(error => {
    console.error(error);
    console.timeEnd('serie');
  });

  console.time('paralelo');
  Promise.all([
    tarea('Tarea 1', 1000),
    tarea('Tarea 2', 1000),
    tarea('Tarea 3', 1000)
  ])
  .then(resultados => {
    console.log(resultados);
    console.timeEnd('paralelo');
  })
  .catch(error => {
    console.error(error);
    console.timeEnd('paralelo');
  });

// Cuánto tarda cada una y por qué:
/*
La versión en serie tardará 3 segundos en ejecutarse al completo, ya que en primer lugar
hacemos que se ejecute la primera tara, cuando esta se ha ejecutado, ejecutamos la segunda
y así sucesivamente, por lo que hasta que una tarea no termine, la siguiente no se 
inicia.

Mientras tanto, en pararlelo, pasa todo lo contrario, este tarda 1 segundo, ya que toodas
las funciones se lanzan simultaneamente, por lo que en el momento en el momento que se
lance la primera de ellas, las segunda también se lanzará y así sucesivamente, por lo tanto
el tiempo de ejecución es el de la que más tarde en ejecutarse.
*/


// ---------------------------------------------------------------------
// EJERCICIO 3.2 · Elige el combinador
// Para cada situación, escribe qué método usarías
// (Promise.all, Promise.allSettled, Promise.race o Promise.any) y por qué.
// No hace falta programar nada: responde en los comentarios.
// ---------------------------------------------------------------------

// a) Necesito el usuario, sus pedidos y su carrito para pintar la página.
//    Método:Promise.all            Por qué:Ya que necesitamos que todas se cumplan si o si
//                                  para que todas las ventanas se cargen.
//
// b) Quiero cancelar si el servidor tarda más de 3 segundos.
//    Método:Promise.race           Por qué:Es una carrera que termina cuando la primero
//                                  termine, ignorando el resto
//
// c) Envío 5 correos y quiero saber cuáles han fallado.
//    Método:Promise.allSettled            Por qué:Se espera a que se terminen todas, y
//                                         nos mostrará un informe de cada una de ellas
//
// d) Tengo tres servidores con los mismos datos y me vale el primero
//    que responda bien.
//    Método:Promise.any            Por qué:Termina cuando termina la primera promesa
//                                  ignorando el resto den error o habiéndose cumplido



// ---------------------------------------------------------------------
// EJERCICIO 3.4 · Timeout (ampliación, para quien termine la tienda)
// Escribe conTimeout(promesa, ms), que devuelva una promesa que se
// rechace con new Error('Tiempo agotado') si promesa no termina en ms
// milisegundos. Pista: combina Promise.race con esperar.
// Pruébala con:
//   conTimeout(tarea('Rápida', 500), 1000)  → debe cumplirse con 'Rápida'
//   conTimeout(tarea('Lenta', 2000), 1000)  → debe fallar: Tiempo agotado
//
// Después, úsala en la tienda (lo explica el final de tienda.js).
// ---------------------------------------------------------------------

// Tu código aquí:
const conTimeout = (promesa, ms) => {
  //Creamos una promesa, la cual se rechaza cuando el tiempo haya pasado
  const timeout = esperar(ms).then(() => {
    throw new Error('Tiempo agotado');
  });
  //Creamos una carrera para que si la promesa taremina antes que el temporizador,
  //solo salga la promesa terminada, y se ignore el contador y viceversa 
  return Promise.race([promesa, timeout]);
};

conTimeout(tarea('Rápida', 500), 1000)
  .then(resultado4 => cosole.log('Éxito: ', resultado4))
  .catch(error => console.error('Error: ', error.message));

conTimeout(tarea('Lenta', 2000), 1000)
  .then(resultado5 => console.log('Éxito: ', resultado5))
  .catch(error => console.error('Error: ', error.message));