package org.example;

import java.util.ArrayList;
import java.util.List;

public class Carrito {
    private List<String> productos;

    public Carrito(){
        this.productos = new ArrayList<>();
    }

    public void agregarProducto(String producto){
        productos.add(producto);
    }

    public List<String> getProductos(){
        return productos;
    }
}
