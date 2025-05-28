import { SimularBd } from "./SimularBd.js";
export class Usuario{
    #id;
    #nombre;
    #correo;
    #contraseña;
    constructor(Id='',Nombre='',Correo='',Contraseña=''){
        this.#id = Id;
        this.#nombre = Nombre;
        this.#correo = Correo;
        this.#contraseña = Contraseña;
    }
    getId(){
        return this.#id;
    }
    setId(Id){
        this.#id = Id;
    }
    getNombre(){
        return this.#nombre;
    }
    setNombre(Nombre){
        this.#nombre = Nombre;
    }
    getCorreo(){
        return this.#correo;
    }
    setCorreo(Correo){
        this.#correo = Correo;
    }
    getContraseña(){
        return this.#contraseña;
    }
    setContraseña(Contraseña){
        this.#contraseña = Contraseña;
    }
    IniciarSesion(correo, contraseña){
        
    }
    //Usaremos el operador ...
    Registrarse(Nombre,Correo,Contraseña,ConfirmarC){
        let V = [];
        if(Contraseña==ConfirmarC){
            console.log(SimularBd.insertDatos(V.push(Nombre,Correo,Contraseña)));
        }else{
            alert("Las contraseñas no coinciden");
        }
    }
}