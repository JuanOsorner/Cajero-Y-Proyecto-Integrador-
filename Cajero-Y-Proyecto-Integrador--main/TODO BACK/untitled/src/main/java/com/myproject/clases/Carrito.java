package main.java.com.myproject.clases;

import java.util.ArrayList;
import java.util.List;

public class Carrito {
    private int id;
    private List<Producto> productos;

    public Carrito() {
        this.productos = new ArrayList<>();
    }

    public Carrito(int id) {
        this();
        this.id = id;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public List<Producto> getProductos() { return productos; }
    public void setProductos(List<Producto> productos) { this.productos = productos; }

    public void agregarProducto(Producto p) {
        if (p != null && p.getStock() > 0) {
            this.productos.add(p);
            System.out.println("DEBUG: Producto '" + p.getNombre() + "' agregado al carrito en memoria.");
        } else {
            System.out.println("ERROR: No se pudo agregar el producto. Es nulo o no hay stock.");
        }
    }

    public void eliminarProducto(int idProducto) {
        boolean removed = this.productos.removeIf(p -> p.getId() == idProducto);
        if (removed) {
            System.out.println("DEBUG: Producto con ID " + idProducto + " eliminado del carrito en memoria.");
        } else {
            System.out.println("DEBUG: Producto con ID " + idProducto + " no encontrado en el carrito.");
        }
    }

    public double calcularTotal() {
        double total = 0.0;
        for (Producto p : productos) {
            total += p.getPrecio();
        }
        System.out.println("DEBUG: Total actual del carrito: " + String.format("%.2f", total));
        return total;
    }

    @Override
    public String toString() {
        return "Carrito [ID: " + id + ", Items: " + productos.size() + ", Total: " + String.format("%.2f", calcularTotal()) + "]";
    }
}
