class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

class Carrito {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("carrito")) || [];
    this.totalElement = document.getElementById("total");
    this.itemsContainer = document.getElementById("cart-items");
  }

  agregarProducto(producto) {
    this.items.push(producto);
    this.guardar();
    alert("Producto agregado al carrito.");
  }

  eliminarProducto(index) {
    this.items.splice(index, 1);
    this.guardar();
    this.actualizarVista();
  }

  calcularTotal() {
    return this.items.reduce((suma, producto) => suma + producto.precio, 0);
  }

  guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }

  actualizarVista() {
    if (!this.itemsContainer || !this.totalElement) return;

    this.itemsContainer.innerHTML = "";

    this.items.forEach((producto, index) => {
      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
        <button onclick="carrito.eliminarProducto(${index})">Eliminar</button>
      `;
      this.itemsContainer.appendChild(item);
    });

    this.totalElement.textContent = `Total: $${this.calcularTotal().toFixed(2)}`;
  }
}

// Instancia global del carrito
const carrito = new Carrito();

// Mostrar el carrito si estamos en carrito.html
document.addEventListener("DOMContentLoaded", () => {
  carrito.actualizarVista();

  // Solo ejecuta esto si hay botones de "Agregar al carrito"
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const nombre = card.querySelector("h4").textContent;
      const precioTexto = card.querySelector(".product-price").textContent;
      const precio = parseFloat(precioTexto.replace(/[^\d.]/g, '')) || 10.00;

      const producto = new Producto(nombre, precio);
      carrito.agregarProducto(producto);
    });
  });
});
