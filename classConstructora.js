//Class constructora de productos nuevos
class Producto {
    constructor(id, nombreProducto, categoriaProducto, precioProducto, imagenProducto) {
        this.id = id,
        this.nombre = nombreProducto,
        this.categoria = categoriaProducto,
        this.precio = precioProducto,
        this.imagen = imagenProducto
    }
}
//Array de productos, carga de productos iniciales y subida al array.
let productos = []
const prod1 = new Producto(1, "Coca-Cola", "Bebidas", 620, "coca.jpg")
const prod2 = new Producto(2, "Galletitas", "Comestibles", 450, "galletitas.jpg")
const prod3 = new Producto(3, "Jugo", "Bebidas", 300, "jugo.jpg")
const prod4 = new Producto(4, "Papel Higienico", "Limpieza", 1200, "papel.jpg")
const prod5 = new Producto(5, "Fernet", "Bebidas", 2000, "fernet.jpg")
const prod6 = new Producto(6, "Carbón", "Asado", 730, "carbon.jpg")
const prod7 = new Producto(7, "Cerveza", "Bebidas", 700, "cerveza.jpg")
const prod8 = new Producto(8, "Mayonesa", "Comestibles", 900, "mayonesa.jpg")
const prod9 = new Producto(9, "Azucar", "Comestibles", 500, "azucar.jpg")
const prod10 = new Producto(10, "Desodorante", "Higiene", 650, "desodorante.jpg")

// Chequeo si existe la key en productos
if (localStorage.getItem("productos")) {
    productos = JSON.parse(localStorage.getItem("productos"))
} else {
    console.log(`ENTRA POR PRIMERA VEZ. SETEAMOS ARRAY`)
    productos.push(prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10)
    localStorage.setItem("productos", JSON.stringify(productos))
}
console.log(productos)