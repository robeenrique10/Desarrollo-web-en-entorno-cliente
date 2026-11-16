// =====================================================================
// SESIÓN 4 · FETCH CON FORMATOS · Ejercicios 4.1 a 4.6
// Escribe tu código debajo de cada enunciado.
// Para ejecutarlo: abre index.html con Live Server (clic derecho →
// «Open with Live Server»). Con doble clic (file://) fetch no funciona.
// Los archivos que vas a pedir están en la carpeta data/.
// =====================================================================


// ---------- Código que ya tienes hecho (no hace falta tocarlo) ----------
// pintarTabla(alumnos, titulo): devuelve una <table> con los alumnos.
// alumnos es un array de objetos { nombre, apellido, edad, curso }.
function pintarTabla(alumnos, titulo) {
  const tabla = document.createElement('table');
  const caption = document.createElement('caption');
  caption.textContent = titulo;
  tabla.append(caption);
  const cabecera = tabla.insertRow();
  for (const campo of ['Nombre', 'Apellido', 'Edad', 'Curso']) {
    const th = document.createElement('th');
    th.textContent = campo;
    cabecera.append(th);
  }
  for (const a of alumnos) {
    const fila = tabla.insertRow();
    for (const valor of [a.nombre, a.apellido, a.edad, a.curso]) {
      fila.insertCell().textContent = valor;
    }
  }
  return tabla;
}
// ------------------------------------------------------------------------


// ---------------------------------------------------------------------
// EJERCICIO 4.1 · Mira la respuesta por dentro
// Haz un fetch de 'data/contenido.json' con then y, en el primer then,
// muestra por consola:
//   - la respuesta entera
//   - respuesta.status y respuesta.ok
//   - el tipo de contenido: respuesta.headers.get('Content-Type')
// Después lee el contenido con .json() y, en un segundo then, muestra
// los datos por consola. Termina la cadena con un catch.
//
// Repite lo mismo con 'data/contenido.txt' (léelo con .text()).
// ¿Qué Content-Type tiene cada uno?
// ---------------------------------------------------------------------

// Tu código aquí:
fetch('data/contenido.json')
  .then(respuesta => {
    console.log(respuesta);
    console.log('Status:', respuesta.status, 'OK:', respuesta.ok);
    console.log('Content-Type:', respuesta.headers.get('Content-Type'));
    return respuesta.json();
  })
  .then(datos => {
    console.log('Datos JSON:', datos);
  })
  .catch(error => {
    console.error('Error al cargar JSON:', error);
  });

// Content-Type del JSON:
// Content-Type del TXT:
fetch('data/contenido.txt')
  .then(respuesta => {
    console.log(respuesta);
    console.log('Status:', respuesta.status, 'OK:', respuesta.ok);
    console.log('Content-Type:', respuesta.headers.get('Content-Type'));
    return respuesta.text();
  })
  .then(texto => {
    console.log('Datos TXT:', texto);
  })
  .catch(error => {
    console.error('Error al cargar TXT:', error);
  });


// ---------------------------------------------------------------------
// EJERCICIO 4.2 · Cuatro formatos
// Completa las cuatro funciones. Cada una pide su archivo de data/ y
// pinta el resultado en su caja (#json, #txt, #html y #xml).
// Los botones de la página ya las llaman.
//   - JSON: léelo con .json(). Pinta el titulo en un <h3> y el
//           mensaje en un <p>.
//   - TXT:  léelo con .text() y píntalo con textContent.
//   - HTML: léelo con .text() y píntalo con innerHTML.
//   - XML:  léelo con .text(), conviértelo con
//           new DOMParser().parseFromString(texto, 'application/xml')
//           y saca <titulo> y <mensaje> con querySelector.
//           Píntalos como en el JSON.
// Termina cada cadena con un catch que pinte el mensaje del error
// en la caja.
// ---------------------------------------------------------------------

function cargarJson() {
  // Tu código aquí
  const caja = document.querySelector('#json');

  fetch('data/contenido.json')
    .then(respuesta => respuesta.json())
    .then(datos => {
      caja.innerHTML = `
      <h3>${datos.titulo}</h3>
      <p>${datos.mensaje}</p>
      `;
    })
    .catch(error => {
      caja.textContent = `Error al cargar JSON: ${error.message}`;
    });
}

function cargarTxt() {
  // Tu código aquí
  const caja = document.querySelector('#txt');

  fetch('data/contenido.txt')
    .then(respuesta => respuesta.text())
    .then(texto => {
      caja.textContent = texto;
    })
    .catch(error => {
      caja.textContent = `Error al cargar TXT: ${error.message}`;
    });
}

