export class SimularBd{
    //Para que no se borren los datos simplemente es bueno declarar el vector por fuera
    static V = [];
    static insertDatos(Datos=[]){
        //Usemos V.includes();
        //.some nos sirve para mandar un boolean si encuentra que en el vector hay almenos un string vacios
        //Super importante
        if(!Datos.some(e => typeof e === "string" && e.trim()==="")){
            this.V.push(Datos);
            alert("PERFIL CREADO");

        }else{
            alert("Complete todos los campos");
        }
        return this.V;
    }
    //Usamos includes
    static compararDatos(Dato1,Dato2){
        let U = [];
        U.push(Dato1);
        U.push(Dato2);
        let valor = false;
        if(this.V.some(fila => JSON.stringify(fila) === U)){
            valor = true;
        }else{
            alert("Usuario o contraseña incorrectos")
        }
        return valor;
    }
}
//Debemos encontrar una manera de crear una tabla continua