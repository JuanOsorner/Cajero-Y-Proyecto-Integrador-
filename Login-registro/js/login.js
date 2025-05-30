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
    IniciarSesion(dato1){
        let valorB1 = false;
        if(this.#DireccionCorreo == dato1){
            valorB1 = true;
        }
        return valorB1;
    }
    CerrarSesion(dato2){
        let valorB2 = false;
        if(this.#Contraseña = dato2){
            valorB2 = true;
        }
        return valorB2;
    }
}