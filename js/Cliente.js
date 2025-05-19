import { Cuenta } from "./Cuenta.js";
export class Cliente extends Cuenta{
    #nombre;
    #apellido;
    #direccion;
    #identificacion;
    #cuenta;
  constructor(nombre='', apellido='', direccion='', identificacion='',cuenta = true) {
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#direccion = direccion;
    this.#identificacion = identificacion;
    this.#cuenta = cuenta; // Se asigna luego
  }
  generarNumeroCuenta() {
    // Simula número de cuenta aleatorio de 10 dígitos
    const numero = Math.floor(1000000000 + Math.random() * 9000000000);
  }
}
