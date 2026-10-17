const numEnlaces = document.querySelectorAll('body a');

console.log(numEnlaces.length);

console.log(numEnlaces[numEnlaces.length - 2]);

let numEnlaceIgual = 0;

for (let i = 0; i < numEnlaces.length; i++) {
    if (numEnlaces[i].getAttribute("href") === "http://prueba") {
        numEnlaceIgual++;
    }
}

console.log(numEnlaceIgual);

const parrafos = document.getElementsByTagName('p');

let tercerParrafo = parrafos[2];

let numEnlacesTercerParrafo = tercerParrafo.getElementsByTagName('a');

console.log(numEnlacesTercerParrafo.length);

