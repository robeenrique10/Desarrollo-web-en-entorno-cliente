// 12. FETCH CON DISTINTOS FORMATOS
// fetch es igual para cualquier archivo. Lo que cambia es CÓMO LEES
// la respuesta en el primer then:
//   respuesta.json()  → objeto/array de JS          (archivos .json)
//   respuesta.text()  → string                      (.txt, .html, .xml, .csv...)
// No existe respuesta.xml(): el XML se lee como texto y luego se convierte.
//
// Archivos de data/ tomados del taller AJAX de Mike Morales.

const salida = document.getElementById('salida');


// ---------- JSON: .json() y ya tenemos el objeto ----------
// Cada función DEVUELVE la cadena de promesas (return fetch...),
// para poder esperarla desde fuera (lo usamos abajo, en cargarTodo).
function cargarJson() {
  return fetch('data/contenido.json')
    .then(respuesta => respuesta.json())
    .then(datos => {
      console.log('JSON →', datos);
      const h3 = document.createElement('h3');
      h3.textContent = datos.titulo;
      const p = document.createElement('p');
      p.textContent = datos.mensaje;
      salida.append(h3, p);
    });
}


// ---------- TXT: .text() y lo pintamos con textContent ----------
function cargarTxt() {
  return fetch('data/contenido.txt')
    .then(respuesta => respuesta.text())
    .then(texto => {
      console.log('TXT →', texto);
      const p = document.createElement('p');
      p.textContent = texto;
      salida.append(p);
    });
}


// ---------- HTML: .text() y lo pintamos con innerHTML ----------
// innerHTML interpreta las etiquetas. Solo con HTML de NUESTRO servidor:
// si el contenido viene de fuera, podría traer código malicioso.
function cargarHtml() {
  return fetch('data/contenido.html')
    .then(respuesta => respuesta.text())
    .then(html => {
      console.log('HTML →', html);
      const div = document.createElement('div');
      div.innerHTML = html;
      salida.append(div);
    });
}


// ---------- XML: .text() + DOMParser ----------
// DOMParser convierte el string en un documento, y lo recorremos
// con los mismos métodos que el DOM de la página.
function cargarXml() {
  return fetch('data/contenido.xml')
    .then(respuesta => respuesta.text())
    .then(texto => {
      const xml = new DOMParser().parseFromString(texto, 'application/xml');
      console.log('XML →', xml);
      const h3 = document.createElement('h3');
      h3.textContent = xml.querySelector('titulo').textContent;
      const p = document.createElement('p');
      p.textContent = xml.querySelector('mensaje').textContent;
      salida.append(h3, p);
    });
}


// Uno detrás de otro, para que salgan en orden (encadenar, como en el ejemplo 07 de promesas).
// Si los lanzáramos a la vez, aparecerían en el orden en que lleguen.
cargarJson()
  .then(() => cargarTxt())
  .then(() => cargarHtml())
  .then(() => cargarXml())
  .catch(err => console.log('Error:', err.message));


// ---------- Lo que NO hay que hacer ----------
// Leer un .txt con .json() → falla, porque el texto no es JSON válido:
// fetch('data/contenido.txt')
//   .then(r => r.json())
//   .catch(err => console.log(err.message));  // Unexpected token 'E'...


// ---------- El mismo dato, dos formatos ----------
// alumnos.json y alumnos.xml tienen los mismos 4 alumnos.
// Con JSON:  datos.clase[0].nombre
// Con XML:   xml.querySelectorAll('alumno')[0].querySelector('nombre').textContent
// Por eso hoy casi todas las APIs devuelven JSON.
