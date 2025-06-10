package org.example;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductoDAO{

    public void insertarProducto(Producto producto) {
        String sql = "INSERT INTO producto (id, nombre, precio) VALUES (?, ?, ?)";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, producto.getId());
            stmt.setString(2, producto.getNombre());
            stmt.setDouble(3, producto.getPrecio());
            stmt.executeUpdate();
            System.out.println("✅ Producto insertado.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Producto> obtenerTodos() {
        List<Producto> productos = new ArrayList<>();
        String sql = "SELECT * FROM producto";
        try (Connection conn = ConexionMySQL.conectar();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                productos.add(new Producto(
                        rs.getInt("id"),
                        rs.getString("nombre"),
                        rs.getDouble("precio")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return productos;
    }

    public void actualizarProducto(Producto producto) {
        String sql = "UPDATE producto SET nombre = ?, precio = ? WHERE id = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, producto.getNombre());
            stmt.setDouble(2, producto.getPrecio());
            stmt.setInt(3, producto.getId());
            stmt.executeUpdate();
            System.out.println("✏️ Producto actualizado.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void eliminarProducto(int id) {
        String sql = "DELETE FROM producto WHERE id = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
            System.out.println("🗑 Producto eliminado.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