function cargarHtml() {
  // Tu código aquí
  const caja = document.querySelector('#html');

  fetch('data/contenido.html')
    .then(respuesta => respuesta.text())
    .then(html => {
      caja.innerHTML = html;
    })
    .catch(error => {
      caja.textContent = `Error al cargar HTML: ${error.message}`;
    });
}

function cargarXml() {
  // Tu código aquí
  const caja = document.querySelector('#xml');

  fetch('data/contenido.xml')
    .then(respuesta => respuesta.text())
    .then(texto => {
      const xmlDoc = new DOMParser().parseFromString(texto, 'application/xml');
      const titulo = xmlDoc.querySelector('titulo').textContent;
      const mensaje = xmlDoc.querySelector('mensaje').textContent;
      caja.innerHTML = `
        <h3>${titulo}</h3>
        <p>${mensaje}</p>
      `;
    })
    .catch(error => {
      caja.textContent = `Error al cargar XML: ${error.message}`;
    });
}



// ---------------------------------------------------------------------
// EJERCICIO 4.3 · Piensa y prueba
// Responde en los comentarios. Para la c) y la d), cambia el código del
// 4.2, prueba y después déjalo como estaba.
// ---------------------------------------------------------------------

// a) ¿Por qué hacen falta DOS then para tener
//    los datos de un fetch?
//Porque el primer then nos da la respuesta del fetch, pero no los datos, los
//cuales obtenemos mediante el segundo then

// b) Hay respuesta.json() y respuesta.text(), pero no respuesta.xml().
//    ¿Cómo leemos entonces un XML?
//Lo leeremos como un archivo de texto, y luego lo paseamos con DOMParser
//a un objeto XML para poder acceder a sus elementos y valores

// c) En cargarJson, cambia la ruta por 'data/contenido.txt'.
//    ¿Qué error sale? ¿En qué paso falla: en el fetch o en el .json()?
//El error que nos sale es Unexpected token 'E', diciéndonos que es un arcchivo
//JSON invalido. Este error se produce porque al ser un archivo de texto, no se
//puede pasear como un JSON.

// d) En cargarHtml, cambia innerHTML por textContent. ¿Qué cambia?
//    ¿Por qué es peligroso usar innerHTML con HTML que no es nuestro?
//Lo que pasa es que al usar textContent, el contenido que teníamos en el archivo
//HTML se mostrará como un texto plano, mientras que con innerHTML se mostrará
//como contenido HTML.



// ---------------------------------------------------------------------
// EJERCICIO 4.4 · Los errores de fetch
// a) Escribe la función pedir(url, formato). Debe DEVOLVER (return)
//    la promesa del fetch con un then que:
//    - si respuesta.ok es false, lance un error:
//        throw new Error(`Error ${respuesta.status} en ${url}`)
//    - si formato es 'json', devuelva respuesta.json();
//      si no, devuelva respuesta.text()
//    Así, quien la use recibe los datos ya leídos en un solo then:
//      pedir('data/contenido.json', 'json').then(datos => ...)
// b) Completa probarErrores: usa pedir con 'data/noexiste.json' y,
//    en el catch, pinta el mensaje del error en #errores.
// c) Quita el if de pedir y vuelve a probar. ¿Qué pasa ahora?
//    ¿Por qué fetch no falla solo con un 404?
// A partir de aquí, usa pedir en los demás ejercicios.
// ---------------------------------------------------------------------

