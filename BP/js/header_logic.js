// js/header_logic.js

// --- Utility Functions ---

/**
 * Retrieves the logged-in user's data from sessionStorage.
 * @returns {object|null} An object containing the logged-in user's data or null if no session.
 */
function getLoggedInUser() {
    const userJSON = sessionStorage.getItem('loggedInUser');
    return userJSON ? JSON.parse(userJSON) : null;
}

/**
 * Logs out the user, clears sessionStorage, and redirects.
 */
function logoutUser() {
    sessionStorage.removeItem('loggedInUser'); // Remove the logged-in user's information
    alert('Sesión cerrada correctamente.'); // Notify the user
    window.location.href = './login_registro.html'; // Redirect to the login/registration page
}

/**
 * Redirects to the login/registration page.
 */
function redirectToLogin() {
    window.location.href = './login_registro.html';
}

// --- Dynamic Session Active Modal Logic ---

// References to modal elements (must exist in the HTML of the page loading this script)
const sessionActiveModalOverlay = document.getElementById('session-active-modal-overlay');
const modalMessage = document.getElementById('modal-message');
const modalLogoutBtn = document.getElementById('modal-logout-btn');
const modalGotoHomeBtn = document.getElementById('modal-goto-home-btn');
const modalCloseButton = document.querySelector('#session-active-modal-overlay .close-button');


/**
 * Displays the dynamic session active modal with a custom message.
 * @param {string} message - The message to display in the modal.
 */
export function showSessionActiveModal(message = "Ya tienes una sesión activa. Si deseas iniciar otra, presiona en 'Cerrar sesión'.") {
    // Only proceed if all modal elements are found in the current page's DOM
    if (sessionActiveModalOverlay && modalMessage && modalLogoutBtn && modalGotoHomeBtn && modalCloseButton) {
        modalMessage.textContent = message; // Set the message in the modal
        sessionActiveModalOverlay.classList.add('active'); // Add the 'active' class to show the overlay

        // Configure event listeners for modal buttons
        modalLogoutBtn.onclick = () => {
            logoutUser(); // Call the existing logout function
            hideSessionActiveModal(); // Hide the modal
        };
        modalGotoHomeBtn.onclick = () => {
            window.location.href = './menu_inicio.html'; // Redirect to the home page
            hideSessionActiveModal(); // Hide the modal
        };
        modalCloseButton.onclick = hideSessionActiveModal; // Close the modal with the "x" button
        
        // Close the modal if clicked outside the content (on the overlay)
        sessionActiveModalOverlay.addEventListener('click', (e) => {
            if (e.target === sessionActiveModalOverlay) {
                hideSessionActiveModal();
            }
        });
    } else {
        // Fallback to alert if modal HTML elements are not found
        console.error("Modal elements for active session not found on the page. Falling back to alert.");
        alert(message);
    }
}

/**
 * Hides the dynamic session active modal.
 */
export function hideSessionActiveModal() {
    if (sessionActiveModalOverlay) {
        sessionActiveModalOverlay.classList.remove('active'); // Remove the 'active' class to hide the overlay
    }
}

/**
 * Updates the item count displayed on the shopping cart icon in the header.
 */
export function updateCartIconCount() {
    const cartItemCountSpan = document.getElementById('cart-item-count');
    if (!cartItemCountSpan) {
        console.warn("Elemento #cart-item-count no encontrado en la cabecera. El contador del carrito no se actualizará.");
        return;
    }

    const loggedInUserData = getLoggedInUser();
    let cartTotalItems = 0;

    if (loggedInUserData && loggedInUserData.id) {
        // To get the total number of items in the logged-in user's cart,
        // we need to load users.
        // We use a dynamic import for storage.js to avoid circular dependencies
        // if storage.js also imports modules that, in turn, import header_logic.js.
        import('./storage.js').then(module => { 
            const users = module.cargarUsuarios(); // Load all users
            const currentUser = users.find(u => u.id === loggedInUserData.id); // Find the logged-in user by ID

            if (currentUser && currentUser.carrito && currentUser.carrito.productos) {
                cartTotalItems = currentUser.carrito.productos.reduce((total, item) => total + item.cantidad, 0);
            }
            cartItemCountSpan.textContent = cartTotalItems; // Update the counter text
            cartItemCountSpan.style.display = cartTotalItems > 0 ? 'flex' : 'none'; // Show if > 0, hide if 0
        }).catch(err => {
            console.error("Failed to load users for cart count:", err);
            cartItemCountSpan.textContent = 0;
            cartItemCountSpan.style.display = 'none';
        });

    } else {
        // If no user is logged in, the counter is 0 and hidden
        cartItemCountSpan.textContent = 0;
        cartItemCountSpan.style.display = 'none';
    }
}

// --- Main Logic for Header UI Update ---

/**
 * Updates the user interface in the header (user icons, name, logout, profile)
 * based on the user's session status.
 */
