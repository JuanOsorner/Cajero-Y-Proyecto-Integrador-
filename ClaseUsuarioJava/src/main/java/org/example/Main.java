package org.example;

public class Main {
    public static void main(String[] args) {
        Usuario usuario = new Usuario(1, "John", "johnhiguitamejia@gmail.com", "1234");
        usuario.registrarse();

        boolean acceso = usuario.iniciarSesion("johnhiguitamejia@gmail.com", "1234");
        System.out.println("Inicio de sesión: " + acceso);

        System.out.println("Productos disponibles:");
        for (String prod : usuario.verProductos()) {
            System.out.println("_ " + prod);
        }

        usuario.verCarrito().agregarProducto("Camiseta");
        usuario.verCarrito().agregarProducto("Mug");

        System.out.println("Carrito del usuario:");
        for (String item : usuario.verCarrito().getProductos()) {
            System.out.println("- " + item);
        }
    }
}
