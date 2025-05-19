import { Cuenta } from "./Cuenta.js"; //POR FAVOR INSERTAR EL .js
import { Cliente } from "./Cliente.js";

//Variables (OSORNER)



//Variables (PELAEZ)

let Nombre = '';
let Apellidos = '';
let Direccion = '';
let Identificacion = '';
let Estado = true;

const cuenta = new Cuenta('1000222',10000,[]);
const cliente = new Cliente(Nombre,Apellidos,Direccion,Identificacion,Estado);

/*-----------------------------------------------------------------------*/

//Vamos a definir los botones del html (OSORNER)

const btnConsultar = document.getElementById('btn-top-consultar');
btnConsultar.addEventListener("click", () => {
    cuenta.consultarSaldo();
});

const btnCerrar = document.getElementById('cerrar-dlg');
btnCerrar.addEventListener("click", () => {
    dlg.close();
});

const btnRegistrar = document.getElementById('btn-top-registrar');
btnRegistrar.addEventListener("click", () => {
    cuenta.registrarMovimientos("Consignación",1000);
});

const btnConsultarM = document.getElementById('btn-top-movimientos');
btnConsultarM.addEventListener("click", () => {
    cuenta.consultarMovimientos();
});

const btnCerrar1 = document.getElementById('cerrar-dlg1');
btnCerrar1.addEventListener("click", () => {
    const dlg1 = document.getElementById('dlg1');
    dlg1.close();
});

/*-----------------------------------------------------------------------*/

//Vamos a definir los ids (PELAEZ)

const btnActualizar1 = document.getElementById('actualizar1');
btnActualizar1.addEventListener('click',()=>{
    Nombre = document.getElementById('nombre');
    document.getElementById('Cnombre').textContent = cliente.modificar(1,Nombre);
});

const btnActualizar2 = document.getElementById('actualizar2');
btnActualizar2.addEventListener('click',()=>{
    Apellidos = document.getElementById('apellidos');
    document.getElementById('Capellidos').textContent = cliente.modificar(2,Apellidos);
});

/*-----------------------------------------------------------------------*/