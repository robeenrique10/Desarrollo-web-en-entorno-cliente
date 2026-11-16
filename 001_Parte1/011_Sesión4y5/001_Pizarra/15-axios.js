// 15. AXIOS: LO MISMO, CON MENOS PASOS
// axios es una LIBRERÍA para hacer peticiones HTTP: hace lo mismo que
// fetch, pero con menos código. No viene en el navegador: aquí se carga
// desde un CDN en index.html; en un proyecto con npm: npm install axios.
// Devuelve promesas, así que se usa con then/catch igual que fetch.
//
// Las cuatro diferencias que importan:
//   1. Un solo paso: los datos están en respuesta.data, ya convertidos.
//   2. Un 404 o un 500 SÍ rechaza la promesa (no hace falta mirar ok).
//   3. Al enviar, le pasas el objeto y él hace el JSON.stringify y la cabecera.
//   4. Atajos por método: axios.get, axios.post, axios.put, axios.delete.

// Los cuatro bloques se lanzan a la vez: en la consola salen en el
// orden en que llegan las respuestas, no en el del código.

const salida = document.getElementById('salida');


// ---------- GET de JSON ----------
//  FETCH                                     AXIOS
//  fetch(url)                                axios.get(url)
//    .then(r => r.json())                      .then(r => r.data)
//    .then(datos => ...)                       .then(datos => ...)
axios.get('data/contenido.json')
  .then(respuesta => {
    console.log('axios →', respuesta);         // { data, status, headers, ... }
    console.log('datos:', respuesta.data);     // ya es un objeto
    salida.textContent = respuesta.data.mensaje;
  })
  .catch(err => console.log('Error:', err.message));


// ---------- Otros formatos ----------
// axios intenta convertir a JSON todo lo que recibe. Para TXT, HTML y XML
// le decimos que lo queremos como texto con la opción responseType.
axios.get('data/contenido.xml', { responseType: 'text' })
  .then(respuesta => {
    const xml = new DOMParser().parseFromString(respuesta.data, 'application/xml');
    console.log('XML con axios:', xml.querySelector('titulo').textContent);
  })
  .catch(err => console.log('Error:', err.message));


// ---------- Errores ----------
// El 404 ya va al catch, sin comprobar nada. En el error vienen los detalles:
//   err.response        → la respuesta del servidor (si la hubo)
//   err.response.status → 404
// Si no hubo respuesta (error de red), err.response es undefined.
axios.get('data/noexiste.json')
  .then(() => console.log('Esto NO sale'))
  .catch(err => {
    console.log('axios capturó:', err.message);       // Request failed with status code 404
    console.log('status:', err.response.status);      // 404
  });


// ---------- POST ----------
//  FETCH                                          AXIOS
//  fetch(url, {                                   axios.post(url, alumno)
//    method: 'POST',
//    headers: {'Content-Type':'application/json'},
//    body: JSON.stringify(alumno)
//  })
const alumno = { nombre: 'Lucía', apellido: 'Martín', curso: 'DWEC' };
axios.post('https://jsonplaceholder.typicode.com/posts', alumno)
  .then(respuesta => console.log('POST con axios, status', respuesta.status, respuesta.data)) // 201
  .catch(err => console.log('Error:', err.message));


// ¿Cuál uso?
// - fetch: viene en el navegador (y en Node 18+), sin instalar nada.
// - axios: menos código y mejor manejo de errores, pero es una dependencia más.
// Lo importante: si sabes uno, sabes el otro. Los dos son PROMESAS.
