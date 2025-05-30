/*-----------------------------------(IAS)---------------------------------------------------*/

import { Usuario } from "./Usuario.js";

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

//Registro
const usuarioR = new Usuario('','','','');

//PARA QUE SE CARGUEN TODOS LOS CONTROLADORES DOMContet...
document.addEventListener('DOMContentLoaded',()=>{
    const boton = document.getElementById('boton');
    boton.addEventListener('click',(ev)=>{
        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;
        if(usuarioR.IniciarSesion(loginEmail,loginPassword)==true){
            window.location.href="./catalogo.html"
        }else{
            alert("Usuario no encontrado");
        }
        ev.preventDefault();
    });
});

let id = 0;
document.addEventListener('DOMContentLoaded',()=>{
    const boton1 = document.getElementById('boton1');
    boton1.addEventListener('click',(e)=>{
        id+=1;
        const registerName = document.getElementById('registerName').value;
        const registerEmail = document.getElementById('registerEmail').value;
        const registerPassword = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        usuarioR.setId(id);
        usuarioR.setNombre(registerName);
        usuarioR.setCorreo(registerEmail);
        usuarioR.setContraseña(registerPassword);
        usuarioR.Registrarse(usuarioR.getNombre(),usuarioR.getCorreo(),usuarioR.getContraseña(),confirmPassword);
        e.preventDefault();
    });
});

/*----------------------------------------(OSORNER)----------------------------------------------*/
