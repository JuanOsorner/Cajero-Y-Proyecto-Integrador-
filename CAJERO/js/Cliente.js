import { Cuenta } from "./Cuenta.js";
export class Cliente extends Cuenta{
    #nombre;
    #apellido;
    #direccion;
    #identificacion;
    #cuenta;
  constructor(numero='', saldo=0, movimientos = [], nombre='', apellido='', direccion='', identificacion='',cuenta = true) {
    super(numero,saldo,movimientos);
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#direccion = direccion;
    this.#identificacion = identificacion;
    this.#cuenta = cuenta; 
  }
  modificar(dato=0,cambio=''){
    if(cambio==""){
        alert("NO SE HAN HECHO CAMBIOS");
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
                alert("NO SE HAN INGRESADO DATOS");
            break;
        }
    }
  }

  //(*) Para usar las variables protegidas toca ir a los getters and setters

  generarNumeroCuenta() {
    // Simula número de cuenta aleatorio de 10 dígitos
    let NumeroCuenta = Math.floor(1000000000 + Math.random() * 9000000000);
    this.setNumero(NumeroCuenta);
    return this.getNumero();
  }
}
