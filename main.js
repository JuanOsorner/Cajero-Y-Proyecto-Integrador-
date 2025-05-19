import { CuentaAhorros } from './Cuentaahorros.js';

const cuenta = new CuentaAhorros(1000); // saldo inicial de prueba

document.addEventListener("DOMContentLoaded", () => {
  // Botón de retirar dinero
  const btnRetirar = document.getElementById("btn-retirar-dinero");
  btnRetirar.addEventListener("click", () => {
    const monto = parseFloat(prompt("¿Cuánto deseas retirar?"));
    cuenta.retirar(monto);
  });

  // Botón de depositar dinero
  const btnDepositar = document.getElementById("btn-depositar-dinero");
  btnDepositar.addEventListener("click", () => {
    const monto = parseFloat(prompt("¿Cuánto deseas depositar?"));
    cuenta.depositar(monto);
  });

  // Botón de transferir dinero
  const btnTransferir = document.getElementById("btn-transferir-dinero");
  btnTransferir.addEventListener("click", () => {
    const destino = prompt("Ingresa la cuenta destino (11 dígitos):");
    const monto = parseFloat(prompt("¿Cuánto deseas transferir?"));
    cuenta.Transferencia(destino, monto);
  });

  // Botón de cerrar el diálogo de saldo
  const btnCerrar = document.getElementById("cerrar");
  btnCerrar.addEventListener("click", () => {
    document.getElementById("dlg").close();
  });
});

