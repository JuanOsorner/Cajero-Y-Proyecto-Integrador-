package org.example;


public class Main {
    public static void main(String[] args) {
        class Producto {

            // Atributos privados

            private int id;
            private String nombre;
            private double precio;
            private int stock;

            // Constructor

            public Producto(int id, String nombre, double precio, int stock) {
                this.id = id;
                this.nombre = nombre;
                this.precio = precio;
                this.stock = stock;
            }

            // Metodo para actualizar el stock
            public void actualizarStock(int cantidad) {
                this.stock += cantidad;
            }

            // Metodos getters (opcional, para acceder a los datos)
            public int getId() { return id; }
            public String getNombre() { return nombre; }
            public double getPrecio() { return precio; }
            public int getStock() { return stock; }

            // Metodo toString para mostrar el producto
            @Override
            public String toString() {
                return "Producto{id=" + id + ", nombre='" + nombre + "', precio=" + precio + ", stock=" + stock + "}";
            }
        }

    }
}