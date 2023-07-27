
let productoDiv = document.getElementById("producto")
let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let selectOrden = document.getElementById("selectOrden")
let productoNuevo = document.getElementById("guardarProductoBtn")
let precioTotal = document.getElementById("precioTotal")
let loader = document.getElementById("loader")
let loaderTexto = document.getElementById("loaderTexto")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")


// Chequeo para ver si existe algo en el carrito
let productosEnCarrito
if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}

// Función para mostrar productos
function listaProductos(array) {
    //Reset DOM
    productoDiv.innerHTML = ``
    //Recorrer array para imprimir en el DOM
    for (let producto of array) {
        let nuevoProductoDiv = document.createElement("div")
        nuevoProductoDiv.className = "col-12 col-md-6 col-lg-4 my-2 d-flex justify-content-center"
        nuevoProductoDiv.innerHTML = `<div id="${producto.id}" class="card" style="width: 18rem;">
                                  <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${producto.imagen}" alt="${producto.nombre}">
                                  <div class="card-body">
                                     <h4 class="card-title">${producto.nombre}</h4>
                                     <p>Categoria: ${producto.categoria}</p>
                                     <p>Precio: $${producto.precio}</p>
                                  <button id="agregarBtn${producto.id}" class="btn btn-outline-primary">Agregar al carrito</button>
                                  </div>
                               </div>`
        productoDiv.appendChild(nuevoProductoDiv)

        let agregarBtn = document.getElementById(`agregarBtn${producto.id}`)

        agregarBtn.addEventListener("click", () => {
            agregarAlCarrito(producto)
        })
    }
}
// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    let productoAgregado = productosEnCarrito.find((elem) => elem.id == producto.id)
    if (productoAgregado == undefined) {
        productosEnCarrito.push(producto)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        Swal.fire({
            title: `Ha agregado un producto al carrito`,
            confirmButtonColor: "blue",
            confirmButtonText: "Gracias Por La Compra",
            imageUrl: `assets/${producto.imagen}`,
            imageHeight: 200

        })
    } else {
        Swal.fire({
            title: `El producto ya existe en el carrito`,
            icon: "info",
            timer: 2000,
            showConfirmButton: false

        })
    }
}
// Función para agregar producto nuevo
function agregarProducto(array) {
    let nombreProducto = document.getElementById("productoInput")
    let categoriaProducto = document.getElementById("categoriaInput")
    let precioProducto = document.getElementById("precioInput")
    const productoNuevo = new Producto(array.length + 1, nombreProducto.value, categoriaProducto.value, parseInt(precioProducto.value), "productonuevo.jpg")
    array.push(productoNuevo)
    localStorage.setItem("productos", JSON.stringify(array))
    listaProductos(array)

    //resetear el form
    nombreProducto.value = ""
    categoriaProducto.value = ""
    precioProducto.value = ""

    Toastify(
        {
            text: `${productoNuevo.nombre} se ha agregado`,
            duration: 3000,
            gravity: "bottom",//top o buttom,
            position: "center",//left, right o center
            style: {
                color: "white",
                background: "green"
            }
        }
    ).showToast()
}
// Función para cargar los productos al carrito
function cargarProductosCarrito(array) {
    modalBodyCarrito.innerHTML = ``
    array.forEach((productoCarrito) => {
        modalBodyCarrito.innerHTML += `
    
         <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                  <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.imagen}">
                  <div class="card-body">
                         <h4 class="card-title">${productoCarrito.nombre}</h4>
                         <p class="card-text">Categoria: ${productoCarrito.categoria}</p>
                          <p class="card-text">Precio: $${productoCarrito.precio}</p> 
                          <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                  </div>    
             </div>
       
    `
    })
    array.forEach((productoCarrito) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            let productoEliminar = array.find((producto) => producto.id == productoCarrito.id)
            let posicion = array.indexOf(productoEliminar)
            array.splice(posicion, 1)
            localStorage.setItem("carrito", JSON.stringify(array))
            calcularTotal(array)
        })
    })
    calcularTotal(array)

}
// Función para calcular el total a pagar
function calcularTotal(array) {
    let total = array.reduce((acc, productoCarrito) => acc + productoCarrito.precio, 0)
    total == 0 ? precioTotal.innerHTML = `No hay productos en el carrito` : precioTotal.innerHTML = `El total es $<strong>${total}</strong>`
    return total
}
// Función para ordenar los productos
function ordenar(array, opcion) {
    switch (opcion) {
        case 1:
            const menorMayor = [].concat(array)
            console.log(menorMayor)
            menorMayor.sort((a, b) => a.precio - b.precio)
            listaProductos(menorMayor)
            break
        case 2:
            const mayorMenor = [].concat(array)
            mayorMenor.sort((elem1, elem2) => elem2.precio - elem1.precio)
            listaProductos(mayorMenor)
            break

        case 3:
            const alfabeticoNombre = [].concat(array)
            alfabeticoNombre.sort((a, b) => {
                if (a.nombre > b.nombre) {
                    return 1
                }
                if (a.nombre < b.nombre) {
                    return -1
                }
                return 0
            })
            listaProductos(alfabeticoNombre)
            break
        case 4:
            const alfabeticoCategoria = [].concat(array)
            alfabeticoCategoria.sort((a, b) => {
                if (a.categoria > b.categoria) {
                    return 1
                }
                if (a.categoria < b.categoria) {
                    return -1
                }
                return 0
            })
            listaProductos(alfabeticoCategoria)
            break
    }
}
//Funcion para buscar productos
function buscar(buscado, array) {
    let busqueda = array.filter(
        (dato) => dato.nombre.toLowerCase().includes(buscado.toLowerCase()) || dato.categoria.toLowerCase().includes(buscado.toLowerCase())
    )
    busqueda.length == 0 ?
        (coincidencia.innerHTML = `<h3>No hay coincidencias con la búsqueda ${buscado}</h3>`,
            listaProductos(busqueda)) :
        (coincidencia.innerHTML = "", listaProductos(busqueda))
}
//Funcion para finalizar compra
function finalizarCompra(array) {
    Swal.fire({
        title: '¿Seguro que desea realizar la compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, seguir comprando',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result) => {
        if (result.isConfirmed) {
            let totalFinal = calcularTotal(array)
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Muchas gracias por su compra!! El total a pagar es $${totalFinal}.`,
            })
            productosEnCarrito = []
            localStorage.removeItem("carrito")
        } else {
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no realizada! Sus productos siguen cargados en el carrito!`,
                confirmButtonColor: 'green',
                timer: 3500
            })
        }
    })
}
// Eventos
botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})
selectOrden.addEventListener("change", () => {
    switch (selectOrden.value) {
        case "1":
            ordenar(productos, 2)
            break
        case "2":
            ordenar(productos, 1)
            break
        case "3":
            ordenar(productos, 3)
            break
        case "4":
            ordenar(productos, 4)
        default:
            mostrarCatalogo(productos)
            break
    }
})
productoNuevo.addEventListener("click", function (event) {
    event.preventDefault()
    agregarProducto(productos)
})
buscador.addEventListener("input", () => {
    buscar(buscador.value, productos)
})
setTimeout(() => {
    loaderTexto.innerText = `Nuestros Productos`
    loader.remove()
    listaProductos(productos)
}, 2000)
botonFinalizarCompra.addEventListener("click", () => {
    finalizarCompra(productosEnCarrito)
})