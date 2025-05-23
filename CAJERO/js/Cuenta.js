export class Cuenta{
    #numero;
    #saldo;
    #movimientos;
    //HACEMOS UNA TIPACIÓN DE LOS ATRIBUTOS
    constructor(numero = '', saldo=0, movimientos =[]){
        this.#numero = numero;
        this.#saldo = saldo;
        this.#movimientos = movimientos;
    }

    getNumero(){
        return this.#numero;
    }

    setNumero(numero=''){
        this.#numero = numero;
    }

    getSaldo(){
        return this.#saldo;
    }

    setSaldo(saldo=0){
        this.#saldo = saldo;
    }

    //Lo ideal seria aplicar el modal (HAY QUE INVESTIGAR)
    consultarSaldo(){
        if(this.#saldo===0){
            alert("Por favor deposite dinero en la cuenta");
        }else if(this.#saldo<0){
            alert("Usted debe dinero al Banco");
        }else{
            //SUPERIMPORTANTE
            document.getElementById('saldoU').textContent = "Su saldo es de: "+this.#saldo;
            const dlg = document.getElementById('dlg');
            dlg.showModal();
        }
    }
    //ESTO ES SUPER IMPORTANTE
    //Asi tipamos en JS
    //Aprovechamos el insertRow y el insertCell
    //-1 siempre es n-1 modulo n
    registrarMovimientos(tipo="",monto=0){
        if(tipo === "" || monto===0){
            alert("NO SE HA REALIZADO MOVIMIENTOS");
            alert("INGRESE EL TIPO Y EL MONTO");
        }else{
            this.#movimientos.push(tipo,monto);
            const tabla1 = document.getElementById('tabla1');
            const fila = tabla1.insertRow(-1);
            const celda1 = fila.insertCell(-1);
            celda1.textContent = tipo;
            const celda2 = fila.insertCell(-1);
            celda2.textContent = monto;
        }
    }
    //Intentando hacer funcionar esto.
    consultarMovimientos(){
        document.getElementById('dlg1').showModal();
    }
}

//showmodal()
//insertRow(index) (añadir -1 para ponerlo en el final)
//cell.textContent
//COMENTARIO GITHUB POR OSORNO
//HolaHiguita