export class SimularBd{
    static insertDatos(Datos){
        //Usemos V.includes();
        let V =[];
        if(!V.includes('')){
            if(V.includes(Datos)){
                alert("Los datos ya existen");
            }else{
                V.push(Datos);
            }
        }else{
            alert("Complete todos los campos");
        }
        let U = [...V];
        return U;
    }
}