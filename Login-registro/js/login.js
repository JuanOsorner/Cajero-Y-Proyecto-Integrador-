export class login{
    #DireccionCorreo;
    #Contraseña;
    constructor(direccionCorreo,contraseña){
        this.#DireccionCorreo = direccionCorreo;
        this.#Contraseña = contraseña;
    }
    getDireccion(){
        return this.#DireccionCorreo;
    }
    setDireccion(direcC){
        this.#DireccionCorreo = direcC;
    }
    getContraseña(){
        return this.#Contraseña;
    }
    setContraseña(Contraseña){
        this.#Contraseña = Contraseña;
    }
    seguridad1(dato1){
        let valorB1 = false;
        if(this.#DireccionCorreo!=dato1){
            alert("El correo no existe")
        }else{
            valorB1 = true;
        }
        return valorB1;
    }
    seguridad2(dato2){
        let valorB2 = false;
        if(this.#Contraseña!=dato2){
            alert("La contraseña no existe")
        }else{
            valorB2 = true;
        }
        return valorB2;
    }
}