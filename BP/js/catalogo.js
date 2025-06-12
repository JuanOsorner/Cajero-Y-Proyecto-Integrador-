// js/catalogo.js (Script principal para el catálogo de productos, incluyendo CRUD de administrador)
import { Producto, Administrador, Usuario } from './models.js';
// CAMBIO CLAVE: Importamos todo de storage como un objeto 'storage'
import * as storage from './storage.js'; 
import { updateCartIconCount } from './header_logic.js'; 

document.addEventListener('DOMContentLoaded', () => {
    // --- VERIFICACIÓN EXPLÍCITA DEL MÓDULO STORAGE ---
    // Estos logs nos ayudan a depurar si storage.js se carga correctamente.
    console.log("Módulo 'storage' importado:", storage);
    console.log("Función 'storage.guardarUsuarios' al inicio de DOMContentLoaded:", storage.guardarUsuarios);

    // Si 'guardarUsuarios' no es una función después de la importación, hay un problema crítico.
    if (typeof storage.guardarUsuarios !== 'function') {
        console.error("ERROR CRÍTICO: La función 'guardarUsuarios' no está definida en el módulo storage.js. Revisa storage.js y su importación/exportación.");
        alert("¡Error crítico! El sistema de guardado de datos no está disponible. Por favor, contacta al soporte.");
        // Podemos detener la ejecución aquí si esta función es fundamental
        // return; 
    }

    let productos = storage.cargarProductos(); // Usamos storage.cargarProductos
    let usuarios = storage.cargarUsuarios();   // Usamos storage.cargarUsuarios

    // --- Referencias a Elementos del DOM ---
    const productGridContainer = document.getElementById('product-grid-container');
    const loadingMessage = productGridContainer ? productGridContainer.querySelector('p#loading-products-message') : null;

    const adminProductControls = document.getElementById('admin-product-controls');
    const addProductBtn = document.getElementById('add-product-btn');

    const productCrudModalOverlay = document.getElementById('product-crud-modal-overlay');
    const closeCrudModalBtn = document.getElementById('close-crud-modal-btn');
    const productCrudForm = document.getElementById('product-crud-form');
    const crudFormTitle = document.getElementById('crud-form-title');
    const crudProductIdInput = document.getElementById('crud-product-id');
    const crudProductNameInput = document.getElementById('crud-product-name');
    const crudProductPriceInput = document.getElementById('crud-product-price');
    const crudProductStockInput = document.getElementById('crud-product-stock');
    const crudProductDescuentoInput = document.getElementById('crud-product-descuento');
    const crudProductImagenUrlInput = document.getElementById('crud-product-imagenUrl');
    const saveProductBtn = document.getElementById('save-product-btn');
    const crudStatusMessage = document.getElementById('crud-status-message');

    let currentEditingProductId = null;

    const loggedInUserData = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const isAdmin = loggedInUserData && loggedInUserData.role === 'admin';
    let loggedInAdminInstance = null;
    let loggedInUserInstance = null;

    if (loggedInUserData) {
        if (loggedInUserData.role === 'admin') {
            loggedInAdminInstance = usuarios.find(u => u.id === loggedInUserData.id && u instanceof Administrador);
            if (!loggedInAdminInstance) {
                console.error("Admin user data in session is inconsistent. Clearing session.");
                sessionStorage.removeItem('loggedInUser');
                isAdmin = false;
            } else {
                if (adminProductControls) adminProductControls.style.display = 'block';
            }
        } else {
            loggedInUserInstance = usuarios.find(u => u.id === loggedInUserData.id && u instanceof Usuario);
            if (!loggedInUserInstance) {
                console.error("Regular user data in session is inconsistent. Clearing session.");
                sessionStorage.removeItem('loggedInUser');
            }
        }
    }

    // --- Product Rendering Function ---
    function renderProducts() {
        if (loadingMessage) loadingMessage.style.display = 'none';
        productGridContainer.innerHTML = '<h3>Productos más Populares</h3>'; 

        if (productos.length === 0) {
            productGridContainer.innerHTML += '<p>No hay productos disponibles en este momento.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        productos.forEach(p => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.productId = p.id;

            const discount = p.descuento; 
            let displayPriceHtml = `$${p.precio.toFixed(2)}`;
            let discountBadgeHtml = '';

            if (discount > 0 && discount <= 100) {
                const discountedPrice = p.precio * (1 - discount / 100);
                displayPriceHtml = `<span class="original-price">$${p.precio.toFixed(2)}</span> <span class="discounted-price">$${discountedPrice.toFixed(2)}</span>`;
                discountBadgeHtml = `<div class="discount-badge">${discount}%</div>`;
            }
            
            const imageUrlToDisplay = p.imagenUrl && p.imagenUrl !== '' ? p.imagenUrl : './img/default-product.png';

            productCard.innerHTML = `
                ${discountBadgeHtml}
                <img src="${imageUrlToDisplay}" alt="${p.nombre}">
                <div class="product-info">
                    <h4>${p.nombre}</h4>
                    <p class="product-description">ID: ${p.id}</p>
                    <span class="product-price">${displayPriceHtml}</span>
                    <span class="product-stock">Stock: ${p.stock}</span>
                </div>
            `;

            if (isAdmin) {
                const adminControls = document.createElement('div');
                adminControls.classList.add('admin-card-controls');
                adminControls.innerHTML = `
                    <button class="edit-product-btn" data-id="${p.id}"><i class="fas fa-edit"></i> Editar</button>
                    <button class="delete-product-btn" data-id="${p.id}"><i class="fas fa-trash-alt"></i> Eliminar</button>
                `;
                productCard.appendChild(adminControls);
            } else if (loggedInUserInstance) {
                if (p.stock > 0) {
                    const addToCartButton = document.createElement('button');
                    addToCartButton.classList.add('add-to-cart-btn');
                    addToCartButton.dataset.productId = p.id;
                    addToCartButton.innerHTML = `<i class="fas fa-cart-plus"></i> Añadir al Carrito`;
                    productCard.appendChild(addToCartButton);
                } else {
                    const outOfStockSpan = document.createElement('span');
                    outOfStockSpan.classList.add('out-of-stock-msg');
                    outOfStockSpan.textContent = 'Agotado';
                    productCard.appendChild(outOfStockSpan);
                }
            }

            fragment.appendChild(productCard);
        });

        productGridContainer.appendChild(fragment);
        updateCartIconCount();
    }

    // --- CRUD Form Modal Management ---
    function showCrudModal(mode = 'add', product = null) {
        console.log("showCrudModal llamado con modo:", mode); 
        
        if (!productCrudModalOverlay) {
            console.error("ERROR CRÍTICO: Elemento HTML con ID 'product-crud-modal-overlay' no encontrado. Revisa tu catalogo.html. El modal no se puede mostrar.");
            return; 
        }
        if (!productCrudForm) {
            console.error("ERROR CRÍTICO: Elemento HTML con ID 'product-crud-form' no encontrado. Revisa tu catalogo.html.");
            return;
        }
        if (!crudFormTitle || !crudProductIdInput || !crudProductNameInput || !crudProductPriceInput || !crudProductStockInput || !crudProductDescuentoInput || !crudProductImagenUrlInput || !saveProductBtn || !crudStatusMessage) {
            console.error("ERROR CRÍTICO: Uno o más elementos del formulario CRUD (título, inputs, botón guardar, mensaje de estado, descuento o imagenUrl) no encontrados. Revisa tus IDs en catalogo.html.");
            return;
        }
        if (!closeCrudModalBtn) {
             console.warn("ADVERTENCIA: Botón de cerrar modal (ID 'close-crud-modal-btn') no encontrado. El modal funcionará, pero la 'x' para cerrarlo no.");
        }

        productCrudModalOverlay.style.display = 'flex'; 
        productCrudModalOverlay.classList.add('active'); 
        
        console.log("Clase 'active' y display:flex; añadidos al overlay del modal. Debería ser visible."); 

        productCrudForm.reset();
        crudStatusMessage.textContent = '';

        if (mode === 'add') {
            crudFormTitle.textContent = 'Añadir Nuevo';
            crudProductIdInput.value = '';
            crudProductIdInput.readOnly = false;
            crudProductDescuentoInput.value = '0';
            crudProductImagenUrlInput.value = './img/default-product.png';
            currentEditingProductId = null;
        } else if (mode === 'edit' && product) {
            crudFormTitle.textContent = 'Editar';
            crudProductIdInput.value = product.id;
            crudProductIdInput.readOnly = true;
            crudProductNameInput.value = product.nombre;
            crudProductPriceInput.value = product.precio;
            crudProductStockInput.value = product.stock;
            crudProductDescuentoInput.value = product.descuento || '0';
            crudProductImagenUrlInput.value = product.imagenUrl || './img/default-product.png';
            currentEditingProductId = product.id;
        }
    }

    function hideCrudModal() { 
        if (productCrudModalOverlay) {
            productCrudModalOverlay.classList.remove('active');
            productCrudModalOverlay.style.display = 'none';
            currentEditingProductId = null;
        }
    }

    // --- Event Listeners for Admin Controls ---

    // Add Product Button
    if (addProductBtn) {
        addProductBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            showCrudModal('add');
        });
    }

    // Close CRUD Modal Button
    if (closeCrudModalBtn) {
        closeCrudModalBtn.addEventListener('click', hideCrudModal);
        if (productCrudModalOverlay) {
            productCrudModalOverlay.addEventListener('click', (e) => {
                if (e.target === productCrudModalOverlay) {
                    hideCrudModal();
                }
            });
        }
    } else {
        console.warn("ADVERTENCIA: Botón de cerrar modal (ID 'close-crud-modal-btn') no encontrado. Asegúrate de que el modal pueda cerrarse.");
    }

    // Save Product Button on CRUD Form
    if (productCrudForm) {
        productCrudForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!loggedInAdminInstance) {
                crudStatusMessage.textContent = 'Error: Sesión de administrador no válida.';
                crudStatusMessage.style.color = 'red';
                return;
            }

            const id = parseInt(crudProductIdInput.value);
            const nombre = crudProductNameInput.value.trim();
            const precio = parseFloat(crudProductPriceInput.value);
            const stock = parseInt(crudProductStockInput.value);
            const descuento = parseInt(crudProductDescuentoInput.value);
            const imagenUrl = crudProductImagenUrlInput.value.trim();

            if (isNaN(id) || !nombre || isNaN(precio) || isNaN(stock) || isNaN(descuento) || descuento < 0 || descuento > 100) {
                crudStatusMessage.textContent = 'Por favor, completa todos los campos con valores válidos (ID, Nombre, Precio, Stock, Descuento entre 0-100).';
                crudStatusMessage.style.color = 'red';
                return;
            }

            let success = false;
            let message = '';

            if (currentEditingProductId !== null) {
                const productToUpdate = productos.find(p => p.id === currentEditingProductId);
                if (productToUpdate) {
                    productToUpdate.nombre = nombre;
                    productToUpdate.precio = precio;
                    productToUpdate.descuento = descuento;
                    productToUpdate.imagenUrl = imagenUrl;
                    success = loggedInAdminInstance.gestionarInventario(productos, id, stock); 
                    if (success) message = `Producto "${nombre}" (ID: ${id}) actualizado.`;
                } else {
                    message = 'Error: Producto a editar no encontrado.';
                }
            } else {
                if (productos.some(p => p.id === id)) {
                    message = `Ya existe un producto con el ID ${id}. Por favor, usa un ID diferente o edita el existente.`;
                } else {
                    const newProduct = new Producto(id, nombre, precio, stock, descuento, imagenUrl);
                    success = loggedInAdminInstance.agregarProducto(productos, newProduct);
                    if (success) message = `Producto "${nombre}" (ID: ${id}) añadido.`;
                }
            }

            if (success) {
                storage.guardarProductos(productos); // Usamos storage.guardarProductos
                productos = storage.cargarProductos(); // Usamos storage.cargarProductos
                renderProducts();
                
                crudStatusMessage.textContent = message;
                crudStatusMessage.style.color = 'green';
                setTimeout(() => { hideCrudModal(); }, 1000);
            } else {
                crudStatusMessage.textContent = message || 'Hubo un problema al guardar el producto. Verifica los datos e intenta de nuevo.';
                crudStatusMessage.style.color = 'red';
            }
        });
    }

    // Delegación de Eventos para botones de Editar/Eliminar
    if (productGridContainer && isAdmin) {
        productGridContainer.addEventListener('click', (e) => {
            const target = e.target;
            const editBtn = target.closest('.edit-product-btn');
            const deleteBtn = target.closest('.delete-product-btn');
            
            let productId;
            if (editBtn) productId = parseInt(editBtn.dataset.id);
            else if (deleteBtn) productId = parseInt(deleteBtn.dataset.id);

            if (editBtn && productId) {
                const productToEdit = productos.find(p => p.id === productId);
                if (productToEdit) {
                    showCrudModal('edit', productToEdit);
                } else {
                    alert('Producto no encontrado para editar.');
                }
            } else if (deleteBtn && productId) {
                if (confirm(`¿Estás seguro de que quieres eliminar el producto con ID: ${productId}?`)) {
                    if (loggedInAdminInstance.eliminarProducto(productos, productId)) {
                        storage.guardarProductos(productos); // Usamos storage.guardarProductos
                        productos = storage.cargarProductos(); // Usamos storage.cargarProductos
                        renderProducts();
                    } else {
                        alert('Hubo un problema al eliminar el producto.');
                    }
                }
            }
        });
    }

    // --- Event Listener para el botón "Añadir al Carrito" (solo para usuarios normales) ---
    if (productGridContainer && !isAdmin) {
        productGridContainer.addEventListener('click', (e) => {
            const target = e.target;
            const addToCartBtn = target.closest('.add-to-cart-btn');

            if (addToCartBtn) {
                if (!loggedInUserInstance) {
                    alert('Debes iniciar sesión para añadir productos al carrito.');
                    return;
                }

                const productId = parseInt(addToCartBtn.dataset.productId);
                const productToAdd = productos.find(p => p.id === productId);

                if (productToAdd) {
                    if (productToAdd.stock > 0) {
                        loggedInUserInstance.carrito.agregarProducto(productToAdd);
                        productToAdd.actualizarStock(-1);

                        storage.guardarUsuarios(usuarios);   // Usamos storage.guardarUsuarios
                        storage.guardarProductos(productos); // Usamos storage.guardarProductos

                        alert(`"${productToAdd.nombre}" añadido al carrito.`);
                        renderProducts();
                    } else {
                        alert(`"${productToAdd.nombre}" está agotado.`);
                    }
                } else {
                    alert('Error: Producto no encontrado en el catálogo.');
                }
            }
        });
    }

    // Renderizado inicial de los productos al cargar la página
    renderProducts();
});