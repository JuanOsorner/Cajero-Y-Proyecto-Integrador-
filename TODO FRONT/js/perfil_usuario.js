// js/perfil_usuario.js
import { cargarUsuarios, guardarUsuarios } from './storage.js';
import { Usuario, Administrador } from './models.js'; // Importa ambas clases para la validación de instancia

document.addEventListener('DOMContentLoaded', () => {
    let usuarios = cargarUsuarios(); // Cargar todos los usuarios del sistema
    let currentUserInstance = null; // Para almacenar la instancia completa del usuario logueado

    // --- Referencias a elementos del DOM del formulario de perfil ---
    const profileForm = document.getElementById('profile-form');
    const profileNameInput = document.getElementById('profile-name');
    const profileEmailInput = document.getElementById('profile-email');
    const profileDobInput = document.getElementById('profile-dob'); // Fecha de Nacimiento (DOB)
    const profileCountryInput = document.getElementById('profile-country');
    const profileCityInput = document.getElementById('profile-city');
    const profileNeighborhoodInput = document.getElementById('profile-neighborhood');
    const profileAddressInput = document.getElementById('profile-address');
    const profileStatusMessage = document.getElementById('profile-status-message'); // Mensaje de estado para el formulario de perfil

    // --- Referencias a elementos del DOM del formulario de contraseña ---
    const passwordForm = document.getElementById('password-form');
    const oldPasswordInput = document.getElementById('old-password'); // Contraseña antigua
    const newPasswordInput = document.getElementById('new-password'); // Nueva contraseña
    const confirmNewPasswordInput = document.getElementById('confirm-new-password'); // Confirmar nueva contraseña
    const passwordStatusMessage = document.getElementById('password-status-message'); // Mensaje de estado para el formulario de contraseña

    // --- Función de Inicialización de la Página de Perfil ---
    function initializeProfilePage() {
        const loggedInUserData = JSON.parse(sessionStorage.getItem('loggedInUser'));

        // Redirigir si no hay sesión activa o si el usuario logueado es un administrador
        // Los administradores gestionan sus datos desde su propio panel, no desde este perfil de usuario normal.
        if (!loggedInUserData || !loggedInUserData.id || loggedInUserData.role === 'admin') {
            alert('Acceso denegado. Por favor, inicie sesión como usuario para acceder a su perfil.');
            window.location.href = './login_registro.html'; // Redirigir al login
            return; // Detiene la ejecución de la función
        }

        // Encontrar la instancia completa del usuario logueado en el array de usuarios cargado
        currentUserInstance = usuarios.find(u => u.id === loggedInUserData.id);

        // Si por alguna razón la instancia del usuario no se encuentra o no es un Usuario válido, redirigir
        if (!currentUserInstance || !(currentUserInstance instanceof Usuario)) {
            alert('Error: No se pudo cargar la información del usuario. Vuelva a iniciar sesión.');
            sessionStorage.removeItem('loggedInUser'); // Limpiar la sesión rota
            window.location.href = './login_registro.html';
            return; // Detiene la ejecución
        }

        // Rellenar el formulario de perfil con los datos del usuario actual
        profileNameInput.value = currentUserInstance.nombre || ''; // Usa || '' para manejar valores null/undefined
        profileEmailInput.value = currentUserInstance.correo || ''; // El email es de solo lectura, pero lo cargamos
        profileDobInput.value = currentUserInstance.fechaNacimiento || '';
        profileCountryInput.value = currentUserInstance.pais || '';
        profileCityInput.value = currentUserInstance.ciudad || '';
        profileNeighborhoodInput.value = currentUserInstance.barrio || '';
        profileAddressInput.value = currentUserInstance.direccion || '';
    }

    // --- Manejadores de Eventos para los Formularios ---

    // Manejar el envío del formulario de actualización de perfil
    if (profileForm) { // Asegurarse de que el formulario existe en el DOM
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir el envío por defecto del formulario

            if (!currentUserInstance) {
                profileStatusMessage.textContent = 'Error: No hay usuario logueado para actualizar.';
                profileStatusMessage.style.color = 'red';
                return;
            }

            // Recoger los nuevos datos del formulario
            const nuevosDatos = {
                nombre: profileNameInput.value.trim(),
                correo: profileEmailInput.value.trim(), // Se incluye aunque sea readonly
                fechaNacimiento: profileDobInput.value,
                pais: profileCountryInput.value.trim(),
                ciudad: profileCityInput.value.trim(),
                barrio: profileNeighborhoodInput.value.trim(),
                direccion: profileAddressInput.value.trim()
            };

            // Validaciones básicas antes de actualizar
            if (!nuevosDatos.nombre || !nuevosDatos.correo) {
                profileStatusMessage.textContent = 'Nombre y correo electrónico son obligatorios.';
                profileStatusMessage.style.color = 'red';
                return;
            }

            // Llamar al método actualizarPerfil de la instancia del usuario
            if (currentUserInstance.actualizarPerfil(nuevosDatos)) {
                // Si la actualización en la instancia es exitosa, actualizar el array global de usuarios
                const userIndex = usuarios.findIndex(u => u.id === currentUserInstance.id);
                if (userIndex !== -1) {
                    usuarios[userIndex] = currentUserInstance; // Reemplazar la instancia actualizada en el array
                }

                guardarUsuarios(usuarios); // Guardar todos los usuarios actualizados en localStorage

                // Actualizar también la información en sessionStorage para que la cabecera (header_logic.js)
                // refleje el nuevo nombre de usuario inmediatamente (si ha cambiado).
                sessionStorage.setItem('loggedInUser', JSON.stringify({
                    id: currentUserInstance.id,
                    nombre: currentUserInstance.nombre,
                    correo: currentUserInstance.correo,
                    role: currentUserInstance instanceof Administrador ? 'admin' : 'user'
                }));

                profileStatusMessage.textContent = '¡Información actualizada exitosamente!';
                profileStatusMessage.style.color = 'green';
                // Limpiar el mensaje de estado después de un breve tiempo
                setTimeout(() => { profileStatusMessage.textContent = ''; }, 3000);
            } else {
                profileStatusMessage.textContent = 'Error al actualizar la información.';
                profileStatusMessage.style.color = 'red';
            }
        });
    }

    // Manejar el envío del formulario de cambio de contraseña
    if (passwordForm) { // Asegurarse de que el formulario existe en el DOM
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir el envío por defecto del formulario

            if (!currentUserInstance) {
                passwordStatusMessage.textContent = 'Error: No hay usuario logueado.';
                passwordStatusMessage.style.color = 'red';
                return;
            }

            const oldPassword = oldPasswordInput.value;
            const newPassword = newPasswordInput.value;
            const confirmNewPassword = confirmNewPasswordInput.value;

            // Validaciones del formulario de contraseña
            if (!oldPassword || !newPassword || !confirmNewPassword) {
                passwordStatusMessage.textContent = 'Todos los campos de contraseña son obligatorios.';
                passwordStatusMessage.style.color = 'red';
                return;
            }
            if (newPassword !== confirmNewPassword) {
                passwordStatusMessage.textContent = 'La nueva contraseña y su confirmación no coinciden.';
                passwordStatusMessage.style.color = 'red';
                return;
            }
            if (newPassword.length < 6) { // Ejemplo de validación de fortaleza (puedes ajustar el mínimo)
                passwordStatusMessage.textContent = 'La nueva contraseña debe tener al menos 6 caracteres.';
                passwordStatusMessage.style.color = 'red';
                return;
            }
            if (oldPassword === newPassword) {
                passwordStatusMessage.textContent = 'La nueva contraseña no puede ser igual a la actual.';
                passwordStatusMessage.style.color = 'red';
                return;
            }

            // Llamar al método cambiarContrasena de la instancia del usuario
            if (currentUserInstance.cambiarContrasena(oldPassword, newPassword)) {
                // Si el cambio de contraseña en la instancia es exitoso, actualizar el array global de usuarios
                const userIndex = usuarios.findIndex(u => u.id === currentUserInstance.id);
                if (userIndex !== -1) {
                    usuarios[userIndex] = currentUserInstance;
                }
                guardarUsuarios(usuarios); // Guardar todos los usuarios en localStorage

                passwordStatusMessage.textContent = '¡Contraseña cambiada exitosamente!';
                passwordStatusMessage.style.color = 'green';
                passwordForm.reset(); // Limpiar el formulario de contraseña
                setTimeout(() => { passwordStatusMessage.textContent = ''; }, 3000); // Limpiar mensaje
            } else {
                passwordStatusMessage.textContent = 'Contraseña antigua incorrecta.';
                passwordStatusMessage.style.color = 'red';
            }
        });
    }

    // Inicializar la página al cargar el DOM
    initializeProfilePage();
});