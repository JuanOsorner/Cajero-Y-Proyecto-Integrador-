// js/header_logic.js

// --- Funciones de Utilidad ---

/**
 * Obtiene los datos del usuario logueado desde sessionStorage.
 * @returns {object|null} Un objeto con los datos del usuario logueado o null si no hay sesión.
 */
function getLoggedInUser() {
    const userJSON = sessionStorage.getItem('loggedInUser');
    return userJSON ? JSON.parse(userJSON) : null;
}

/**
 * Cierra la sesión del usuario, limpia sessionStorage y redirige.
 */
function logoutUser() {
    sessionStorage.removeItem('loggedInUser'); // Elimina la información del usuario logueado
    alert('Sesión cerrada correctamente.'); // Aviso al usuario
    window.location.href = './login_registro.html'; // Redirige a la página de login/registro
}

/**
 * Redirige a la página de login/registro.
 */
function redirectToLogin() {
    window.location.href = './login_registro.html';
}

// --- Lógica del Modal Dinámico de Sesión Activa ---

// Referencias a los elementos del modal (deben existir en el HTML de la página que lo carga)
const sessionActiveModalOverlay = document.getElementById('session-active-modal-overlay');
const modalMessage = document.getElementById('modal-message');
const modalLogoutBtn = document.getElementById('modal-logout-btn');
const modalGotoHomeBtn = document.getElementById('modal-goto-home-btn');
const modalCloseButton = document.querySelector('#session-active-modal-overlay .close-button');


/**
 * Muestra el modal dinámico de sesión activa con un mensaje personalizado.
 * @param {string} message - El mensaje a mostrar en el modal.
 */
export function showSessionActiveModal(message = "Ya tienes una sesión activa. Si deseas iniciar otra, presiona en 'Cerrar sesión'.") {
    // Solo procede si todos los elementos del modal existen en el DOM de la página actual
    if (sessionActiveModalOverlay && modalMessage && modalLogoutBtn && modalGotoHomeBtn && modalCloseButton) {
        modalMessage.textContent = message; // Establece el mensaje en el modal
        sessionActiveModalOverlay.classList.add('active'); // Añade la clase 'active' para mostrar el overlay

        // Configurar Event Listeners para los botones del modal
        modalLogoutBtn.onclick = () => {
            logoutUser(); // Llama a la función de logout existente
            hideSessionActiveModal(); // Oculta el modal
        };
        modalGotoHomeBtn.onclick = () => {
            window.location.href = './menu_inicio.html'; // Redirige a la página de inicio
            hideSessionActiveModal(); // Oculta el modal
        };
        modalCloseButton.onclick = hideSessionActiveModal; // Cierra el modal con la "x"
        
        // Cierra el modal si se hace clic fuera del contenido (en el overlay)
        // Esto es útil si el usuario hace clic en el fondo oscuro
        sessionActiveModalOverlay.addEventListener('click', (e) => {
            if (e.target === sessionActiveModalOverlay) {
                hideSessionActiveModal();
            }
        });
    } else {
        // Fallback a alert si los elementos del modal no se encuentran
        // Esto podría ocurrir si el HTML del modal no se ha duplicado en todas las páginas.
        console.error("Elementos del modal de sesión activa no encontrados en la página. Usando alert como fallback.");
        alert(message);
    }
}

/**
 * Oculta el modal dinámico de sesión activa.
 */
export function hideSessionActiveModal() {
    if (sessionActiveModalOverlay) {
        sessionActiveModalOverlay.classList.remove('active'); // Remueve la clase 'active' para ocultar el overlay
    }
}


// --- Lógica Principal para Actualizar la Cabecera ---

/**
 * Actualiza la interfaz de usuario en la cabecera (íconos de usuario, nombre, logout, perfil)
 * basándose en el estado de la sesión del usuario.
 */
