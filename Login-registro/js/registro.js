import { login } from "./login.js";
export class registro extends login{
    #Usuario;
    #contraseña;
    #ConfirmarContraseña;
    #direccion;
    #vectorBase;
    constructor(direccion='',contraseña='',Usuario='',Ccontraseña='',vectorBase=[]){
        super(direccion,contraseña);
        this.#Usuario = Usuario;
        this.#ConfirmarContraseña = Ccontraseña;
        this.#vectorBase = vectorBase;
    }

    getUsuario(){
        return this.#Usuario;
    }
    setUsuario(Usuario){
        this.#Usuario = Usuario;
    }
    getCContraseña(){
        return this.#ConfirmarContraseña;
    }
    setCContraseña(confirContra){
        this.#ConfirmarContraseña = confirContra;
    }

    actualizarDatos(){
        //PASAMOS LOS DATOS A NUEVAS VARIABLES PARA QUE NO SE PIERDAN
        let Vect = [];
        const usuario = this.#Usuario.trim(); //PARA QUITAR LOS ESPACIOS
        const contraseña = this.getContraseña();
        const confirContraseña = this.#ConfirmarContraseña;
        const dir = this.getDireccion().trim();

        //Valores falsy: false, 0, 0n, '', null, undefined,NaN. si usuario = '', !usuario = true
        //De lo contrario se llama truthy

        if(!usuario || !dir){
            alert("❗❗No se han ingresado los datos❗❗");
        }else{
            Vect.push(usuario,dir);
        }
        if(contraseña!=confirContraseña){
            alert("❗❗Las contraseñas no coinciden❗❗")
        }else{
            Vect.push(contraseña);
        }

        return Vect;
    }
    guardarDatos(index,dato=[]){
        const indice = Number(index);
        //Aprovechemos Array.isArray
        if(dato.length != 3){
            alert("❗❗❗No hay datos para guardar❗❗❗");
        }else{
            alert("DATOS GUARDADOS")
        }
        this.#vectorBase = dato;
        return this.#vectorBase;
    }
}
//RECOMENDACION DE CHATGPT NO ABUSAR MUCHO DE LOS ALERTS 
    /*
    (CODIGO VIEJO)
    actualizarDatos(){
        let V = [];
        if(this.#idUsuario !='' && this.#contraseña !='' && this.#direccion !='' && this.#contraseña!=this.#ConfirmarContraseña){
            alert("Actualizado");
            V.push(this.#idUsuario,this.#contraseña,this.#direccion);
        }else{
            alert("No se han hecho actualizaciones");
        }
        return V;
    }
    
    guardarDatos(V=[],x=0){
        if(V.length!=0){
            this.#vectorBase[x]=V;
        }
        return this.#vectorBase;
    }
    */