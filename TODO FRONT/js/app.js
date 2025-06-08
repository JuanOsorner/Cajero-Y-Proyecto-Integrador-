// app.js (Ahora actúa como el módulo de lógica del panel de administrador)
// Este archivo es cargado y su función initAdminPanel es llamada desde login_registro.js
import { Producto, Usuario, Administrador } from './models.js';
import { cargarUsuarios, guardarUsuarios, cargarProductos, guardarProductos } from './storage.js';

// Variables que contendrán los datos de usuarios y productos
// Se inicializan aquí, pero se recargan dentro de initAdminPanel para asegurar datos frescos
let usuarios = [];
let productos = [];
let loggedInAdmin = null; // Almacena la instancia del administrador logueado

// Referencias a elementos del DOM del panel de administrador.
// Estas variables se asignarán *después* de que el DOM esté disponible y el panel se muestre,
// por eso no están en un DOMContentLoaded aquí.
let productListDiv;
let userListDiv;
let addEditProductForm;
let productIdInput;
let productNameInput;
let productPriceInput;
let productStockInput;
let updateStockForm;
let updateProductIdInput;
let newStockInput;
let deleteUserForm;
let deleteUserIdInput;

/**
 * Función para renderizar y mostrar la lista de productos en la interfaz de usuario del panel.
 */
function renderProducts() {
    productListDiv.innerHTML = ''; // Limpiar lista actual antes de renderizar
    if (productos.length === 0) {
        productListDiv.innerHTML = '<p>No hay productos registrados.</p>';
        return;
    }
    const ul = document.createElement('ul');
    productos.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `ID: ${p.id}, Nombre: ${p.nombre}, Precio: $${p.precio.toFixed(2)}, Stock: ${p.stock} `;

        // Añadir botón de eliminar producto a cada elemento de la lista
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-product-button'); // Clase para estilos y selección
        deleteButton.dataset.productId = p.id; // Guarda el ID del producto para usarlo al eliminar
        li.appendChild(deleteButton);
        ul.appendChild(li);
    });
    productListDiv.appendChild(ul);
}

/**
 * Función para renderizar y mostrar la lista de usuarios en la interfaz de usuario del panel.
 */
function renderUsers() {
    userListDiv.innerHTML = ''; // Limpiar lista actual antes de renderizar
    if (usuarios.length === 0) {
        userListDiv.innerHTML = '<p>No hay usuarios registrados.</p>';
        return;
    }
    const ul = document.createElement('ul');
    usuarios.forEach(u => {
        const li = document.createElement('li');
        // Diferenciar visualmente al administrador en la lista
        const userType = u instanceof Administrador ? ' (ADMIN)' : '';
        li.textContent = `ID: ${u.id}, Nombre: ${u.nombre}, Correo: ${u.correo}${userType}`;
        ul.appendChild(li);
    });
    userListDiv.appendChild(ul);
}

/**
 * Función de inicialización del panel de administrador.
 * Esta función se exporta y es llamada por login_registro.js cuando un administrador inicia sesión.
 * @param {Administrador} adminInstance - La instancia del administrador que ha iniciado sesión.
 */
