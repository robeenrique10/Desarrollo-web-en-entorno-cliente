// 14. ENVIAR DATOS: POST
// Hasta ahora todo era GET (pedir). Para ENVIAR, fetch recibe un
// segundo parámetro con las opciones de la petición.
// JSONPlaceholder es una API de pruebas: acepta el POST y te devuelve
// lo que enviaste con un id, pero no lo guarda de verdad.
// (Necesita conexión a internet.)

const salida = document.getElementById('salida');

const nuevoAlumno = { nombre: 'Pepe', apellido: 'Martín', curso: 'DWEC' };

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',                                  // por defecto es GET
  headers: { 'Content-Type': 'application/json' }, // le decimos qué enviamos
  body: JSON.stringify(nuevoAlumno)                // el cuerpo va como TEXTO
})
  .then(respuesta => {
    if (!respuesta.ok) throw new Error('Error ' + respuesta.status);
    console.log('status:', respuesta.status);      // 201 = creado
    return respuesta.json();
  })
  .then(creado => {
    console.log('Respuesta del servidor:', creado);  // { nombre..., id: 101 }
    salida.textContent = `Creado con id ${creado.id}: ${creado.nombre} ${creado.apellido}`;
  })
  .catch(err => console.log('Error:', err.message));


// Tres cosas que hay que recordar con fetch al enviar:
// 1. method: 'POST'
// 2. la cabecera Content-Type
// 3. JSON.stringify en el body (si pasas el objeto tal cual, llega "[object Object]")
// En el ejemplo 15 veremos que axios hace las tres por nosotros.


// Los otros métodos son iguales cambiando method:
//   PUT / PATCH → modificar     DELETE → borrar
// fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'DELETE' })