export function updateHeaderUserUI() {
    const userIconContainer = document.querySelector('.user-icon-container');
    const profileIconContainer = document.getElementById('profile-icon-container'); // Referencia al nuevo ícono de perfil
    let userIcon = userIconContainer ? userIconContainer.querySelector('.fas.fa-user-circle') : null; // Ícono base de usuario

    // Si el contenedor principal del icono de usuario no se encuentra, salimos
    if (!userIconContainer) {
        console.warn("Elemento .user-icon-container no encontrado en la cabecera.");
        return;
    }
    // Asegurarse de que el ícono base de usuario exista dentro del contenedor.
    // Si no está, lo creamos y lo añadimos al principio del contenedor.
    if (!userIcon) {
        userIcon = document.createElement('i');
        userIcon.classList.add('fas', 'fa-user-circle');
        userIconContainer.prepend(userIcon);
    }

    // Limpiar cualquier contenido extra (nombre, icono de logout) que pudiera haber sido añadido previamente
    userIconContainer.querySelectorAll('.user-name, .logout-icon').forEach(el => el.remove());

    const loggedInUserData = getLoggedInUser(); // Obtiene los datos del usuario logueado desde sessionStorage

    if (loggedInUserData && loggedInUserData.id) {
        // --- Escenario: Usuario ESTÁ logueado ---

        const userNameSpan = document.createElement('span');
        userNameSpan.classList.add('user-name');
        userNameSpan.textContent = loggedInUserData.nombre;

        const logoutIcon = document.createElement('i');
        logoutIcon.classList.add('fas', 'fa-sign-out-alt', 'logout-icon'); // Ícono de Font Awesome para cerrar sesión
        logoutIcon.title = 'Cerrar sesión'; // Tooltip al pasar el ratón

        // Añadir el nombre de usuario y el ícono de logout al contenedor del ícono de usuario
        userIconContainer.appendChild(userNameSpan);
        userIconContainer.appendChild(logoutIcon);

        // Controlar la visibilidad y el comportamiento del ícono de perfil
        if (profileIconContainer) {
            profileIconContainer.style.display = 'flex'; // Muestra el ícono de perfil (usamos flex para centrarlo)
            // Eliminar listener previo y añadir el nuevo para evitar duplicados
            profileIconContainer.onclick = null; // Limpia cualquier onClick directo
            profileIconContainer.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita que el evento se propague a elementos padres
                window.location.href = './perfil_usuario.html'; // Redirige a la página de perfil
            });
        }

        // Configurar el comportamiento al hacer clic en el userIconContainer (área del nombre/ícono de usuario)
        // Eliminar listeners previos para evitar comportamientos no deseados
        userIconContainer.onclick = null; // Limpia cualquier onClick directo
        userIconContainer.removeEventListener('click', redirectToLogin); // Eliminar listener de redirección

        // **AQUÍ ESTÁ LA LÓGICA PRINCIPAL DEL COMPORTAMIENTO SOLICITADO:**
        // Cuando el usuario logueado hace clic en el ícono de usuario (y no en logout/perfil),
        // se muestra el modal de sesión activa sin redireccionar la página.
        userIconContainer.addEventListener('click', (e) => {
            // Si el clic NO fue en el ícono de logout, el ícono de perfil, o su contenedor padre.
            if (!e.target.classList.contains('logout-icon') && !e.target.classList.contains('profile-icon') && !e.target.closest('.profile-icon-container')) {
                showSessionActiveModal("Ya tienes una sesión activa. Si deseas iniciar otra, presiona en 'Cerrar sesión'.");
            }
        });

        // Configurar el comportamiento al hacer clic en el ícono de logout
        logoutIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el clic se propague al userIconContainer padre
            logoutUser(); // Llama a la función para cerrar sesión
        });

    } else {
        // --- Escenario: Usuario NO está logueado ---
        // Configurar el color del ícono base de usuario a su color por defecto
        userIconContainer.querySelector('.fas.fa-user-circle').style.color = 'var(--medium-text)';
        
        // Ocultar el ícono de perfil si no hay sesión activa
        if (profileIconContainer) {
            profileIconContainer.style.display = 'none';
            profileIconContainer.onclick = null; // Limpiar listener asociado
        }

        // Configurar el click en el userIconContainer para redirigir al login/registro
        userIconContainer.onclick = null; // Limpia cualquier onClick directo
        userIconContainer.removeEventListener('click', redirectToLogin); // Asegurarse de no duplicar
        userIconContainer.addEventListener('click', redirectToLogin); // Añadir el listener de redirección
    }
}

// Llamar a la función principal para actualizar la cabecera
// Esto se ejecuta automáticamente cuando el DOM de cualquier página que cargue este script esté listo.
document.addEventListener('DOMContentLoaded', updateHeaderUserUI);

// Exportar la función de logoutUser para que pueda ser utilizada por otros módulos si es necesario
// Por ejemplo, si el panel de administrador tuviera un botón de cerrar sesión o el modal lo necesita directamente.
export { logoutUser };