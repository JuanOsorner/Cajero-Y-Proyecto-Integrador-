// app.js
import { Producto, Usuario, Administrador } from './models.js';
import { cargarUsuarios, guardarUsuarios, cargarProductos, guardarProductos } from './storage.js';

let usuarios = [];
let productos = [];
let loggedInAdmin = null; // Para almacenar la instancia del administrador logueado

document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos al iniciar
    usuarios = cargarUsuarios();
    productos = cargarProductos();

    // Si no hay un admin inicial, creamos uno por defecto y lo guardamos
    if (!usuarios.some(user => user instanceof Administrador)) {
        const admin = new Administrador(1, "Admin General", "admin@barranquero.com", "admin123");
        usuarios.push(admin);
        guardarUsuarios(usuarios);
        // Recargar usuarios para asegurarse de que la instancia en 'usuarios' sea la de Administrador
        usuarios = cargarUsuarios();
    }

    // Referencias a elementos del DOM
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminEmailInput = document.getElementById('admin-email');
    const adminPasswordInput = document.getElementById('admin-password');
    const loginMessage = document.getElementById('login-message');
    const adminContent = document.getElementById('admin-content'); // El div que contiene todo el panel admin

    const productListDiv = document.getElementById('product-list');
    const userListDiv = document.getElementById('user-list');

    const addEditProductForm = document.getElementById('add-edit-product-form');
    const productIdInput = document.getElementById('product-id');
    const productNameInput = document.getElementById('product-name');
    const productPriceInput = document.getElementById('product-price');
    const productStockInput = document.getElementById('product-stock');

    const updateStockForm = document.getElementById('update-stock-form');
    const updateProductIdInput = document.getElementById('update-product-id');
    const newStockInput = document.getElementById('new-stock');

    const deleteUserForm = document.getElementById('delete-user-form');
    const deleteUserIdInput = document.getElementById('delete-user-id');

    // Función para renderizar los productos en la UI
    function renderProducts() {
        productListDiv.innerHTML = ''; // Limpiar lista actual
        if (productos.length === 0) {
            productListDiv.innerHTML = '<p>No hay productos registrados.</p>';
            return;
        }
        const ul = document.createElement('ul');
        productos.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `ID: ${p.id}, Nombre: ${p.nombre}, Precio: $${p.precio.toFixed(2)}, Stock: ${p.stock}`;
            ul.appendChild(li);
        });
        productListDiv.appendChild(ul);
    }

    // Función para renderizar los usuarios en la UI
    function renderUsers() {
        userListDiv.innerHTML = ''; // Limpiar lista actual
        if (usuarios.length === 0) {
            userListDiv.innerHTML = '<p>No hay usuarios registrados.</p>';
            return;
        }
        const ul = document.createElement('ul');
        usuarios.forEach(u => {
            const li = document.createElement('li');
            // Diferenciar el administrador
            const userType = u instanceof Administrador ? ' (ADMIN)' : '';
            li.textContent = `ID: ${u.id}, Nombre: ${u.nombre}, Correo: ${u.correo}${userType}`;
            ul.appendChild(li);
        });
        userListDiv.appendChild(ul);
    }

    // Manejador del formulario de login
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = adminEmailInput.value;
        const password = adminPasswordInput.value;

        // Buscar al administrador entre los usuarios
        const adminCandidate = usuarios.find(user => user.correo === email && user instanceof Administrador);

        if (adminCandidate && adminCandidate.iniciarSesion(email, password)) {
            loggedInAdmin = adminCandidate;
            loginMessage.textContent = '¡Inicio de sesión exitoso!';
            loginMessage.style.color = 'green';
            adminLoginForm.style.display = 'none'; // Ocultar formulario de login
            adminContent.style.display = 'block'; // Mostrar contenido del panel
            renderProducts(); // Renderizar productos al entrar
            renderUsers(); // Renderizar usuarios al entrar
        } else {
            loginMessage.textContent = 'Credenciales de administrador incorrectas.';
            loginMessage.style.color = 'red';
        }
    });

    // Manejador del formulario de añadir/modificar producto
    addEditProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!loggedInAdmin) {
            alert('Debes iniciar sesión como administrador.');
            return;
        }

        const id = parseInt(productIdInput.value);
        const nombre = productNameInput.value;
        const precio = parseFloat(productPriceInput.value);
        const stock = parseInt(productStockInput.value);

        if (isNaN(id) || isNaN(precio) || isNaN(stock)) {
            alert("Por favor, introduce valores numéricos válidos para ID, Precio y Stock.");
            return;
        }

        let productExists = productos.find(p => p.id === id);

        if (productExists) {
            // Si el producto existe, actualiza sus propiedades no relacionadas con stock directamente
            productExists.nombre = nombre;
            productExists.precio = precio;
            // Para el stock, usar gestionarInventario
            loggedInAdmin.gestionarInventario(productos, id, stock);
            console.log(`Producto ${nombre} (ID: ${id}) actualizado.`);
        } else {
            // Si no existe, lo añade
            const nuevoProducto = new Producto(id, nombre, precio, stock);
            loggedInAdmin.agregarProducto(productos, nuevoProducto);
        }

        guardarProductos(productos); // Guardar cambios en localStorage
        renderProducts(); // Actualizar la vista de productos
        addEditProductForm.reset(); // Limpiar formulario
    });

    // Manejador del formulario de actualizar stock
    updateStockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!loggedInAdmin) {
            alert('Debes iniciar sesión como administrador.');
            return;
        }

        const productId = parseInt(updateProductIdInput.value);
        const newStock = parseInt(newStockInput.value);

        if (isNaN(productId) || isNaN(newStock)) {
            alert("Por favor, introduce valores numéricos válidos.");
            return;
        }

        if (loggedInAdmin.gestionarInventario(productos, productId, newStock)) {
            guardarProductos(productos); // Guardar cambios en localStorage
            renderProducts(); // Actualizar la vista de productos
            updateStockForm.reset(); // Limpiar formulario
        } else {
            alert('No se pudo actualizar el stock. Revisa el ID del producto.');
        }
    });

    // Manejador del formulario de eliminar usuario
    deleteUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!loggedInAdmin) {
            alert('Debes iniciar sesión como administrador.');
            return;
        }

        const userId = parseInt(deleteUserIdInput.value);

        if (isNaN(userId)) {
            alert("Por favor, introduce un ID de usuario válido.");
            return;
        }

        // Evitar que el administrador se elimine a sí mismo
        if (loggedInAdmin.id === userId) {
            alert("¡Advertencia! No puedes eliminar tu propia cuenta de administrador mientras estás logueado.");
            return;
        }

        if (loggedInAdmin.eliminarUsuario(usuarios, userId)) {
            guardarUsuarios(usuarios); // Guardar cambios en localStorage
            renderUsers(); // Actualizar la vista de usuarios
            deleteUserForm.reset(); // Limpiar formulario
        } else {
            alert('No se pudo eliminar el usuario. Revisa el ID del usuario.');
        }
    });
});