public class Administrador {
    private int id;
    private String nombre;
    private String correo;

    public Administrador(int id, String nombre, String correo) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
    }

    // Getters y setters
    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public String getCorreo() { return correo; }

    public void setNombre(String nombre) { this.nombre = nombre; }
    public void setCorreo(String correo) { this.correo = correo; }

    @Override
    public String toString() {
        return "Administrador{id=" + id + ", nombre='" + nombre + "', correo='" + correo + "'}";
    }
}
