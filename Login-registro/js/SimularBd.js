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
    //Muchas veces es mejor volver a los origenes
    static compararDatos(Dato1,Dato2){
        let valor = false;
        for(let i = 0; i<this.V.length;i++){
            if(this.V[i][1]===Dato1 && this.V[i][2]===Dato2){
                valor = true;
                break;
            }
        }
        return valor;
    }
}
//Debemos encontrar una manera de crear una tabla continua
