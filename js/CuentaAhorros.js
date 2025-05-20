import { Cuenta } from "./Cuenta.js";
export class CuentaAhorros extends Cuenta{
    #interesMensual;
    constructor(interes=0) {
      this.#interesMensual = interes;
    }    
    depositar(monto = 0) {
      if (monto > 0) {
        this.getSaldo() = + monto;
      } else {
        alert("el monto debe ser mayor a cero")
      }
    }
  
    retirar(monto = 0) {
      document.getElementById('d1').showModal();
      if (monto > 0 && monto <= this.saldo) {
        this.saldo = this.saldo - monto;
      } else if (monto <= 0) {
        alert("El monto del retiro debe ser mayor que cero.");
      } else {
        alert("No hay suficiente saldo para retirar esa cantidad.");
      }
    }

    Transferencia(destino = '', monto = 0){
      if(monto > 0 && monto <= this.saldo && destino.length == 11){
        this.saldo = this.saldo - monto;
      } else if(monto <=0){
        alert('La cantidad a trenferir debe ser mayor a cero')
      } else if(monto> this.saldo) {
        alert('No tienes suficiente dinero pobre de mierda')
      }else{
        alert('el producto de destino no existe')
      }
    }
}