// Tu código aquí (pedir):
function pedir(url, formato) {
  return fetch(url)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status} en ${url}`);
      }
      return formato === 'json' ? respuesta.json() : respuesta.text();
    });
}

function probarErrores() {
  // Tu código aquí
  const caja = document.querySelector('#errores');
  pedir('data/noexiste.json', 'json')
    .then(datos => {
      caja.textContent = `Datos recibidos: ${JSON.stringify(datos)}`;
    })
    .catch(error => {
      caja.textContent = `Error al cargar archivo: ${error.message}`;
    });
}

// Respuesta c):
/*Lo que pasa es que manda un error 404, ya que el fetch rezhaza la promesa,
solamente si hay un fallo de red, pero en este caso el problema en que la
comunicación con el servidor fue correcta, pero tendremos que comprobar manualmente
el respuessta.ok para ver si la respuesta fue correcta o no.
*/


// ---------------------------------------------------------------------
// EJERCICIO 4.5 · Los mismos alumnos en dos formatos
// data/alumnos.json y data/alumnos.xml tienen los mismos 4 alumnos.
// Las dos primeras funciones no pintan nada: DEVUELVEN una promesa
// que se cumple con el array de alumnos (usa pedir y un then).
// a) cargarAlumnosJson(): promesa del array de alumnos del JSON.
//    Mira cómo es el archivo: los alumnos están dentro de "clase".
// b) cargarAlumnosXml(): promesa de un array con LA MISMA FORMA
//    { nombre, apellido, edad, curso }. Recorre los <alumno> con
//    querySelectorAll. Ojo: en el XML todo es texto, así que la edad
//    hay que pasarla a número con Number().
// c) mostrarAlumnos(): pide los dos A LA VEZ con Promise.all y añade a
//    #alumnos una tabla de cada uno con pintarTabla(alumnos, titulo).
//    Muestra por consola si los dos tienen el mismo número de alumnos.
// ¿Con qué formato ha sido más fácil? ¿Por qué crees que casi todas
// las APIs usan JSON?
// ---------------------------------------------------------------------

function cargarAlumnosJson() {
  // Tu código aquí
  return pedir('data/alumnos.json', 'json')
    .then(datos => datos.clase);
}

function cargarAlumnosXml() {
  // Tu código aquí
  return pedir('data/alumnos.xml', 'text')
    .then(xml => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      const alumnos = [];
      doc.querySelectorAll('alumno').forEach(nodo => {
        alumnos.push({
          nombre: nodo.querySelector('nombre').textContent,
          apellido: nodo.querySelector('apellido').textContent,
          edad: Number(nodo.querySelector('edad').textContent),
          curso: nodo.querySelector('curso').textContent
        });
      });
      return alumnos;
    });
}

function mostrarAlumnos() {
  // Tu código aquí
  const caja = document.querySelector('#alumnos');
  Promise.all([cargarAlumnosJson(), cargarAlumnosXml()])
    .then(([alumnosJson, alumnosXml]) => {
      caja.appendChild(pintarTabla(alumnosJson, 'Alumnos JSON'));
      caja.appendChild(pintarTabla(alumnosXml, 'Alumnos XML'));
      console.log('Número de alumnos JSON:', alumnosJson.length);
      console.log('Número de alumnos XML:', alumnosXml.length);
    })
    .catch(error => {
      caja.textContent = `Error al cargar alumnos: ${error.message}`;
    });
}

// ¿Qué formato ha sido más fácil y por qué?
//El formato JSON ha sido más fácil, ya que el XML requiere parsear el texto
//y recorrer los nodos para obtener los datos, mientras que el JSON, accederá
//directamente a los datos.


// ---------------------------------------------------------------------
// EJERCICIO 4.6 · Informe de carga (ampliación)
// Quieres comprobar qué archivos se cargan bien. Pide estos cinco A LA
// VEZ con pedir, cada uno con su formato:
//   'data/contenido.json' json      'data/contenido.txt'  text
//   'data/contenido.xml'  text      'data/noexiste.json'  json
//   'data/contenido.txt'  json   ← este fallará: ¿por qué?
// Usa el combinador que espera a TODAS aunque alguna falle (sesión 3).
// Pinta en #informe una lista <ul> con una línea por archivo:
//   ✔ data/contenido.json          (clase ok)
//   ✘ data/noexiste.json: Error 404 en data/noexiste.json   (clase error)
// ---------------------------------------------------------------------

function informe() {
  const caja = document.querySelector('#informe');
  caja.innerHTML = ''; // Limpiamos por si se pulsa varias veces

  // Guardamos url y formato juntos para tener la url a mano luego con el índice (i)
  const archivos = [
    { url: 'data/contenido.json', formato: 'json' },
    { url: 'data/contenido.txt',  formato: 'text' },
    { url: 'data/contenido.xml',  formato: 'text' },
    { url: 'data/noexiste.json',  formato: 'json' },
    { url: 'data/contenido.txt',  formato: 'json' }
  ];

  // Creamos el array de promesas usando pedir
  const promesas = archivos.map(item => pedir(item.url, item.formato));

  Promise.allSettled(promesas)
    .then(resultados => {
      const ul = document.createElement('ul');

      resultados.forEach((resultado, i) => {
        const li = document.createElement('li');
        const url = archivos[i].url;

        if (resultado.status === 'fulfilled') {
          li.textContent = `✔ ${url}`;
          li.classList.add('ok');
        } else {
          // resultado.reason es el objeto Error lanzado
          li.textContent = `✘ ${url}: ${resultado.reason.message}`;
          li.classList.add('error');
        }

        ul.appendChild(li);
      });

      caja.appendChild(ul);
    });
}
