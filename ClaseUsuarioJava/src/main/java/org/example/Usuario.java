package org.example;

import java.util.ArrayList;
import java.util.List;



public class Usuario {
    //Atributos
    private int id;
    private String nombre;
    private String correo;
    private String contrasena;
    private Carrito carrito;

    //Constructor


    public Usuario() {
    }

    public Usuario(int id, String nombre, String correo, String contrasena) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
        this.carrito = new Carrito();
    }

    // Getters y Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }


    //Metodo para iniciar sesión

    public boolean iniciarSesion(String correoIngresado, String contrasenaIngresada) {
        return this.correo.equals(correoIngresado) && this.contrasena.equals(contrasenaIngresada);
    }

    //Metodo para registrarse

    public void registrarse() {
        System.out.println("Usuario registrado con éxito: " + this.nombre);
    }

    // Simulación de productos disponibles

    public List<String> verProductos() {
        List<String> productos = new ArrayList<>();
        productos.add("Camiseta");
        productos.add("Gorra");
        productos.add("Mug");
        return productos;
    }

    // Ver contenido del carrito

    public Carrito verCarrito(){;
        return this.carrito;
    }
}

