// login_registro.js (Controla la vista de login/registro y activa el panel admin)
import { Usuario, Administrador } from './models.js';
import { cargarUsuarios, guardarUsuarios } from './storage.js';
import { initAdminPanel } from './app.js'; // Módulo para inicializar el panel de administrador
// Importamos las funciones del modal y de logout desde header_logic.js.
// Es crucial que header_logic.js exporte estas funciones.
import { showSessionActiveModal, hideSessionActiveModal, logoutUser } from './header_logic.js'; 

let usuarios = []; // Array que contendrá todas las instancias de Usuario y Administrador

document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos al iniciar la página
    usuarios = cargarUsuarios();

    // Si no hay un administrador en el sistema, se crea uno por defecto.
    // Esto asegura que siempre haya un punto de entrada para la administración.
    // ¡IMPORTANTE! Las credenciales (admin@bp.com, 12345) deben coincidir
    // EXACTAMENTE con las definidas en storage.js para la "rehidratación" del objeto Administrador.
    if (!usuarios.some(user => user instanceof Administrador)) {
        console.log("Creando administrador por defecto...");
        const admin = new Administrador(1, "Admin General", "admin@bp.com", "12345");
        usuarios.push(admin);
        guardarUsuarios(usuarios); // Guarda el nuevo administrador en localStorage
        usuarios = cargarUsuarios(); // Recarga para asegurar que la instancia en 'usuarios' sea la de Administrador
        console.log("Administrador por defecto creado y cargado.");
    }

    // --- Referencias a elementos del DOM de la página de login/registro ---
    const authContainer = document.querySelector('.auth-container'); // Contenedor principal de login/registro (oculta/muestra todo esto)
    const loginForm = document.getElementById('login-form'); // Formulario de login unificado
    const registerForm = document.getElementById('register-form'); // Formulario de registro
    const registerLink = document.getElementById('register-link'); // Enlace para cambiar a registro
    const loginStatusMessage = document.getElementById('login-status-message'); // Mensaje de estado para el login
    const registerStatusMessage = document.getElementById('register-status-message'); // Mensaje de estado para el registro

    const loginEmailInput = document.getElementById('login-email'); // Campo de email del login
    const loginPasswordInput = document.getElementById('login-password'); // Campo de contraseña del login
    const registerNameInput = document.getElementById('register-name'); // Campo de nombre del registro
    const registerEmailInput = document.getElementById('register-email'); // Campo de email del registro
    const registerPasswordInput = document.getElementById('register-password'); // Campo de contraseña del registro
    const registerConfirmPasswordInput = document.getElementById('register-confirm-password'); // Campo de confirmación de contraseña

    // --- Referencias al Panel de Administrador (que reside en esta misma página) ---
    const adminPanelSection = document.querySelector('.admin-panel'); // La sección completa del panel de administrador


    // --- Funciones de control de la vista ---

    /** Muestra los formularios de autenticación (login/registro) y oculta el panel de admin y el aviso. */
    function showAuthForms() {
        authContainer.style.display = 'block';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none'; // Por defecto muestra el login
        adminPanelSection.style.display = 'none'; // Oculta el panel de administrador
        hideSessionActiveModal(); // Asegura que el modal de sesión activa esté oculto
        
        loginStatusMessage.textContent = '';
        registerStatusMessage.textContent = '';
    }

    /** Muestra el panel de administrador y oculta los formularios de autenticación y el aviso. */
    function showAdminPanel() {
        authContainer.style.display = 'none';
        adminPanelSection.style.display = 'block';
        hideSessionActiveModal(); // Oculta el modal de sesión activa
    }


    // --- Lógica de inicialización de la página al cargar el DOM ---
    // Verifica si ya hay una sesión activa al cargar login_registro.html
    const loggedInUserOnLoad = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (loggedInUserOnLoad && loggedInUserOnLoad.id) {
        if (loggedInUserOnLoad.role === 'admin') {
            showAdminPanel();
            // Intenta encontrar y cargar la instancia completa del administrador
            const adminInstance = usuarios.find(u => u.id === loggedInUserOnLoad.id);
            if (adminInstance) {
                 initAdminPanel(adminInstance); // Inicializa el panel de administrador
            } else {
                 // Si no se encuentra la instancia del admin (ej. datos corruptos), limpia sesión
                 sessionStorage.removeItem('loggedInUser');
                 // Muestra el modal con un mensaje de error y para que el usuario pueda intentar de nuevo
                 showSessionActiveModal("Hubo un problema al cargar tu sesión de administrador. Por favor, vuelve a iniciar sesión.");
            }
        } else {
            // Usuario normal logueado: Muestra el modal de sesión activa directamente
            showSessionActiveModal("Ya tienes una sesión activa. Si deseas iniciar otra, presiona en 'Cerrar sesión'.");
        }
    } else {
        // Si no hay sesión activa, muestra los formularios de autenticación por defecto
        showAuthForms();
    }


    // --- Event Listeners principales de la página ---

    // Maneja el clic en el enlace "Regístrate una cuenta gratuita"
    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block'; // Muestra el formulario de registro
            loginStatusMessage.textContent = '';
            registerStatusMessage.textContent = '';
        });
    }

    // Manejador UNIFICADO para el envío del formulario de Login
    // Intenta iniciar sesión como Administrador o como Usuario normal.
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Previene el envío tradicional del formulario
            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;

            // Busca si existe un usuario con el email proporcionado
            const foundUser = usuarios.find(user => user.correo === email);

            if (foundUser) {
                // Si el usuario existe, intenta validar sus credenciales
                if (foundUser.iniciarSesion(email, password)) {
                    // Credenciales correctas: guarda la información del usuario en sessionStorage
                    sessionStorage.setItem('loggedInUser', JSON.stringify({
                        id: foundUser.id,
                        nombre: foundUser.nombre,
                        correo: foundUser.correo,
                        role: foundUser instanceof Administrador ? 'admin' : 'user' // Almacena el rol
                    }));

                    if (foundUser instanceof Administrador) {
                        // --- Lógica para Login de Administrador Exitoso ---
                        loginStatusMessage.textContent = '¡Inicio de sesión de administrador exitoso!';
                        loginStatusMessage.style.color = 'green';
                        
                        showAdminPanel(); // Oculta formularios de auth y muestra el panel admin
                        initAdminPanel(foundUser); // Inicializa la lógica del panel de administrador
                        
                    } else {
                        // --- Lógica para Login de Usuario Normal Exitoso ---
                        loginStatusMessage.textContent = `¡Bienvenido, ${foundUser.nombre}! Redireccionando...`;
                        loginStatusMessage.style.color = 'green';
                        loginForm.reset(); // Limpia los campos del formulario de login
                        console.log("Usuario normal logueado:", foundUser);

                        // Redirige a la página de inicio para usuarios normales
                        window.location.href = './menu_inicio.html';
                    }
                    hideSessionActiveModal(); // Oculta el modal de sesión activa si estaba visible
                } else {
                    // Credenciales incorrectas para el usuario encontrado
                    loginStatusMessage.textContent = 'Correo o contraseña incorrectos.';
                    loginStatusMessage.style.color = 'red';
                }
            } else {
                // Usuario no encontrado en el sistema
                loginStatusMessage.textContent = 'Correo o contraseña incorrectos.';
                loginStatusMessage.style.color = 'red';
            }
        });
    }

    // Manejador para el envío del formulario de Registro de Usuario
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = registerNameInput.value.trim();
            const email = registerEmailInput.value.trim();
            const password = registerPasswordInput.value;
            const confirmPassword = registerConfirmPasswordInput.value;

            // Validaciones del formulario de registro
            if (password !== confirmPassword) {
                registerStatusMessage.textContent = 'Las contraseñas no coinciden.';
                registerStatusMessage.style.color = 'red';
                return;
            }
            if (usuarios.some(user => user.correo === email)) {
                registerStatusMessage.textContent = 'Este correo ya está registrado.';
                registerStatusMessage.style.color = 'red';
                return;
            }
            // Genera un ID único para el nuevo usuario
            const newId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
            const nuevoUsuario = new Usuario(newId, name, email, password);
            usuarios.push(nuevoUsuario); // Añade el nuevo usuario al array
            guardarUsuarios(usuarios); // Guarda los usuarios actualizados en localStorage

            registerStatusMessage.textContent = `¡Registro exitoso, ${name}! Ahora puedes iniciar sesión.`;
            registerStatusMessage.style.color = 'green';

            // Redirige al formulario de login después de un breve retraso
            setTimeout(() => {
                showAuthForms(); // Vuelve a la vista de login
                loginEmailInput.value = email; // Pre-llena el correo en el campo de login
                loginPasswordInput.value = ''; // Limpia el campo de contraseña
                registerForm.reset(); // Limpia el formulario de registro
            }, 1500);
        });
    }
});