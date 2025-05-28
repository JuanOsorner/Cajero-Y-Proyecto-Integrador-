class Carrito {
  constructor() {
    this.items = [];
  }

  agregarProducto(producto) {
    this.items.push(producto);
    actualizarCarritoUI(this.items);
  }

  eliminarProducto(index){
    this.items.splice(index, 1);
    actualizarCarritoUI(this.items);
  }
}

class Usuario {
  constructor(id, nombre, correo, contraseña) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.contraseña = contraseña;
    this.iniciarSesion = false;
    this.carrito = new Carrito();
  }

  login(correo, contraseña) {
    if (this.correo === correo && this.contraseña === contraseña) {
      this.iniciarSesion = true;
      mostrarProductosUI();
      return true;
    }
    alert("Correo o contraseña incorrectos.");
    return false;
  }
}

// Datos simulados
const productos = [
  { nombre: "Camiseta", precio: 20000 },
  { nombre: "Taza", precio: 15000 },
  { nombre: "Gorra", precio: 18000 }
];

let usuario = null;

function registrarUsuario() {
  const nombre = document.getElementById("regNombre").value;
  const correo = document.getElementById("regCorreo").value;
  const clave = document.getElementById("regClave").value;

  usuario = new Usuario(1, nombre, correo, clave);
  alert("Registro exitoso. Ahora puedes iniciar sesión.");
}

function iniciarSesion() {
  const correo = document.getElementById("loginCorreo").value;
  const clave = document.getElementById("loginClave").value;

  if (usuario && usuario.login(correo, clave)) {
    document.getElementById("registro").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("productos").style.display = "block";
  }
}

function mostrarProductosUI() {
  const lista = document.getElementById("listaProductos");
  lista.innerHTML = "";

  productos.forEach((prod, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${prod.nombre}</strong> - $${prod.precio}
      <button onclick="agregarAlCarrito(${i})">Agregar al carrito</button>
    `;
    lista.appendChild(div);
  });
}

function agregarAlCarrito(index) {
  const producto = productos[index];
  usuario.carrito.agregarProducto(producto);
}

function actualizarCarritoUI(items) {
  const ul = document.getElementById("carritoLista");
  ul.innerHTML = "";
  items.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
  
  const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.onclick = () => {
      usuario.carrito.eliminarProducto(i);
    };  

  li.appendChild(btnEliminar);
    ul.appendChild(li);
  });
}
