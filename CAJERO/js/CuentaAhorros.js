import { Cuenta } from "./Cuenta.js";
export class CuentaAhorros extends Cuenta{
    #interesMensual;
    constructor(numero = '',saldo=0, movimientos=[],interes=0) {
      super(numero,saldo,movimientos);
      this.#interesMensual = interes;
    }    
    depositar(monto = 0) {
      if (monto > 0) {
        const nuevoSaldo = this.getSaldo() + monto;
        this.setSaldo(nuevoSaldo);
        this.registrarMovimientos('Depósito', monto);
      } else {
        alert("El monto debe ser mayor a cero");
      }
    }
    
    retirar(monto = 0) {
      const saldoActual = this.getSaldo();
      if (monto > 0 && monto <= saldoActual) {
        const nuevoSaldo = saldoActual - monto;
        this.setSaldo(nuevoSaldo);
        this.registrarMovimientos('Retiro', monto);
      } else if (monto <= 0) {
        alert("El monto del retiro debe ser mayor que cero.");
      } else {
        alert("No hay suficiente dinero para retirar tal cantidad");
      }
    }
    
    Transferencia(destino = '', monto = 0) {
      const saldoActual = this.getSaldo();
      if (monto > 0 && monto <= saldoActual && destino.length === 11) {
        const nuevoSaldo = saldoActual - monto;
        this.setSaldo(nuevoSaldo);
        this.registrarMovimientos('Transferencia', monto);
      } else if (monto <= 0) {
        alert('La cantidad a transferir debe ser mayor a cero');
      } else if (monto > saldoActual) {
        alert('No tienes suficiente dinero para realizar la transferencia');
      } else {
        alert('El producto de destino no existe');
      }
    }
}