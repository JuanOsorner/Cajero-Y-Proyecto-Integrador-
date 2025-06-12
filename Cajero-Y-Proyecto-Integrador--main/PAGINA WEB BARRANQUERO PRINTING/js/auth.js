// Función para manejar el cambio entre pestañas
function handleTabChange() {
    const showLoginBtn = document.getElementById('showLogin');
    const showRegisterBtn = document.getElementById('showRegister');
    const authCard = document.getElementById('authCard');
    const linkToRegister = document.getElementById('linkToRegister');
    const linkToLogin = document.getElementById('linkToLogin');

    function showLogin() {
        authCard.classList.remove('register-active');
        authCard.classList.add('login-active');
    }

    function showRegister() {
        authCard.classList.remove('login-active');
        authCard.classList.add('register-active');
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', showLogin);
    }

    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', showRegister);
    }

    if (linkToRegister) {
        linkToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showRegister();
        });
    }

    if (linkToLogin) {
        linkToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showLogin();
        });
    }
}

// Función para manejar el inicio de sesión
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Validación básica
    if (!email || !password) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    // Aquí normalmente haríamos una petición al servidor
    // Por ahora, simularemos un inicio de sesión exitoso
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    // Redirigir al menú de inicio
    window.location.href = 'menu_inicio.html';
}

// Función para manejar el registro
function handleRegister(event) {
    event.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validación básica
    if (!email || !password || !confirmPassword) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    // Aquí normalmente haríamos una petición al servidor
    // Por ahora, simularemos un registro exitoso
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    // Redirigir al menú de inicio
    window.location.href = 'menu_inicio.html';
}

// Agregar event listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Inicializar el manejo de pestañas
    handleTabChange();
}); 