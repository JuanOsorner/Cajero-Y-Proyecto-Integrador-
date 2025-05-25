import { login} from "./login.js";
import { registro } from "./registro.js";

/*-----------------------------------(IAS)---------------------------------------------------*/

const authCard = document.getElementById('authCard');
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const showLoginBtn = document.getElementById('showLogin');
const showRegisterBtn = document.getElementById('showRegister');
const linkToRegister = document.getElementById('linkToRegister');
const linkToLogin = document.getElementById('linkToLogin');

function showSection(section) {
    if (section === 'login') {
        loginSection.style.display = 'block'; // Mostrar como bloque para que tome el flujo normal
        registerSection.style.display = 'none';
        authCard.classList.add('login-active');
        authCard.classList.remove('register-active');
        showLoginBtn.classList.add('active');
        showRegisterBtn.classList.remove('active');
    } else if (section === 'register') {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block'; // Mostrar como bloque
        authCard.classList.add('register-active');
        authCard.classList.remove('login-active');
        showLoginBtn.classList.remove('active');
        showRegisterBtn.classList.add('active');
    }
}

// Event listeners para los botones de alternancia
showLoginBtn.addEventListener('click', () => showSection('login'));
showRegisterBtn.addEventListener('click', () => showSection('register'));
linkToRegister.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    showSection('register');
});
linkToLogin.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    showSection('login');
});

// Inicialmente, mostrar la sección de login
showSection('login');

/*----------------------------------------(OSORNER)----------------------------------------------*/
let Tabla = [];
let i = 0;
document.getElementById('boton1').addEventListener('click',()=>{
    const registerName = document.getElementById('registerName').value;
    const registerEmail = document.getElementById('registerEmail').value;
    const registerPassword = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const registrar = new registro(registerEmail,registerPassword,registerName,confirmPassword,registerPassword,[]);
    i++;
    let V = registrar.actualizarDatos();
    Tabla = registrar.guardarDatos(i,V)
});
document.getElementById('boton').addEventListener('click',()=>{
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const logear = new login(loginEmail,loginPassword);
    for(let j = 0;j<i;j++){
        
    }
});