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
//preventDefault es para evitar que la pagina se cargue cuando le damos al boton
document.getElementById('boton1').addEventListener('click',(evento1)=>{
    evento1.preventDefault();
    const registerName = document.getElementById('registerName').value;
    const registerEmail = document.getElementById('registerEmail').value;
    const registerPassword = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const registrar = new registro(registerEmail,registerPassword,registerName,confirmPassword,registerPassword,Tabla);
    i += 1;
    let V = registrar.actualizarDatos();
    Tabla = registrar.guardarDatos(i,V);
    console.table(Tabla);
});
//ESTE CODIGO ES TEMPORAL (HAY QUE SOLUCIONAR PORQUE SE VACIA LA TABLA)
document.getElementById('boton').addEventListener('click',(evento2)=>{
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const logear = new login(loginEmail,loginPassword);
    if(Tabla=[]){
        alert("POR FAVOR REGISTRARSE");
        console.table(Tabla);
    }else{
        for(let j = 0; j<3;j++){
            let valor = Tabla[0][j];
            let bolean1 = logear.seguridad1(valor);
            let bolean2 = logear.seguridad2(valor);
            if(bolean1 == true && bolean2 ==true){
                window.location.href = "../catalogo.html"
            }
        }
    }
    evento2.preventDefault();
});