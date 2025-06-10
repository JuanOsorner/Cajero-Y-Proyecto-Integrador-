package main.java.com.myproject.clases;

public class Producto {
    private int id;
    private String nombre;
    private double precio;
    private int stock;

    public Producto() {
    }

    public Producto(String nombre, double precio, int stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    public Producto(int id, String nombre, double precio, int stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public double getPrecio() { return precio; }
    public void setPrecio(double precio) { this.precio = precio; }
    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public void actualizarStock(int cantidad) {
        this.stock += cantidad;
        System.out.println("DEBUG: Stock de '" + nombre + "' actualizado a: " + this.stock);
    }

    @Override
    public String toString() {
        return "Producto [ID: " + id + ", Nombre: " + nombre + ", Precio: " + String.format("%.2f", precio) + ", Stock: " + stock + "]";
    }
}
