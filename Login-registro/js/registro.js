//ESTE CODIGO ES SOLO POR EL MOMENTO QUE NO TENEMOS LA BD
export class registro{
    #Usuario;
    #contraseña;
    #ConfirmarContraseña;
    #direccion;
    #vectorBase;
    constructor(Usuario='',contraseña='',Ccontraseña='',direccion='',vectorBase=[]){
        this.#Usuario = Usuario;
        this.#contraseña = contraseña;
        this.#ConfirmarContraseña = Ccontraseña;
        this.#direccion = direccion;
        this.#vectorBase = vectorBase;
    }
    actualizarDatos(){
        //PASAMOS LOS DATOS A NUEVAS VARIABLES PARA QUE NO SE PIERDAN
        let Vect = [];
        const usuario = this.#Usuario.trim(); //PARA QUITAR LOS ESPACIOS
        const contraseña = this.#contraseña;
        const confirContraseña = this.#ConfirmarContraseña;
        const dir = this.#direccion.trim();

        //Valores falsy: false, 0, 0n, '', null, undefined,NaN. si usuario = '', !usuario = true
        //De lo contrario se llama truthy

        if(!usuario || !dir){

            //throw new error 
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
        }
        //Para comparar si es un numero
        if(indice < 0){
            //Error por consola
            throw new error ("indice invalido");
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