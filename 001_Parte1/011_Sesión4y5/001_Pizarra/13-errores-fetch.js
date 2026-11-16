// 13. ERRORES CON FETCH
// La trampa: un 404 o un 500 NO hacen que fetch falle.
// fetch solo se rechaza si NO HAY RESPUESTA (sin red, servidor caído,
// CORS, URL mal escrita...). Si el servidor contesta "no existe",
// eso es una respuesta y fetch se cumple con ella.

const salida = document.getElementById('salida');


// ---------- 404: fetch se CUMPLE ----------
fetch('data/noexiste.json')
  .then(respuesta => {
    console.log('¿Entra en el then? Sí. status:', respuesta.status, 'ok:', respuesta.ok);
    // 404  ok: false
  })
  .catch(err => console.log('Esto NO sale'));


// ---------- Solución: comprobar respuesta.ok y lanzar el error ----------
// Si hacemos throw dentro de un then, la promesa se rechaza
// y se salta al catch (como vimos en el ejemplo 10 de promesas).
// Esta función la usaremos siempre a partir de ahora.
// Devuelve una promesa que se cumple con los datos ya leídos.
function pedirJson(url) {
  return fetch(url).then(respuesta => {
    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al pedir ${url}`);
    }
    return respuesta.json();
  });
}

pedirJson('data/noexiste.json')
  .then(datos => console.log(datos))
  .catch(err => {
    console.log('Capturado:', err.message);      // Error 404 al pedir ...
    const p = document.createElement('p');
    p.className = 'error';
    p.textContent = err.message;
    salida.append(p);
  });

// Y si el archivo existe, pedirJson da directamente los datos:
// pedirJson('data/contenido.json').then(datos => console.log(datos.titulo));


// ---------- Error de red: aquí fetch sí se rechaza ----------
// Un dominio que no existe: no hay respuesta.
fetch('https://dominio-que-no-existe.invalid/datos.json')
  .then(() => console.log('Esto NO sale'))
  .catch(err => console.log('Error de red:', err.message)); // Failed to fetch


// ---------- Resumen: tres errores posibles ----------
// 1. Red (no hay respuesta)          → fetch se rechaza solo
// 2. HTTP (404, 500...)              → hay que comprobar respuesta.ok
// 3. Formato (el JSON está mal)      → respuesta.json() se rechaza
// Con pedirJson + un catch al final cubrimos los tres.
