export class SimularBd{
    static insertDatos(Datos=[]){
        //Usemos V.includes();
        let V =[];
        //.some nos sirve para mandar un boolean si encuentra que en el vector hay almenos un string vacios
        //Super importante
        if(!Datos.some(e => typeof e === "string" && e.trim()==="")){
            V.push(Datos);
        }else{
            alert("Complete todos los campos");
        }
        return V;
    }
}
//Debemos encontrar una manera de crear una tabla continua