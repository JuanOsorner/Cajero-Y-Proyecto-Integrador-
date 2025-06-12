package org.example;

import org.example.clases.Administrador;
import org.example.clases.Producto;
import org.example.clases.Usuario;
import org.example.clasesCrud.AdministradorCRUD;
import org.example.clasesCrud.ProductoDAO;
import org.example.clasesCrud.UsuarioCRUD;

import java.util.InputMismatchException;
import java.util.List;
import java.util.Scanner;

public class Main {
    private static final Scanner sc = new Scanner(System.in);
    private static final ProductoDAO productoDAO = new ProductoDAO();
    private static final UsuarioCRUD usuarioCRUD = new UsuarioCRUD();
    private static final AdministradorCRUD administradorCRUD = new AdministradorCRUD();

    public static void main(String[] args) {
        int opcionPrincipal;

        do {
            System.out.println("\n--- GESTIÓN DE LA TIENDA ---");
            System.out.println("1. Gestionar Productos");
            System.out.println("2. Gestionar Usuarios");
            System.out.println("3. Gestionar Administradores");
            System.out.println("0. Salir");
            System.out.print("Seleccione una opción: ");

            opcionPrincipal = leerEntero();

            switch (opcionPrincipal) {
                case 1 -> gestionarProductos();
                case 2 -> gestionarUsuarios();
                case 3 -> gestionarAdministradores();
                case 0 -> System.out.println("👋 Saliendo de la aplicación...");
                default -> System.out.println("❗ Opción inválida. Por favor, intente de nuevo.");
            }
        } while (opcionPrincipal != 0);

        sc.close();
    }

    private static int leerEntero() {
        while (true) {
            try {
                return sc.nextInt();
            } catch (InputMismatchException e) {
                System.out.println("❗ Entrada inválida. Por favor, ingrese un número entero.");
                sc.next(); // Consumir la entrada inválida
                System.out.print("Opción: ");
            } finally {
                sc.nextLine(); // Limpiar el buffer del scanner
            }
        }
    }

    private static double leerDouble() {
        while (true) {
            try {
                return sc.nextDouble();
            } catch (InputMismatchException e) {
                System.out.println("❗ Entrada inválida. Por favor, ingrese un número decimal.");
                sc.next(); // Consumir la entrada inválida
                System.out.print("Opción: ");
            } finally {
                sc.nextLine(); // Limpiar el buffer del scanner
            }
        }
    }

    private static void gestionarProductos() {
        int opcion;
        do {
            System.out.println("\n--- CRUD PRODUCTOS ---");
            System.out.println("1. Insertar producto");
            System.out.println("2. Mostrar productos");
            System.out.println("3. Actualizar producto");
            System.out.println("4. Eliminar producto");
            System.out.println("0. Volver al menú principal");
            System.out.print("Opción: ");
            opcion = leerEntero();

            switch (opcion) {
                case 1 -> {
                    System.out.print("ID del producto: ");
                    int id = leerEntero();
                    System.out.print("Nombre del producto: ");
                    String nombre = sc.nextLine();
                    System.out.print("Precio del producto: ");
                    double precio = leerDouble();
                    productoDAO.insertarProducto(new Producto(id, nombre, precio));
                }
                case 2 -> {
                    List<Producto> productos = productoDAO.obtenerTodos();
                    if (productos.isEmpty()) {
                        System.out.println("No hay productos registrados.");
                    } else {
                        productos.forEach(System.out::println);
                    }
                }
                case 3 -> {
                    System.out.print("ID del producto a actualizar: ");
                    int id = leerEntero();
                    Producto productoExistente = productoDAO.obtenerPorId(id);
                    if (productoExistente != null) {
                        System.out.print("Nuevo nombre del producto (" + productoExistente.getNombre() + "): ");
                        String nombre = sc.nextLine();
                        System.out.print("Nuevo precio del producto (" + productoExistente.getPrecio() + "): ");
                        double precio = leerDouble();
                        productoDAO.actualizarProducto(new Producto(id, nombre, precio));
                    } else {
                        System.out.println("❗ Producto con ID " + id + " no encontrado.");
                    }
                }
                case 4 -> {
                    System.out.print("ID del producto a eliminar: ");
                    int id = leerEntero();
                    productoDAO.eliminarProducto(id);
                }
                case 0 -> System.out.println("Volviendo al menú principal...");
                default -> System.out.println("❗ Opción inválida.");
            }
        } while (opcion != 0);
    }

