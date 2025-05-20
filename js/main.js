import { Cuenta } from "./Cuenta.js"; //POR FAVOR INSERTAR EL .js
import { Cliente } from "./Cliente.js";

//ES IMPORTANTE DEFINIR LAS VARIABLES

//Variables (OSORNER)

let Numero = '';
let Saldo = 0;
let Movimientos = [];

//Variables (PELAEZ)

let Nombre = '';
let Apellidos = '';
let Direccion = '';
let Identificacion = '';
let Estado = true;

const cuenta = new Cuenta(Numero,Saldo,Movimientos);
const cliente = new Cliente(Numero,Saldo,Movimientos,Nombre,Apellidos,Direccion,Identificacion,Estado);

/*-----------------------------------------------------------------------*/

//Vamos a definir los botones del html (OSORNER)

const caja1 = document.getElementById('caja1');
const caja2 = document.getElementById('caja2');
const caja3 = document.getElementById('caja3');

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

const btnCliente = document.getElementById('btn-consignar-cliente');
btnCliente.addEventListener('click',()=>{
    caja1.style.display = "none";
    caja2.style.display = "flex";
});

const volver1 = document.getElementById('volver1');
volver1.addEventListener('click',()=>{
    caja2.style.display = "none";
    caja1.style.display = "flex";
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
    Apellidos = document.getElementById('apellidos').value;
    cliente.modificar(2,Apellidos);
    document.getElementById('Capellidos').textContent = Apellidos;
});

const btnActualizar3 = document.getElementById('actualizar3');
btnActualizar3.addEventListener('click',()=>{
    Direccion = document.getElementById('direccion').value; //PARA ACCEDER AL VALOR
    cliente.modificar(3,Direccion);
    document.getElementById('Cdireccion').textContent = Direccion;
});

const btnActualizar4 = document.getElementById('actualizar4');
btnActualizar4.addEventListener('click',()=>{
    Identificacion = document.getElementById('identificacion').value;
    cliente.modificar(4,Identificacion);
    document.getElementById('Cidentificacion').textContent = Identificacion;
});

const btnGenerarCuenta = document.getElementById('btn-generar-cuenta');
btnGenerarCuenta.addEventListener('click',()=>{
    document.getElementById('numeroCuenta').textContent = cliente.generarNumeroCuenta();
    document.getElementById('dlg2').showModal();
});

const btnCerrar2 = document.getElementById('cerrar-dlg2');
btnCerrar2.addEventListener("click", () => {
    const dlg2 = document.getElementById('dlg2');
    dlg2.close();
});

/*-----------------------------------------------------------------------*/

//Vamos a definir los botones (JONIER)




/*-----------------------------------------------------------------------*/