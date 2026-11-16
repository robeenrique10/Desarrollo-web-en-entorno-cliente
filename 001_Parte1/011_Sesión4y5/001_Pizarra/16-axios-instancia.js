// 16. CONFIGURAR UNA VEZ: INSTANCIA DE AXIOS Y TIEMPO MÁXIMO
// En un proyecto todas las peticiones van al mismo servidor. En vez de
// repetir la URL completa, se crea una instancia con la configuración común.

const salida = document.getElementById('salida');


// ---------- Instancia de axios ----------
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // se añade delante de cada ruta
  timeout: 3000                                    // si tarda más de 3 s, rechaza
});

// Ahora las rutas son cortas: /users → https://jsonplaceholder.typicode.com/users
api.get('/users')
  .then(respuesta => {
    const nombres = respuesta.data.map(u => u.name);
    console.log('Usuarios:', nombres);
    salida.textContent = nombres.join(', ');
  })
  .catch(err => console.log('Error:', err.message));


// ---------- Varias peticiones a la vez: Promise.all, como en la sesión 3 ----------
Promise.all([api.get('/users/1'), api.get('/posts?userId=1')])
  .then(respuestas => {
    const usuario = respuestas[0].data;
    const posts = respuestas[1].data;
    console.log(`${usuario.name} tiene ${posts.length} posts`);
  })
  .catch(err => console.log('Error:', err.message));


// ---------- Tiempo máximo con fetch ----------
// fetch no tiene opción timeout, pero sí una señal para cancelar.
// AbortSignal.timeout(ms) cancela la petición si tarda más de ms.
// (Es lo que hacíamos a mano con conTimeout y Promise.race en el 3.4.)
fetch('https://jsonplaceholder.typicode.com/users', { signal: AbortSignal.timeout(3000) })
  .then(r => r.json())
  .then(usuarios => console.log('fetch con timeout:', usuarios.length, 'usuarios'))
  .catch(err => console.log('fetch cancelado:', err.name)); // TimeoutError

// Prueba: pon 1 ms en los dos timeout y mira qué error sale en cada uno.
