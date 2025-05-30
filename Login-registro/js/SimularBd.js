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
    static compararDatos(Dato1,Dato2){
        let U = [Dato1,Dato2];
        //Esta parte del texto se explica abajo en (*)
        const vectorStr = JSON.stringify(U);
        let valor = false;
        if(this.V.some(fila => JSON.stringify(fila)===vectorStr)){
            valor = true;
        }else{
            alert("Usuario o contraseña incorrectos")
        }
        return valor;
    }
}
//Debemos encontrar una manera de crear una tabla continua
/*
(*) JSON (JavaScript Object Notation) es un formato de texto ligero y fácil de leer para almacenar e 
intercambiar datos estructurados. Aunque su sintaxis se basa en JavaScript, es independiente del lenguaje 
y ampliamente compatible con muchos otros, como Python, Java, PHP y más

JSON.stringify() sirve para convertir un objeto en una cadenas JSON
*/