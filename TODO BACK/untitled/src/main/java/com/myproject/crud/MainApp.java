package main.java.com.myproject.crud;

import com.myproject.clases.Administrador;
import com.myproject.clases.Carrito;
import com.myproject.clases.Producto;
import com.myproject.clases.Usuario;

import java.util.List;

public class MainApp {

    public static void main(String[] args) {
        System.out.println("--- Iniciando aplicación de prueba básica ---");

        UsuarioDAO usuarioDAO = new UsuarioDAO();
        ProductoDAO productoDAO = new ProductoDAO();
        AdministradorDAO administradorDAO = new AdministradorDAO();

        System.out.println("\n=== Pruebas de Usuario ===");

        Usuario nuevoUsuario = new Usuario("Maria Lopez", "maria.lopez@email.com", "pass_maria");
        usuarioDAO.createUsuario(nuevoUsuario);
        System.out.println("Estado de nuevoUsuario después de crear: " + nuevoUsuario);

        Usuario usuarioRecuperado = usuarioDAO.getUsuarioById(nuevoUsuario.getId());
        if (usuarioRecuperado != null) {
            System.out.println("Usuario recuperado: " + usuarioRecuperado);
            System.out.println("Intento de login: " + usuarioRecuperado.iniciarSesion("maria.lopez@email.com", "pass_maria"));
        } else {
            System.out.println("Usuario con ID " + nuevoUsuario.getId() + " no encontrado.");
        }

        if (usuarioRecuperado != null) {
            usuarioRecuperado.setNombre("Maria Luisa Lopez");
            usuarioRecuperado.setContraseña("nueva_pass_maria");
            usuarioDAO.updateUsuario(usuarioRecuperado);
            System.out.println("Usuario actualizado (recargado de DB): " + usuarioDAO.getUsuarioById(usuarioRecuperado.getId()));
        }

        List<Usuario> todosLosUsuarios = usuarioDAO.getAllUsuarios();
        System.out.println("\nLista de todos los usuarios en la DB:");
        todosLosUsuarios.forEach(System.out::println);

        System.out.println("\n=== Pruebas de Producto ===");

        Producto nuevoProducto = new Producto("Audífonos Inalámbricos", 89.99, 30);
        productoDAO.createProducto(nuevoProducto);
        System.out.println("Estado de nuevoProducto después de crear: " + nuevoProducto);

        Producto productoRecuperado = productoDAO.getProductoById(nuevoProducto.getId());
        if (productoRecuperado != null) {
            System.out.println("Producto recuperado: " + productoRecuperado);
            productoRecuperado.actualizarStock(-5);
            productoDAO.updateProducto(productoRecuperado);
            System.out.println("Producto después de actualizar stock (recargado de DB): " + productoDAO.getProductoById(productoRecuperado.getId()));
        } else {
            System.out.println("Producto con ID " + nuevoProducto.getId() + " no encontrado.");
        }

        List<Producto> todosLosProductos = productoDAO.getAllProductos();
        System.out.println("\nLista de todos los productos en la DB:");
        todosLosProductos.forEach(System.out::println);

        System.out.println("\n=== Pruebas de Administrador ===");
        Administrador admin = new Administrador("Jefe Admin", "jefe@admin.com", "superpass");
        administradorDAO.registrarAdministrador(admin);
        System.out.println("Admin registrado: " + administradorDAO.getUsuarioById(admin.getId()));

        admin.gestionarInventario();
        List<Usuario> usuariosSimuladosPorAdmin = admin.verUsuarios();
        System.out.println("Admin ve usuarios (simulados):");
        usuariosSimuladosPorAdmin.forEach(System.out::println);

        System.out.println("\nAdmin realizando operaciones CRUD a través de DAO:");
        administradorDAO.eliminarUsuarioComoAdmin(nuevoUsuario.getId());
        administradorDAO.agregarProductoComoAdmin(new Producto("Monitor Curvo", 350.00, 15));

        System.out.println("\n=== Pruebas de Carrito ===");
        Carrito miCarrito = new Carrito(1);

        Producto pA = productoDAO.getProductoById(nuevoProducto.getId());
        Producto pB = new Producto(0, "Webcam HD", 45.00, 100);

        if (pA != null) {
            miCarrito.agregarProducto(pA);
        }
        miCarrito.agregarProducto(pB);

        System.out.println("Contenido actual del carrito:");
        miCarrito.getProductos().forEach(System.out::println);
        System.out.println("Total a pagar: $" + String.format("%.2f", miCarrito.calcularTotal()));

        miCarrito.eliminarProducto(pA.getId());
        System.out.println("Contenido después de eliminar un producto:");
        miCarrito.getProductos().forEach(System.out::println);
        System.out.println("Nuevo total: $" + String.format("%.2f", miCarrito.calcularTotal()));

        System.out.println("\n--- Limpieza de datos de prueba ---");
        if (nuevoProducto.getId() != 0) {
            productoDAO.deleteProducto(nuevoProducto.getId());
        }
        if (admin.getId() != 0) {
            usuarioDAO.deleteUsuario(admin.getId());
        }

        System.out.println("\n--- Fin de las pruebas ---");
    }
}
