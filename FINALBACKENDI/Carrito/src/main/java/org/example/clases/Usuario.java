package org.example.clases;

public class Usuario {
    private Integer id;
    private String nombre;
    private String correo;
    private String contraseña;

    public Usuario(Integer id, String nombre, String correo, String contraseña) {
        this.id = id;
        this.nombre = nombre;
        // Validamos el correo al crear el usuario
        if (correo != null && correo.contains("@")) {
            this.correo = correo;
        } else {
            System.out.println("Error: El correo debe contener '@'.");
            this.correo = null; // O podrías lanzar una excepción
        }
        this.contraseña = contraseña;
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
        // Validamos el correo al actualizarlo
        if (correo != null && correo.contains("@")) {
            this.correo = correo;
        } else {
            System.out.println("Error: El correo debe contener '@'.");
            this.correo = null; // O podrías lanzar una excepción
        }
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public boolean iniciarSesion(String correo, String contraseña) {
        if (this.correo != null && this.correo.equals(correo) && this.contraseña != null && this.contraseña.equals(contraseña)) {
            System.out.println("Inicio de sesión exitoso para: " + this.nombre);
            return true;
        } else {
            System.out.println("Correo o contraseña incorrectos.");
            return false;
        }
    }

    public boolean registrarse() {
        if (this.nombre != null && !this.nombre.isEmpty() &&
                this.correo != null && !this.correo.isEmpty() && this.correo.contains("@") &&
                this.contraseña != null && !this.contraseña.isEmpty()) {
            System.out.println("Usuario " + this.nombre + " registrado exitosamente.");
            // Aquí iría la lógica para guardar el usuario en una base de datos.
            return true;
        } else {
            System.out.println("Error al registrar: Faltan datos esenciales (nombre, correo o contraseña).");
            return false;
        }
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", correo='" + correo + '\'' +
                '}'; // No mostrar contraseña por seguridad
    }
}