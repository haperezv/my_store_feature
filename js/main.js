/*El proyecto es simular la carga de los productos de una tienda.

Las partes estaticas de la pagina, titulo, descripcion y about us, cambiarlas de acuerdo a lo que escojan que quieran
 que sea la tienda, dentro del HTML.

La seccion de productos debe ser cargada con Javascript, para esto revisar que se deberia crear para cargar 10 productos 
a la tienda, cada uno debe tener lo que se visualiza (card, imagen, titulo, descripcion, link a la pagina del producto, 
otro link que lleve a google.com)

Plus, crear una funcion de JS que permita desde consola agregar un producto al HTML*/

//JSON = objetos javascript en formato "string" para poderlos mandar via internet, 
// las API Application Program Interface

// FUNCIONES

//save in the localStorage
function saveLocalStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

//get data from localStorage
function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

// function that receives a product object
// and draw in the document the card presentation for it
function showProduct(product){
    const myNode = document.createElement('div');
    myNode.id = `product-${product.id}`;
    myNode.classList.add('card', 'col-sm-4');
   
    const myNodeCardBody = document.createElement('div');
    myNodeCardBody.classList.add('card-body');

    const myNodeTitle = document.createElement('h5');
    myNodeTitle.classList.add('card-title');
    myNodeTitle.textContent = product.title;
   
    const myNodeImagen = document.createElement('img');
    myNodeImagen.classList.add('img-fluid');
    myNodeImagen.setAttribute('src', product.img_src);

    
    const myNodedescription = document.createElement('p');
    myNodedescription.classList.add('card-text');
    myNodedescription.textContent = product.description;
   
    const prodLink = document.createElement("a");
    prodLink.href = product.prod_link;
    prodLink.textContent = "Go to the product"

    const googleLink = document.createElement("a");
    googleLink.href = product.google_link;
    googleLink.textContent = "google"

    const  myNodeCardFooter = document.createElement('div');
    myNodeCardFooter.classList.add('card-footer');

    const buttonProduct = document.createElement('a');
    buttonProduct.classList.add('btn', 'btn-warning', 'btn-style');
    buttonProduct.textContent = 'Get';
    buttonProduct.id = `read-${product.id}`;

    

    // anidaciones

    myNodeCardBody.appendChild(myNodeImagen);
    myNodeCardBody.appendChild(myNodeTitle);
    myNodeCardBody.appendChild(myNodedescription);
    myNodeCardBody.appendChild(prodLink);
    myNodeCardBody.appendChild(googleLink);
    myNode.appendChild(myNodeCardBody);
    myNodeCardBody.appendChild(myNodeCardFooter);
    myNodeCardFooter.appendChild(buttonProduct);


    const DOMitems = document.querySelector("#items");
    DOMitems.appendChild(myNode);
}

// myProducts is an array of product objects, iterate throught it and call showProduct function to draw in DOM 
function showProducts(myProducts) {
    const DOMitems = document.querySelector("#items");
    DOMitems.innerHTML = "";
    myProducts.forEach((product) => {
        showProduct(product);
    });
}

const btnAddProduct = document.querySelector("#btn-add-product");
const btnEditProduct = document.querySelector("#btn-edit-product");
const btnDeleteProduct = document.querySelector("#btn-delete-product");

btnAddProduct.addEventListener("click", function(){
    const title = document.querySelector("#input-title");
    const description = document.querySelector("#input-description");
    const imageUrl = document.querySelector("#input-image");
    const productLink = document.querySelector("#input-product-link");
    const googleLink = document.querySelector("#input-google-link");

    let products = getLocalStorage("products");

    let product = {
        id: products.length + 1,
        title: title.value,
        description: description.value,
        img_src: imageUrl.value,
        prod_link: productLink.value,
        google_link: googleLink.value
    }
    showProduct(product);
    products.push(product);
    saveLocalStorage("products", products);
    clearForm();
})

btnEditProduct.addEventListener("click", function(){
    const id = document.querySelector("#input-id");
    const title = document.querySelector("#input-title");
    const description = document.querySelector("#input-description");
    const imageUrl = document.querySelector("#input-image");
    const productLink = document.querySelector("#input-product-link");
    const googleLink = document.querySelector("#input-google-link");

    let product = {
        id: id.value,
        title: title.value,
        description: description.value,
        img_src: imageUrl.value,
        prod_link: productLink.value,
        google_link: googleLink.value
    }
    editProduct(id.value, product);
})

btnDeleteProduct.addEventListener("click", function(){
    const id = document.querySelector("#input-id");
    deleteProduct(id.value);
})



function editProduct(id, object) {
    let products = JSON.parse(localStorage.getItem("products"));
    products.forEach((product) => {
      if (product.id == id) {
        product.title = object.title;
        product.description = object.description;
        product.img_src = object.img_src;
        product.google_link = object.google_link;
        product.prod_link = object.prod_link;
      }
    });

   //add in the variable the object with id(index) and add the new properties and show this in console
  
    saveLocalStorage("products", products);
    showProducts(products);

   clearForm();
}

function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    products = products.filter((product) => product.id != id);
    saveLocalStorage("products", products);
    showProducts(products);
    clearForm();
}

function readProducts(id,title,description,imageUrl,productLink,googleLink){
    const id_form = document.querySelector("#input-id");
    const title_form = document.querySelector("#input-title");
    const description_form = document.querySelector("#input-description");
    const image = document.querySelector("#input-image");
    const product_form = document.querySelector("#input-product-link");
    const google= document.querySelector("#input-google-link");

    id_form.value = id;
    title_form.value = title;
    description_form.value = description;
    image.value = imageUrl;
    product_form.value = productLink;
    google.value = googleLink;
       

}
// PROGRAMA PRINCIPAL

// ask for info in local storage to avoid rewrite it
if (getLocalStorage("products") == null){
    // With fetch you can get data from local or external source
    // this return a promise and use .then methods to manipulate the data
    fetch ('./json/products.json')
        .then(response=>response.json())// the response is converted to json format
        .then(data=> saveLocalStorage("products", data)) // with the data in json you can print or send to other function
        .then(()=>{
            const products = getLocalStorage("products");
            showProducts(products);
        })
} else {
 const products = getLocalStorage("products");
 showProducts(products);

 products.forEach((product) => {
    const buttonProduct = document.querySelector(`#read-${product.id}`);
    buttonProduct.addEventListener("click", function(){
        readProducts(product.id,product.title,product.description,product.img_src,product.prod_link,product.google_link);
        
    });
})
}

function clearForm() {
    document.querySelector("#miForm").reset();
}



// CRUD - Create - Read - Update - Delete
