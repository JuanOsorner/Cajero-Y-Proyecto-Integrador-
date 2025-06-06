public class Usuario {
    private Integer id;
    private String nombre;
    private String correo;
    private String contraseña;
    public Usuario(Integer id, String nombre, String correo, String contraseña){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
        boolean valor = false;
        for(int i = 0; i<correo.length();i++){
            if(correo.charAt(i)=='@') {
                valor = true;
            }
        }
        if(!valor){
            System.out.println("Ingrese @");
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public String[] iniciarSesion(String correo, String contraseña, String Ccontraseña){
        String[] vector = {};
        if(contraseña != Ccontraseña){
            System.out.println("Las contraseñas no coinciden");
        }else{
            vector[0]=correo;
            vector[1]=contraseña;
        }
        return vector;
    }

    public void registrase(){
        
    }
}