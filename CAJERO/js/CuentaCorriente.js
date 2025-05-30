import { Cuenta } from "./Cuenta.js";

export class CuentaCorriente extends Cuenta {
  #limiteSobregiro;

  constructor(numero = '', saldo = 0, movimientos = [], limiteSobregiro = 0) {
    super(numero, saldo, movimientos);
    this.#limiteSobregiro = limiteSobregiro;
  }

  retirar(monto = 0) {
    const saldoActual = this.getSaldo();
    if (monto > 0 && monto <= saldoActual + this.#limiteSobregiro) {
      this.setSaldo(saldoActual - monto);
      this.registrarMovimientos('Retiro', monto);
      return `Retiro exitoso. Nuevo saldo: ${this.getSaldo()}`;
    } else if (monto <= 0) {
      alert("El monto del retiro debe ser mayor que cero.");
    } else {
      alert("Error: Monto excede el límite de sobregiro permitido.");
    }
  }

  consignar(monto = 0) {
    if (monto > 0) {
      const saldoActual = this.getSaldo();
      this.setSaldo(saldoActual + monto);
      this.registrarMovimientos('Consignación', monto);
      return `Consignación exitosa. Nuevo saldo: ${this.getSaldo()}`;
    } else {
      alert("El monto de la consignación debe ser mayor que cero.");
    }
  }
}
