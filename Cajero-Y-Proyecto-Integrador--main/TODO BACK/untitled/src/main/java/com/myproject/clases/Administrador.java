package main.java.com.myproject.clases;

import java.util.List;
import java.util.ArrayList;

public class Administrador extends Usuario {

    public Administrador() {
        super();
    }

    public Administrador(String nombre, String correo, String contraseña) {
        super(nombre, correo, contraseña);
    }

    public Administrador(int id, String nombre, String correo, String contraseña) {
        super(id, nombre, correo, contraseña);
    }

    public void gestionarInventario() {
        System.out.println("DEBUG: Administrador " + getNombre() + " gestionando inventario.");
    }

    public List<Usuario> verUsuarios() {
        System.out.println("DEBUG: Administrador " + getNombre() + " viendo lista de usuarios.");
        List<Usuario> usuariosSimulados = new ArrayList<>();
        usuariosSimulados.add(new Usuario(101, "Simulando Usuario 1", "user1@sim.com", "pass"));
        usuariosSimulados.add(new Usuario(102, "Simulando Usuario 2", "user2@sim.com", "pass"));
        return usuariosSimulados;
    }

    public void eliminarUsuario(int idUsuario) {
        System.out.println("DEBUG: Administrador " + getNombre() + " intentando eliminar usuario con ID: " + idUsuario);
    }

    public void agregarProducto(Producto producto) {
        System.out.println("DEBUG: Administrador " + getNombre() + " intentando agregar producto: " + producto.getNombre());
    }

    @Override
    public String toString() {
        return "Administrador [ID: " + getId() + ", Nombre: " + getNombre() + ", Correo: " + getCorreo() + "]";
    }
}
