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
//Carga de productos iniciales con async - await y subida al storage.
let productos = []
const cargarProductos = async () => {
    const res = await fetch("productos.json")
    const data = await res.json()
    for (let producto of data) {
        let productoData = new Producto(producto.id, producto.nombre, producto.categoria, producto.precio, producto.imagen)
        productos.push(productoData)
    }
    localStorage.setItem("productos", JSON.stringify(productos))
}




// Chequeo si existe la key en productos
if (localStorage.getItem("productos")) {
    productos = JSON.parse(localStorage.getItem("productos"))
} else {
    cargarProductos()
}