    private static void gestionarUsuarios() {
        int opcion;
        do {
            System.out.println("\n--- CRUD USUARIOS ---");
            System.out.println("1. Registrar nuevo usuario");
            System.out.println("2. Mostrar todos los usuarios");
            System.out.println("3. Actualizar usuario");
            System.out.println("4. Eliminar usuario");
            System.out.println("5. Iniciar sesión (ejemplo)");
            System.out.println("0. Volver al menú principal");
            System.out.print("Opción: ");
            opcion = leerEntero();

            switch (opcion) {
                case 1 -> {
                    // ID se genera automáticamente en la BD, se envía null inicialmente
                    System.out.print("Nombre del usuario: ");
                    String nombre = sc.nextLine();
                    System.out.print("Correo del usuario: ");
                    String correo = sc.nextLine();
                    System.out.print("Contraseña del usuario: ");
                    String contrasena = sc.nextLine();
                    usuarioCRUD.insertarUsuario(new Usuario(null, nombre, correo, contrasena));
                }
                case 2 -> {
                    List<Usuario> usuarios = usuarioCRUD.obtenerTodosLosUsuarios();
                    if (usuarios.isEmpty()) {
                        System.out.println("No hay usuarios registrados.");
                    } else {
                        usuarios.forEach(System.out::println);
                    }
                }
                case 3 -> {
                    System.out.print("ID del usuario a actualizar: ");
                    int id = leerEntero();
                    Usuario usuarioExistente = usuarioCRUD.obtenerUsuarioPorId(id);
                    if (usuarioExistente != null) {
                        System.out.print("Nuevo nombre del usuario (" + usuarioExistente.getNombre() + "): ");
                        String nombre = sc.nextLine();
                        System.out.print("Nuevo correo del usuario (" + usuarioExistente.getCorreo() + "): ");
                        String correo = sc.nextLine();
                        System.out.print("Nueva contraseña del usuario (actual no mostrada): ");
                        String contrasena = sc.nextLine();
                        usuarioCRUD.actualizarUsuario(new Usuario(id, nombre, correo, contrasena));
                    } else {
                        System.out.println("❗ Usuario con ID " + id + " no encontrado.");
                    }
                }
                case 4 -> {
                    System.out.print("ID del usuario a eliminar: ");
                    int id = leerEntero();
                    usuarioCRUD.eliminarUsuario(id);
                }
                case 5 -> {
                    System.out.print("Correo para iniciar sesión: ");
                    String correo = sc.nextLine();
                    System.out.print("Contraseña: ");
                    String contrasena = sc.nextLine();
                    usuarioCRUD.iniciarSesion(correo, contrasena);
                }
                case 0 -> System.out.println("Volviendo al menú principal...");
                default -> System.out.println("❗ Opción inválida.");
            }
        } while (opcion != 0);
    }

    private static void gestionarAdministradores() {
        int opcion;
        do {
            System.out.println("\n--- CRUD ADMINISTRADORES ---");
            System.out.println("1. Crear nuevo administrador");
            System.out.println("2. Mostrar todos los administradores");
            System.out.println("3. Actualizar administrador");
            System.out.println("4. Eliminar administrador");
            System.out.println("0. Volver al menú principal");
            System.out.print("Opción: ");
            opcion = leerEntero();

            switch (opcion) {
                case 1 -> {
                    // ID se genera automáticamente en la BD, se envía null inicialmente
                    System.out.print("Nombre del administrador: ");
                    String nombre = sc.nextLine();
                    System.out.print("Correo del administrador: ");
                    String correo = sc.nextLine();
                    administradorCRUD.crearAdministrador(new Administrador(null, nombre, correo));
                }
                case 2 -> {
                    List<Administrador> administradores = administradorCRUD.obtenerTodos();
                    if (administradores.isEmpty()) {
                        System.out.println("No hay administradores registrados.");
                    } else {
                        administradores.forEach(System.out::println);
                    }
                }
                case 3 -> {
                    System.out.print("ID del administrador a actualizar: ");
                    int id = leerEntero();
                    Administrador adminExistente = administradorCRUD.obtenerPorId(id);
                    if (adminExistente != null) {
                        System.out.print("Nuevo nombre del administrador (" + adminExistente.getNombre() + "): ");
                        String nuevoNombre = sc.nextLine();
                        System.out.print("Nuevo correo del administrador (" + adminExistente.getCorreo() + "): ");
                        String nuevoCorreo = sc.nextLine();
                        administradorCRUD.actualizarAdministrador(new Administrador(id, nuevoNombre, nuevoCorreo));
                    } else {
                        System.out.println("❗ Administrador con ID " + id + " no encontrado.");
                    }
                }
                case 4 -> {
                    System.out.print("ID del administrador a eliminar: ");
                    int id = leerEntero();
                    administradorCRUD.eliminarAdministrador(id);
                }
                case 0 -> System.out.println("Volviendo al menú principal...");
                default -> System.out.println("❗ Opción inválida.");
            }
        } while (opcion != 0);
    }
}