export function initAdminPanel(adminInstance) {
    loggedInAdmin = adminInstance; // Asigna la instancia del administrador logueado

    // Recargar usuarios y productos para asegurar que los datos estén frescos
    usuarios = cargarUsuarios();
    productos = cargarProductos();

    // Obtener referencias a los elementos DOM del panel de administrador.
    // Es crucial que estos elementos existan en el HTML de login_registro.html.
    productListDiv = document.getElementById('product-list');
    userListDiv = document.getElementById('user-list');
    addEditProductForm = document.getElementById('add-edit-product-form');
    productIdInput = document.getElementById('product-id');
    productNameInput = document.getElementById('product-name');
    productPriceInput = document.getElementById('product-price');
    productStockInput = document.getElementById('product-stock');
    updateStockForm = document.getElementById('update-stock-form');
    updateProductIdInput = document.getElementById('update-product-id');
    newStockInput = document.getElementById('new-stock');
    deleteUserForm = document.getElementById('delete-user-form');
    deleteUserIdInput = document.getElementById('delete-user-id');

    // Renderizar las vistas iniciales de productos y usuarios al cargar el panel
    renderProducts();
    renderUsers();

    // --- Configuración de Event Listeners para la gestión del panel de administrador ---

    // Listener para el botón de eliminar producto (usando delegación de eventos en productListDiv)
    if (productListDiv) { // Verificar si el elemento existe antes de añadir listener
        productListDiv.addEventListener('click', (e) => {
            // Comprobar si el clic fue en un botón con la clase 'delete-product-button'
            if (e.target.classList.contains('delete-product-button')) {
                if (!loggedInAdmin) {
                    alert('Error: Sesión de administrador no válida para eliminar productos.');
                    return;
                }
                const productIdToDelete = parseInt(e.target.dataset.productId); // Obtener el ID del producto del atributo data-
                if (confirm(`¿Estás seguro de que quieres eliminar el producto con ID: ${productIdToDelete}?`)) {
                    if (loggedInAdmin.eliminarProducto(productos, productIdToDelete)) {
                        guardarProductos(productos); // Guardar cambios en localStorage
                        renderProducts(); // Actualizar la vista de productos
                    } else {
                        alert('No se pudo eliminar el producto. Revisa la consola para más detalles.');
                    }
                }
            }
        });
    }

    // Listener para el formulario de añadir/modificar producto
    if (addEditProductForm) {
        addEditProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!loggedInAdmin) {
                alert('Error: Sesión de administrador no válida para guardar productos.');
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
                // Si el producto ya existe, lo modifica (nombre y precio) y actualiza el stock
                productExists.nombre = nombre;
                productExists.precio = precio;
                loggedInAdmin.gestionarInventario(productos, id, stock); // Usa gestionarInventario para el stock
                console.log(`Producto ${nombre} (ID: ${id}) actualizado.`);
            } else {
                // Si el producto no existe, lo añade como uno nuevo
                const nuevoProducto = new Producto(id, nombre, precio, stock);
                loggedInAdmin.agregarProducto(productos, nuevoProducto);
            }

            guardarProductos(productos); // Guardar todos los cambios en localStorage
            renderProducts(); // Actualizar la vista de productos
            addEditProductForm.reset(); // Limpiar el formulario
        });
    }

    // Listener para el formulario de actualizar stock de un producto existente
    if (updateStockForm) {
        updateStockForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!loggedInAdmin) {
                alert('Error: Sesión de administrador no válida para actualizar stock.');
                return;
            }

            const productId = parseInt(updateProductIdInput.value);
            const newStock = parseInt(newStockInput.value);

            if (isNaN(productId) || isNaN(newStock)) {
                alert("Por favor, introduce valores numéricos válidos para ID de Producto y Nuevo Stock.");
                return;
            }

            // Usa el método gestionarInventario del administrador
            if (loggedInAdmin.gestionarInventario(productos, productId, newStock)) {
                guardarProductos(productos); // Guardar cambios en localStorage
                renderProducts(); // Actualizar la vista de productos
                updateStockForm.reset(); // Limpiar el formulario
            } else {
                alert('No se pudo actualizar el stock. Revisa el ID del producto.');
            }
        });
    }

    // Listener para el formulario de eliminar usuario
    if (deleteUserForm) {
        deleteUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!loggedInAdmin) {
                alert('Error: Sesión de administrador no válida para eliminar usuarios.');
                return;
            }

            const userId = parseInt(deleteUserIdInput.value);

            if (isNaN(userId)) {
                alert("Por favor, introduce un ID de usuario válido a eliminar.");
                return;
            }

            // Evitar que el administrador se elimine a sí mismo mientras está logueado
            if (loggedInAdmin.id === userId) {
                alert("¡Advertencia! No puedes eliminar tu propia cuenta de administrador mientras estás logueado.");
                return;
            }

            // Usa el método eliminarUsuario del administrador
            if (loggedInAdmin.eliminarUsuario(usuarios, userId)) {
                guardarUsuarios(usuarios); // Guardar cambios en localStorage
                renderUsers(); // Actualizar la vista de usuarios
                deleteUserForm.reset(); // Limpiar el formulario
            } else {
                alert('No se pudo eliminar el usuario. Revisa el ID del usuario.');
            }
        });
    }
}