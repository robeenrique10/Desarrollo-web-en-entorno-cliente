let img = document.getElementById("img");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const changeButton = document.getElementById("changeButton");

changeButton.addEventListener("click", () => {

    const width = parseFloat(input1.value);
    const height = parseFloat(input2.value);
    img.width = width;
    img.height = height;
    console.log(input1.value);
    console.log(input2.value);
    img.style
    
});