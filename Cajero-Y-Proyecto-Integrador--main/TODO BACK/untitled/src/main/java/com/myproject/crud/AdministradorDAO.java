package main.java.com.myproject.crud;

import com.myproject.clases.Administrador;
import com.myproject.clases.Usuario;
import com.myproject.clases.Producto;

public class AdministradorDAO extends UsuarioDAO {
    public void registrarAdministrador(Administrador admin) {
        System.out.println("CRUD: Registrando nuevo administrador como usuario: " + admin.getNombre());
        super.createUsuario(admin);
    }

    public void eliminarUsuarioComoAdmin(int idUsuario) {
        System.out.println("CRUD: Administrador intentando eliminar usuario con ID: " + idUsuario);
        super.deleteUsuario(idUsuario);
    }

    public void agregarProductoComoAdmin(Producto producto) {
        System.out.println("CRUD: Administrador intentando agregar producto: " + producto.getNombre());
        ProductoDAO productoDAO = new ProductoDAO();
        productoDAO.createProducto(producto);
    }
}
