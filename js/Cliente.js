import { Cuenta } from "./Cuenta.js";
export class Cliente extends Cuenta{
    #nombre;
    #apellido;
    #direccion;
    #identificacion;
    #cuenta;
  constructor(nombre='', apellido='', direccion='', identificacion='',cuenta = true) {
    super(numero,saldo,movimientos);
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#direccion = direccion;
    this.#identificacion = identificacion;
    this.#cuenta = cuenta; // Se asigna luego
  }
  modificar(dato=0,cambio=''){
    if(cambio==''){
        alert("NO SE HA REALIZADO NINGUN CAMBIO");
    }else{
        switch(dato){
            case 1:
                this.#nombre = cambio;
            break;
            case 2:
                this.#apellido = cambio;
            break;
            case 3:
                this.#direccion = cambio;
            break;
            case 4:
                this.#identificacion = cambio;
            break;
            default:
                alert("NO SE HA MODIFICADO NINGUN DATO");
            break;
        }
    }
    return cambio;
  }
  generarNumeroCuenta() {
    // Simula número de cuenta aleatorio de 10 dígitos
    numero = Math.floor(1000000000 + Math.random() * 9000000000);
  }
}
