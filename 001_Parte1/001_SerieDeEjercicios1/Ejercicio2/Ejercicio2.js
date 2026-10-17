const tabla = document.createElement("table");
const estiloTabla = "color:blue; font-size:12px;";

const tr1 = document.createElement("tr");
const td1 = document.createElement("td");
td1.textContent = "Celda 1";
tr1.appendChild(td1);

const tr2 = document.createElement("tr");
const td2 = document.createElement("td");
td2.textContent = "Celda 2";
tr2.appendChild(td2);

tabla.appendChild(tr1);
tabla.appendChild(tr2);

tabla.style = estiloTabla;

tabla.border = "1";

document.body.appendChild(tabla);



