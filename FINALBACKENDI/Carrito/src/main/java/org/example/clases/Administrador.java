package org.example.clases;

public class Administrador {
    private Integer id; // Cambiado a Integer para consistencia y posible null en BD
    private String nombre;
    private String correo;

    public Administrador(Integer id, String nombre, String correo) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
    }

    // Getters y setters
    public Integer getId() { return id; }
    public String getNombre() { return nombre; }
    public String getCorreo() { return correo; }

    public void setId(Integer id) { this.id = id; } // Setter para ID, útil si la BD asigna el ID
    public void setNombre(String nombre) { this.nombre = nombre; }
    public void setCorreo(String correo) { this.correo = correo; }

    @Override
    public String toString() {
        return "Administrador{id=" + id + ", nombre='" + nombre + "', correo='" + correo + "'}";
    }
}