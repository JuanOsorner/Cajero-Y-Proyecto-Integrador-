package org.example;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ProductoDAO dao = new ProductoDAO();
        int opcion;

        do {
            System.out.println("\n--- CRUD PRODUCTOS ---");
            System.out.println("1. Insertar producto");
            System.out.println("2. Mostrar productos");
            System.out.println("3. Actualizar producto");
            System.out.println("4. Eliminar producto");
            System.out.println("0. Salir");
            System.out.print("Opción: ");
            opcion = sc.nextInt();

            switch (opcion) {
                case 1 -> {
                    System.out.print("ID: ");
                    int id = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Nombre: ");
                    String nombre = sc.nextLine();
                    System.out.print("Precio: ");
                    double precio = sc.nextDouble();
                    dao.insertarProducto(new Producto(id, nombre, precio));
                }
                case 2 -> {
                    List<Producto> productos = dao.obtenerTodos();
                    productos.forEach(System.out::println);
                }
                case 3 -> {
                    System.out.print("ID del producto: ");
                    int id = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Nuevo nombre: ");
                    String nombre = sc.nextLine();
                    System.out.print("Nuevo precio: ");
                    double precio = sc.nextDouble();
                    dao.actualizarProducto(new Producto(id, nombre, precio));
                }
                case 4 -> {
                    System.out.print("ID a eliminar: ");
                    int id = sc.nextInt();
                    dao.eliminarProducto(id);
                }
                case 0 -> System.out.println("👋 Saliendo...");
                default -> System.out.println("❗ Opción inválida.");
            }
        } while (opcion != 0);
    }
}
