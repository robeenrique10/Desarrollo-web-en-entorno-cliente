// 11. FETCH: LA PRIMERA PETICIÓN
// fetch(url) pide un archivo al servidor y devuelve una PROMESA.
// Es lo mismo que obtenerProductos() de la tienda, pero ahora la
// petición es real: va al servidor y vuelve.
//
// OJO: abre esta página con Live Server (http://127.0.0.1:5500/...).
// Si la abres con doble clic (file://), el navegador bloquea fetch.


// ---------- Paso 1: fetch se cumple con una RESPUESTA (Response) ----------
// La respuesta llega en cuanto llegan las CABECERAS, antes que el
// contenido. Por eso todavía no tenemos los datos: tenemos el "sobre".
fetch('data/contenido.json')
  .then(respuesta => {
    console.log(respuesta);                                   // Response { ... }
    console.log('status:', respuesta.status);                 // 200
    console.log('ok:', respuesta.ok);                         // true (status 200-299)
    console.log('tipo:', respuesta.headers.get('Content-Type')); // application/json
  });


// ---------- Paso 2: leer el contenido es OTRA promesa ----------
// El cuerpo puede ser grande y llegar poco a poco, así que leerlo
// también es asíncrono. respuesta.json() devuelve una promesa que se
// cumple con el objeto ya convertido (hace el JSON.parse por nosotros).
// Por eso SIEMPRE son dos then: uno para la respuesta, otro para los datos.
fetch('data/contenido.json')
  .then(respuesta => respuesta.json())      // DEVOLVEMOS la promesa
  .then(datos => {
    console.log(datos);                     // { titulo: '...', mensaje: '...' }
    console.log(datos.titulo);
    document.getElementById('salida').textContent = datos.mensaje;
  })
  .catch(err => console.log('Error:', err.message));


// Error típico: olvidar el return (o usar llaves sin return).
// fetch('data/contenido.json')
//   .then(respuesta => { respuesta.json(); })   // no devuelve nada
//   .then(datos => console.log(datos));          // undefined


// Para pensar: el cuerpo solo se puede leer UNA vez.
// Si llamas a respuesta.json() dos veces, la segunda falla:
// "body stream already read".

//cambiando código
// ---------- fetch en dos pasos: la etiqueta y el contenido ----------
// 1er then: llega la RESPUESTA (el paquete cerrado): status, ok, tipo...
//           Para abrirlo, respuesta.json(), que es OTRA promesa: hay que devolverla.
// 2º then:  llega el CONTENIDO, ya convertido en objeto.


// fetch('data/contenido.json')
//   .then(respuesta => {
//     console.log(respuesta)   //leer la etiqueta
//     return respuesta.json()  //abrir el paquete
//   })
//   .then(datos => {   //ver el contenido
//     console.log(datos);                     // { titulo: '...', mensaje: '...' }
//     console.log(datos.titulo);
//     document.getElementById('salida').textContent = datos.mensaje;
//   })
//   .catch(err => console.log('Error:', err.message));

//usando un json de un servidor real

// ---------- fetch en dos pasos: la etiqueta y el contenido ----------
// 1er then: llega la RESPUESTA (el paquete cerrado): status, ok, tipo...
//           Para abrirlo, respuesta.json(), que es OTRA promesa: hay que devolverla.
// 2º then:  llega el CONTENIDO, ya convertido en objeto.
// fetch('https://jsonplaceholder.typicode.com/users/1')
//   .then(respuesta => {
//     console.log(respuesta);              // Response {status: 200, ok: true, ...}
//     return respuesta.json();             // abrir el paquete
//   })
//   .then(datos => {
//     console.log(datos);                  // { id: 1, name: 'Leanne Graham', ... }
//     console.log(datos.name);             // Leanne Graham
//     document.getElementById('salida').textContent = datos.name + ' x ' + datos.username;
//   })
//   .catch(err => console.log('Error:', err.message));