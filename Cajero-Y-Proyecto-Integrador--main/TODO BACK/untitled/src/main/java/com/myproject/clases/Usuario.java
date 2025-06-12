package main.java.com.myproject.clases;

public class Usuario {
    private int id;
    private String nombre;
    private String correo;
    private String contraseña;

    public Usuario() {
    }

    public Usuario(String nombre, String correo, String contraseña) {
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
    }

    public Usuario(int id, String nombre, String correo, String contraseña) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getContraseña() { return contraseña; }
    public void setContraseña(String contraseña) { this.contraseña = contraseña; }

    public boolean iniciarSesion(String correo, String contraseña) {
        System.out.println("DEBUG: Intentando iniciar sesión para: " + correo);
        return this.correo.equals(correo) && this.contraseña.equals(contraseña);
    }

    public void registrarse() {
        System.out.println("DEBUG: Registrando usuario: " + this.nombre);
    }

    @Override
    public String toString() {
        return "Usuario [ID: " + id + ", Nombre: " + nombre + ", Correo: " + correo + "]";
    }
}
