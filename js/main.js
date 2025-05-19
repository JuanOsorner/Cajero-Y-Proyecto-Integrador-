import { Cuenta } from "./Cuenta.js"; //POR FAVOR INSERTAR EL .js

const cuenta = new Cuenta('1000222',10000,[]);

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