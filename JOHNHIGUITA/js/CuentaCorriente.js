import {CuentaCorriente} from ".CuentaCorriente";

export class CuentaCorriente{
    #limiteSobregiro;
    constructor(limiteSobregiro = 0) {
        super(numeroCuenta, saldo); // Llamo al constructor de la súper clase (Cuenta)
        this.#limiteSobregiro = limiteSobregiro; // Límite de sobregiro
    }

    // Método para retirar dinero
    retirar(monto) {
        document.getElementById('dl1').showModal();
        if (monto <= this.saldo + this.#limiteSobregiro) {
            this.saldo -= monto; // Resta el monto del saldo
            return `Retiro exitoso. Nuevo saldo: ${this.saldo}`;
        } else {
            alert('Error: Monto excede el límite de sobregiro permitido.');
        }
    }

    // Método para consignar dinero
    consignar(monto) {
        this.saldo += monto; // Aumenta el saldo
        return `Consignación exitosa. Nuevo saldo: ${this.saldo}`;
    }
}
