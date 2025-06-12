// js/carrito.js
import { cargarUsuarios, guardarUsuarios, cargarProductos, guardarProductos } from './storage.js';
import { Usuario, Administrador } from './models.js';
import { logoutUser, updateCartIconCount } from './header_logic.js';

document.addEventListener('DOMContentLoaded', () => {
    let usuarios = cargarUsuarios();
    let productosGlobal = cargarProductos();

    // --- Referencias a elementos del DOM ---
    const authCheckMessage = document.getElementById('auth-check-message');
    if (!authCheckMessage) console.error("ERROR: #auth-check-message no encontrado en carrito.html");
    const cartContentContainer = document.getElementById('cart-content-container');
    if (!cartContentContainer) console.error("ERROR: #cart-content-container no encontrado en carrito.html");
    const cartItemsList = document.getElementById('cart-items-list');
    if (!cartItemsList) console.error("ERROR: #cart-items-list no encontrado en carrito.html");
    const cartSummary = document.getElementById('cart-summary');
    if (!cartSummary) console.error("ERROR: #cart-summary no encontrado en carrito.html");
    const cartSubtotalSpan = document.getElementById('cart-subtotal');
    if (!cartSubtotalSpan) console.error("ERROR: #cart-subtotal no encontrado en carrito.html");
    const cartDiscountSpan = document.getElementById('cart-discount');
    if (!cartDiscountSpan) console.error("ERROR: #cart-discount no encontrado en carrito.html");
    const cartTotalSpan = document.getElementById('cart-total');
    if (!cartTotalSpan) console.error("ERROR: #cart-total no encontrado en carrito.html");
    const checkoutBtn = document.getElementById('checkout-btn');
    if (!checkoutBtn) console.error("ERROR: #checkout-btn no encontrado en carrito.html");
    const checkoutMessage = document.getElementById('checkout-message');
    if (!checkoutMessage) console.error("ERROR: #checkout-message no encontrado en carrito.html");
    const emptyCartMessage = document.getElementById('empty-cart-message');
    if (!emptyCartMessage) console.error("ERROR: #empty-cart-message no encontrado en carrito.html");
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    if (!continueShoppingBtn) console.error("ERROR: #continue-shopping-btn no encontrado en carrito.html");


    let currentUserInstance = null;

    // --- Autenticación y Carga del Carrito ---
    function initializeCartPage() {
        console.log("initializeCartPage llamado.");
        const loggedInUserData = JSON.parse(sessionStorage.getItem('loggedInUser'));

        if (!loggedInUserData || !loggedInUserData.id || loggedInUserData.role === 'admin') {
            console.log("Usuario no logueado o es admin. Denegando acceso a carrito.");
            if (authCheckMessage) authCheckMessage.style.display = 'block';
            if (cartContentContainer) cartContentContainer.style.display = 'none';
            alert('Debes iniciar sesión como usuario para ver tu carrito.');
            window.location.href = './login_registro.html';
            return;
        }

        currentUserInstance = usuarios.find(u => u.id === loggedInUserData.id && u instanceof Usuario);
        console.log("currentUserInstance encontrado:", currentUserInstance);

        if (!currentUserInstance) {
            console.error("No se pudo encontrar la instancia de usuario logueado en el array de usuarios. Limpiando sesión.");
            sessionStorage.removeItem('loggedInUser');
            window.location.href = './login_registro.html';
            return;
        }

        console.log("Usuario normal logueado. Mostrando carrito.");
        if (authCheckMessage) authCheckMessage.style.display = 'none';
        if (cartContentContainer) cartContentContainer.style.display = 'flex';

        renderCart(); // Renderizar los artículos del carrito
    }

    // --- Renderizado del Carrito ---
    function renderCart() {
        console.log("renderCart llamado. Carrito actual:", currentUserInstance?.carrito?.productos);
        
        // --- VERIFICACIÓN DE EXISTENCIA DE ELEMENTOS DE RESUMEN (AGRESIVA) ---
        console.log("RENDER CART DEBUG - cartSubtotalSpan:", cartSubtotalSpan);
        console.log("RENDER CART DEBUG - cartDiscountSpan:", cartDiscountSpan);
        console.log("RENDER CART DEBUG - cartTotalSpan:", cartTotalSpan);
        console.log("RENDER CART DEBUG - cartItemsList:", cartItemsList);
        console.log("RENDER CART DEBUG - cartSummary:", cartSummary);
        console.log("RENDER CART DEBUG - emptyCartMessage:", emptyCartMessage);
        console.log("RENDER CART DEBUG - checkoutBtn:", checkoutBtn);
        console.log("RENDER CART DEBUG - checkoutMessage:", checkoutMessage);
        console.log("RENDER CART DEBUG - continueShoppingBtn:", continueShoppingBtn);


        if (!cartSubtotalSpan || !cartDiscountSpan || !cartTotalSpan || !cartItemsList || !cartSummary || !emptyCartMessage || !checkoutMessage || !checkoutBtn || !continueShoppingBtn) {
            console.error("ERROR CRÍTICO FINAL: Uno o más elementos HTML esenciales del carrito son NULL o no encontrados. Revisa carrito.html y sus IDs.");
            alert("¡Error al cargar el carrito! Algunos elementos clave no se encontraron. Revisa la consola y tu carrito.html.");
            return;
        }

        cartItemsList.innerHTML = '';
        checkoutMessage.textContent = ''; // Limpiar mensajes de checkout

        if (!currentUserInstance || !currentUserInstance.carrito || currentUserInstance.carrito.productos.length === 0) {
            console.log("Carrito vacío.");
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            if (cartSummary) cartSummary.style.display = 'none';
            cartItemsList.innerHTML = '<p class="empty-cart-text">Tu carrito está vacío. ¡Explora nuestros productos!</p>';
            
            cartSubtotalSpan.textContent = '$0.00';
            cartDiscountSpan.textContent = '$0.00';
            cartTotalSpan.textContent = '$0.00';

            updateCartIconCount();
            return;
        }

        console.log("Carrito tiene items. Renderizando items.");
        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'block';

        let currentSubtotal = 0; // Subtotal de todos los items (precio original * cantidad)
        let totalDiscountAmount = 0; // Cantidad total de descuento aplicada

        currentUserInstance.carrito.productos.forEach(item => {
            const product = item.producto;
            const quantity = item.cantidad;

            const originalProduct = productosGlobal.find(p => p.id === product.id);
            const availableStock = originalProduct ? originalProduct.stock : 0;
            const isOutOfStock = originalProduct && originalProduct.stock <= 0;
            const quantityExceedsStock = quantity > availableStock && !isOutOfStock;


            let itemUnitPriceOriginal = product.precio;
            let discountedPrice = product.precio; // <-- RENOMBRADO: Antes era itemUnitPriceAfterDiscount
            let itemDiscountPerUnit = 0;

            if (product.descuento > 0 && product.descuento <= 100) {
                itemDiscountPerUnit = (product.precio * (product.descuento / 100));
                discountedPrice = product.precio - itemDiscountPerUnit; // <-- RENOMBRADO
            }

            const itemSubtotalWithDiscount = discountedPrice * quantity; // Usamos el nombre consistente
            currentSubtotal += (itemUnitPriceOriginal * quantity);
            totalDiscountAmount += (itemDiscountPerUnit * quantity);

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.dataset.productId = product.id;

            const imageUrl = product.imagenUrl && product.imagenUrl !== '' ? product.imagenUrl : './img/default-product.png';

            cartItemDiv.innerHTML = `
                <img src="${imageUrl}" alt="${product.nombre}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${product.nombre}</h4>
                    <p class="cart-item-price">
                        ${product.descuento > 0 ? 
                            `<span class="original-price-strikethrough">$${itemUnitPriceOriginal.toFixed(2)}</span>` : ''
                        }
                        <span class="final-item-price">$${discountedPrice.toFixed(2)}</span>
                    </p>
                    ${product.descuento > 0 ? `<p class="cart-item-discount-info">Descuento: ${product.descuento}% (-$${itemDiscountPerUnit.toFixed(2)} c/u)</p>` : ''}
                    ${isOutOfStock ? `<p class="cart-item-status out-of-stock">Agotado</p>` : quantityExceedsStock ? `<p class="cart-item-status quantity-warning">Solo quedan ${availableStock} en stock</p>` : ''}
                </div>
                <div class="cart-item-quantity-controls">
                    <button class="quantity-btn decrease-quantity" data-id="${product.id}"><i class="fas fa-minus"></i></button>
                    <span class="quantity-display">${quantity}</span>
                    <button class="quantity-btn increase-quantity" data-id="${product.id}" ${isOutOfStock || quantityExceedsStock ? 'disabled' : ''}><i class="fas fa-plus"></i></button>
                </div>
                <div class="cart-item-subtotal">
                    $${itemSubtotalWithDiscount.toFixed(2)}
                </div>
                <button class="remove-item-btn" data-id="${product.id}"><i class="fas fa-trash"></i></button>
            `;
            cartItemsList.appendChild(cartItemDiv);
        });

        cartSubtotalSpan.textContent = `$${currentSubtotal.toFixed(2)}`;
        cartDiscountSpan.textContent = `-$${totalDiscountAmount.toFixed(2)}`;
        cartTotalSpan.textContent = `$${(currentSubtotal - totalDiscountAmount).toFixed(2)}`;

        updateCartIconCount();
    }

    // --- Manejadores de Eventos del Carrito ---

    // Delegación de eventos para botones de cantidad y eliminar
    if (cartItemsList) {
        cartItemsList.addEventListener('click', (e) => {
            const target = e.target;
            const productId = parseInt(target.closest('.cart-item')?.dataset.productId || target.dataset.id);

            if (!productId || !currentUserInstance) return;

            const productInCart = currentUserInstance.carrito.productos.find(item => item.producto.id === productId);
            const originalProduct = productosGlobal.find(p => p.id === productId);

            if (!productInCart || !originalProduct) {
                console.error("Producto no encontrado en carrito o en el catálogo global.");
                return;
            }

            if (target.closest('.increase-quantity')) {
                if (originalProduct.stock > productInCart.cantidad) {
                    currentUserInstance.carrito.agregarProducto(originalProduct);
                    originalProduct.actualizarStock(-1);
                    saveAllChanges();
                } else {
                    alert(`No hay más stock disponible de "${originalProduct.nombre}".`);
                }
            } else if (target.closest('.decrease-quantity')) {
                if (productInCart.cantidad > 1) {
                    currentUserInstance.carrito.eliminarProducto(productId, 1);
                    originalProduct.actualizarStock(1);
                    saveAllChanges();
                } else if (productInCart.cantidad === 1) {
                    if (confirm(`¿Quieres eliminar "${originalProduct.nombre}" del carrito?`)) {
                        currentUserInstance.carrito.eliminarProducto(productId);
                        originalProduct.actualizarStock(1);
                        saveAllChanges();
                    }
                }
            } else if (target.closest('.remove-item-btn') || target.closest('.remove-item-btn')) {
                if (confirm(`¿Estás seguro de que quieres eliminar "${originalProduct.nombre}" del carrito?`)) {
                    currentUserInstance.carrito.eliminarProducto(productId);
                    originalProduct.actualizarStock(productInCart.cantidad);
                    saveAllChanges();
                }
            }
        });
    }

    // Botón Proceder al Pago (Checkout)
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (!currentUserInstance || currentUserInstance.carrito.productos.length === 0) {
                checkoutMessage.textContent = 'Tu carrito está vacío. Añade productos para proceder al pago.';
                checkoutMessage.style.color = 'red';
                return;
            }

            checkoutMessage.textContent = 'Procesando tu pedido...';
            checkoutMessage.style.color = 'green';
            if (checkoutBtn) checkoutBtn.disabled = true;

            setTimeout(() => {
                currentUserInstance.carrito.productos = [];
                saveAllChanges();
                
                alert('¡Pedido realizado con éxito! (Funcionalidad de pago no implementada en esta demo)');
                checkoutMessage.textContent = '¡Gracias por tu compra!';
                checkoutMessage.style.color = 'green';
                if (checkoutBtn) checkoutBtn.disabled = false;
            }, 2000);
        });
    }

    // Botón Seguir Comprando
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            window.location.href = './catalogo.html';
        });
    }

    // --- Función para Guardar Cambios en Storage ---
    function saveAllChanges() {
        guardarUsuarios(usuarios);
        guardarProductos(productosGlobal);
        renderCart(); // Re-renderiza el carrito para reflejar los cambios
    }

    // --- Inicialización de la página del carrito ---
    initializeCartPage();
});