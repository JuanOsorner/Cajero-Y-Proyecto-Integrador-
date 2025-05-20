import { CuentaCorriente } from "./CuentaCorriente";

const botonConsignar = document.getElementById('btn-consignar-dinero');
const ccorriente = new CuentaCorriente();
const dl1 = document.getElementById('dl1');
const botonRetirar1 = document.getElementById('btn-retirar-dinero');

botonRetirar1.addEventListener('click', () => {
    const monto = document.getElementById('monto-retiro'); // Captura el monto a retirar
    ccorriente.retirar(76686); 
});

botonConsignar.addEventListener('click', () => {
    const monto = document.getElementById('monto-consignar'); // Captura el monto a consignar
    alert(ccorriente.consignar(46445));
}); 

document.getElementById('Volver1').addEventListener('click', () => dl1.close());
