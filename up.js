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

//HTML DINÁMICO
////1.Nº en la lista
// var productCount = () => {
//     let number = document.createElement("h5");
//     for ( var i= 0; i<products.length; i++){
//         number.innerText = i+1;
//     }
//     return number;
// }
var list = () => {
 for (var i= 0; i<products.length; i++){
    //DESCRIPCION Y PRECIO UD //
    var container = document.getElementById("list");
    var list = document.createElement("h5");
    list.setAttribute("class", "list")
    list.innerText = i+1 + ". ";
    container.appendChild(list);
}}
list();

////2. DESCRIPTION & UNITY PRICE (List)
var descriptionPrice = (product) => {
    var description = document.createElement("h5");
    description.innerText = product.description + " - " + product.price  + " € / ud";
    description.setAttribute("class", "")
    return description;
}

////3. QUANTITY
var input;
var quantity = (product) => {
    var input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", "product-unit");
    input.setAttribute("value", 0);
    input.setAttribute("min", 0);
    input.setAttribute("max", product.stock);
    input.addEventListener("change", event => product.units = parseInt(event.target.value));
    input.addEventListener("change", stockControl);
    return input;
}

var stockControl = (product) => {
    for (var product of products){
    if(product.units > product.stock){
        alert("El stock de este producto es limitado, solo quedan " + product.stock +" unidades de " + product.description)
        product.units = product.stock;
        document.getElementById("product-unit").value = product.stock;
        }
    }
}
stockControl();

/////4. CREATE LIST
var showProductList = (productList) => {
    var container = document.getElementById("product-list");
    for ( var product of productList){
        //DESCRIPCION Y PRECIO UD //
        container.appendChild(descriptionPrice(product)).appendChild(quantity(product));

    }
}
showProductList(products);



/////5. RESULTADOS

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
    printSubtotal.innerText = "SUBTOTAL: " + subtotal.toFixed(2) + " €";
    printTaxes.innerText = "TAXES: " + taxes.toFixed(2) + " €";
    printTotal.innerText = "TOTAL: " + total.toFixed(2) + " €";
}

var calculate = () => {
    clearValues();
    operation();
    printCalculate();
}

for (var product of products){
    console.log(product.units);
    if(product.units === 0){
        document.getElementById("button-calculate").disabled = true;
    } 
}