export function updateHeaderUserUI() {
    const userIconContainer = document.querySelector('.user-icon-container');
    const profileIconContainer = document.getElementById('profile-icon-container');
    const userManagementIconContainer = document.getElementById('user-management-icon-container'); 
    const cartIconContainer = document.querySelector('.cart-icon-container'); // Reference to the cart icon container

    let userIcon = userIconContainer ? userIconContainer.querySelector('.fas.fa-user-circle') : null;

    // If the main user icon container is not found, exit
    if (!userIconContainer) {
        console.warn("Elemento .user-icon-container no encontrado en la cabecera.");
        return;
    }
    // Ensure the base user icon exists within the container.
    // If not, create it and prepend it to the container.
    if (!userIcon) {
        userIcon = document.createElement('i');
        userIcon.classList.add('fas', 'fa-user-circle');
        userIconContainer.prepend(userIcon);
    }

    // Clear any extra content (name, logout icon) that might have been previously added
    userIconContainer.querySelectorAll('.user-name, .logout-icon').forEach(el => el.remove());

    const loggedInUserData = getLoggedInUser(); // Get logged-in user data from sessionStorage

    // Determine if the logged-in user is an administrator
    const isAdminUser = loggedInUserData && loggedInUserData.role === 'admin';

    if (loggedInUserData && loggedInUserData.id) {
        // --- Scenario: User IS logged in ---

        const userNameSpan = document.createElement('span');
        userNameSpan.classList.add('user-name');
        userNameSpan.textContent = loggedInUserData.nombre;

        const logoutIcon = document.createElement('i');
        logoutIcon.classList.add('fas', 'fa-sign-out-alt', 'logout-icon'); // Font Awesome logout icon
        logoutIcon.title = 'Cerrar sesión'; // Tooltip on hover

        // Add user name and logout icon to the user icon container
        userIconContainer.appendChild(userNameSpan);
        userIconContainer.appendChild(logoutIcon);

        // Control visibility and behavior of the profile icon
        if (profileIconContainer) {
            profileIconContainer.style.display = isAdminUser ? 'none' : 'flex'; // Hide for admin, show for regular user
            // Remove previous listener and add new one to prevent duplicates
            profileIconContainer.onclick = null; // Clear any direct onclick
            profileIconContainer.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event propagation to parent elements
                window.location.href = './perfil_usuario.html'; // Redirect to profile page
            });
        }

        // Control visibility and behavior of the user management icon (only for admin)
        if (userManagementIconContainer) {
            userManagementIconContainer.style.display = isAdminUser ? 'flex' : 'none'; // Show for admin, hide for regular user
            userManagementIconContainer.onclick = (e) => {
                e.stopPropagation();
                window.location.href = './admin_usuarios.html'; // Redirect to user management page
            };
        }

        // Configure click behavior for the userIconContainer (area around user icon/name)
        // Remove previous listeners to prevent unwanted behavior
        userIconContainer.onclick = null; // Clear any direct onclick
        userIconContainer.removeEventListener('click', redirectToLogin); // Remove redirect listener

        userIconContainer.addEventListener('click', (e) => {
            // If the click was NOT on the logout icon, profile icon, or user management icon (or their containers).
            // This ensures clicking the name/main icon area shows the modal.
            if (!e.target.classList.contains('logout-icon') && !e.target.classList.contains('profile-icon') && !e.target.closest('.profile-icon-container') && !e.target.closest('.user-management-icon-container')) {
                showSessionActiveModal("Ya tienes una sesión activa. Si deseas iniciar otra, presiona en 'Cerrar sesión'.");
            }
        });

        // Configure click behavior for the logout icon
        logoutIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from propagating to the userIconContainer parent
            logoutUser(); // Call the logout function
        });

        // Configure click behavior for the cart icon container
        if (cartIconContainer) {
            cartIconContainer.style.cursor = 'pointer'; // Indicate it's clickable
            // Remove previous listeners to prevent duplicates
            cartIconContainer.removeEventListener('click', handleCartIconClick); // Remove specific handler if exists
            cartIconContainer.addEventListener('click', handleCartIconClick);
        }

    } else {
        // --- Scenario: User NOT logged in ---
        // Set the base user icon color to its default
        userIconContainer.querySelector('.fas.fa-user-circle').style.color = 'var(--medium-text)';
        
        // Hide profile and user management icons if not logged in
        if (profileIconContainer) { profileIconContainer.style.display = 'none'; profileIconContainer.onclick = null; }
        if (userManagementIconContainer) { userManagementIconContainer.style.display = 'none'; userManagementIconContainer.onclick = null; }

        // Configure click behavior for the userIconContainer to redirect to login/registration
        userIconContainer.onclick = null; // Clear any direct onclick
        userIconContainer.removeEventListener('click', redirectToLogin); // Ensure no duplicates
        userIconContainer.addEventListener('click', redirectToLogin); // Add the redirect listener

        // Configure click behavior for the cart icon container when not logged in
        if (cartIconContainer) {
            cartIconContainer.style.cursor = 'pointer'; // Indicate it's clickable
            cartIconContainer.removeEventListener('click', handleCartIconClick); // Remove specific handler if exists
            cartIconContainer.addEventListener('click', () => {
                showSessionActiveModal("Debes iniciar sesión para ver tu carrito de compras.");
            });
        }
    }
    
    updateCartIconCount(); // Call the function to update the cart counter when the header loads
}

// Function to handle click on the cart icon, defined globally for easy access
function handleCartIconClick() {
    const loggedInUserData = getLoggedInUser();
    if (loggedInUserData && loggedInUserData.id) {
        if (loggedInUserData.role === 'admin') {
            alert("El carrito de compras no está disponible para administradores.");
            return;
        }
        window.location.href = './carrito.html';
    } else {
        showSessionActiveModal("Debes iniciar sesión para ver tu carrito de compras.");
    }
}

// Call the main function to update the header when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', updateHeaderUserUI);

// EXPORT FUNCTIONS so other modules can use them.
// Only list functions that do NOT have 'export' directly in their 'function' declaration.
// Functions 'showSessionActiveModal', 'hideSessionActiveModal', 'updateCartIconCount' are
// already exported in their own declarations, so they are NOT listed here to avoid duplication.
export { logoutUser };