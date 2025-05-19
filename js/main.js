import { Cuenta } from "./Cuenta";

const cuenta = new Cuenta('1000222',0,[]);

//Vamos a definir los botones del html (OSORNER)

const btnConsultar = document.getElementById('btn-top-consultar');

const dlg = document.getElementById('dlg');
btnConsultar.addEventListener('click',()=>{
    dlg.showModal();
    cuenta.consultarSaldo();
});

const btnCerrar = document.getElementById('cerrar');
btnCerrar.addEventListener('click',()=>{
    dlg.close();
});

const btnRegistrar = document.getElementById('btn-top-registrar');
btnRegistrar.addEventListener('click',()=>{
    cuenta.registrarMovimientos('CONSIGNACIÓN',1000);
});

const btnCerrar1 = document.getElementById('cerrar');
btnCerrar1.addEventListener('click',()=>{
    const dlg1 = document.getElementById('dlg1');
    dlg1.close();
});