package org.example;
import java.util.ArrayList;
import java.util.List;
public class Carrito {
    private int id;
    private List<Producto> productos;

    public Carrito(int id){
        this.id = id;
        this.productos = new ArrayList<>();
    }
    //Agregar producto al carrito
    public void agregarProducto(Producto p){
        productos.add(p);
        System.out.println("Producto agregado: " + p.getNombre());
    }
    //Eliminar producto por id
    public void eliminarProducto(int idProducto){
        boolean eliminado = productos.removeIf(p -> p.getId() == idProducto);
        if(eliminado){
            System.out.println("Producto con id " + idProducto + " eliminado.");
        }else{
            System.out.println("Producto con id " + idProducto + "No encontrado.");
        }
    }
    //calcular el total del carrito
    public double calcularTotal(){
        double total = 0.0;
        for (Producto p : productos){
            total += p.getPrecio();
        }
        return total;
    }
    //Mostrar todos los productos
    public void mostrarProductos(){
        if (productos.isEmpty()){
            System.out.println("EL carrito esta vacio.");
        }else{
            System.out.println("Productos en el carrito:");
            for (Producto p : productos){
                System.out.println(p);
            }
        }
    }
    //Getter para ID
    public int getId(){
        return id;
    }
}
