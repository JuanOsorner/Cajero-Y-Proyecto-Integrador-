import { Cuenta } from "./Cuenta.js"; //POR FAVOR INSERTAR EL .js
import { Cliente } from "./Cliente.js";

//ES IMPORTANTE DEFINIR LAS VARIABLES

//Variables (OSORNER)

let Numero = '';
let Saldo = 0;
let Movimientos = [];

//Variables (PELAEZ)

let Nombre = "Alejandro";
let Apellidos = '';
let Direccion = '';
let Identificacion = '';
let Estado = true;

const cuenta = new Cuenta(Numero,Saldo,Movimientos);
const cliente = new Cliente(Numero,Saldo,Movimientos,Nombre,Apellidos,Direccion,Identificacion,Estado);

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
    Nombre = document.getElementById('nombre').value; //PARA ACCEDER AL VALOR
    cliente.modificar(1,Nombre);
    document.getElementById('Cnombre').textContent = Nombre;
});

const btnActualizar2 = document.getElementById('actualizar2');
btnActualizar2.addEventListener('click',()=>{
    Apellidos = document.getElementById('apellidos');
    Apellidos = docume
    document.getElementById('Capellidos').textContent = cliente.modificar(2,Apellidos);
});

/*-----------------------------------------------------------------------*/