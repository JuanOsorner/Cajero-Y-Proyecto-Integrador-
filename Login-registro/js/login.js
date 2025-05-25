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
}