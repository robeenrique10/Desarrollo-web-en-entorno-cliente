const btnSum = document.getElementById("sumButton");
const valor1Input = document.getElementById("input1");
const valor2Input = document.getElementById("input2");

btnSum.addEventListener("click", () => {
    const valor1 = parseFloat(valor1Input.value);
    const valor2 = parseFloat(valor2Input.value);
    const resultado = valor1 + valor2;
    alert(`El resultado de la suma es: ${resultado}`);
    
});