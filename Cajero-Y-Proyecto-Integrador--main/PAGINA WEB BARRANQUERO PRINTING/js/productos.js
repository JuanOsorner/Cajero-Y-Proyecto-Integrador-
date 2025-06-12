class Producto {
  // Constructor

  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  // Método para actualizar el stock

  actualizarStock(cantidad) {
    this.stock += cantidad;
  }

  // Método para mostrar los datos del producto
  
  toString() {
    return `Producto{id: ${this.id}, nombre: ${this.nombre}, precio: ${this.precio}, stock: ${this.stock}}`;
  }
}