const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;
const products = [
    {
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    }
];
const divisa = " €";
const htmlList = document.getElementById("list");

//IMPRIMIR LISTA
initializeProductList(products);

function initializeProductList(productList){
  for (let index = 0; index < productList.length; index++) {
    createHtmlProduct(index, productList[index]);  
  }
  habilitarBoton();
}

//IMPRIMIR INDEX / DESCRIPCIÓN / INPUT Y CREAR DIV PARA ANIDAR
function createHtmlProduct(indice, producto){
    const index = createIndexHtmlElement(indice);
    const description = createProductDescrHtmlElement(producto);
    const input = createInputHtmlElement(producto, indice);
    const productPrice = createProductPriceHtmlElement(producto);
    var div = document.createElement("div");
    div.setAttribute("class","content");
    div.appendChild(index);
    div.appendChild(description);
    div.appendChild(productPrice);
    div.appendChild(input);
    htmlList.appendChild(div);
}

//FUNCION CREAR INDEX
function createIndexHtmlElement(indice){
var index = document.createElement("h5");
index.setAttribute("class", "index")
index.innerText = indice+1 + ". ";
return index; 
}

//FUNCION CREAR DESCRIPCION
function createProductDescrHtmlElement(producto){
    var product = document.createElement("p");
    product.innerText = producto.description;
    product.setAttribute("class", "descr")
    return product; 
}

//FUNCION CREAR PRECIO UD.
function createProductPriceHtmlElement(producto){
    var productPrice = document.createElement("span");
    productPrice.innerText =  producto.price + divisa;
    productPrice.setAttribute("class", "price")
    return productPrice; 
}

//FUNCION CREAR INPUT
function createInputHtmlElement(producto, indice){
    var input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", "product-unit"+indice);
    input.setAttribute("class", "input");
    input.setAttribute("value", 0);
    input.setAttribute("min", 0);
    input.setAttribute("max", producto.stock);
    input.addEventListener("change", (event) => {
        if(parseInt(event.target.value, 10)  > producto.stock){
            alert("El stock de este producto es limitado, solo quedan " + producto.stock +" unidades de " + producto.description)
            producto.units = producto.stock;
            } else {
            producto.units = parseInt(event.target.value);
            }
            document.getElementById("product-unit"+indice).value = producto.units;
            habilitarBoton();
    });
    return input;
}


/////5. RESULTADOS
//BOTON
function habilitarBoton(){
    let todosACero = true;
    for (let index = 0; index < products.length; index++) {
       if(products[index].units !== 0){
           todosACero = false;
           break;
       }
      }
      if(todosACero){
        document.getElementById("button-calculate").disabled = true;
      } else {
        document.getElementById("button-calculate").disabled = false;
      }
}

//CALCULADORA
//CREAR ELEMENTOS CALCULADORA
let subtotal = 0;
let taxes = 0;
let total = 0;

//SUBTOTAL
var results = document.getElementById("results");
var printSubtotal = document.createElement("h5");
printSubtotal.setAttribute("id", "subtotal")
printSubtotal.setAttribute("type", "number");
printSubtotal.setAttribute("value", 0);
results.appendChild(printSubtotal);
//TAXES
var printTaxes= document.createElement("h5");
results.appendChild(printTaxes);
//TOTAL
var printTotal= document.createElement("h5");
results.appendChild(printTotal);


//CALCULADORA
function calculate(){
    for (let index = 0; index < products.length; index++) {
        console.log(products[index].units);
        clearValues();
        operation();
        printCalculate();
      }
}

var clearValues = () =>{
    subtotal= 0;
    taxes = 0;
    total = 0;
}

var operation = (product) => {
    for ( var product of products){
        subtotal += product.units * product.price;
        taxes += ((product.units * product.price) * product.tax)/100;
        total = subtotal + taxes;
    }
}

var printCalculate = () =>{
    printSubtotal.innerText = "SUBTOTAL: " + subtotal.toFixed(2) + divisa;
    printTaxes.innerText = "TAXES: " + taxes.toFixed(2) + divisa;
    printTotal.innerText = "TOTAL: " + total.toFixed(2) + divisa;
}