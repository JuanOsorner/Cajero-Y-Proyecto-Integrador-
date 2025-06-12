package org.example.clasesCrud;

import org.example.clases.Producto;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductoDAO {

    public void insertarProducto(Producto producto) {
        String sql = "INSERT INTO productos (id, nombre, precio) VALUES (?, ?, ?)"; // Asumo que id no es auto-increment en productos
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, producto.getId());
            stmt.setString(2, producto.getNombre());
            stmt.setDouble(3, producto.getPrecio());
            stmt.executeUpdate();
            System.out.println("✅ Producto insertado.");
        } catch (SQLException e) {
            System.err.println("❌ Error al insertar producto: " + e.getMessage());
            if (e.getMessage().contains("Duplicate entry") && e.getMessage().contains("for key 'PRIMARY'")) {
                System.err.println("El ID del producto ya existe. Por favor, use un ID diferente.");
            }
        }
    }

    public List<Producto> obtenerTodos() {
        List<Producto> productos = new ArrayList<>();
        String sql = "SELECT * FROM productos";
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
            System.err.println("❌ Error al obtener todos los productos: " + e.getMessage());
        }
        return productos;
    }

    public Producto obtenerPorId(int id) {
        String sql = "SELECT id, nombre, precio FROM productos WHERE id = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Producto(
                            rs.getInt("id"),
                            rs.getString("nombre"),
                            rs.getDouble("precio")
                    );
                }
            }
        } catch (SQLException e) {
            System.err.println("❌ Error al obtener producto por ID: " + e.getMessage());
        }
        return null;
    }

    public void actualizarProducto(Producto producto) {
        String sql = "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, producto.getNombre());
            stmt.setDouble(2, producto.getPrecio());
            stmt.setInt(3, producto.getId());
            int filasAfectadas = stmt.executeUpdate();
            if (filasAfectadas > 0) {
                System.out.println("✏️ Producto actualizado.");
            } else {
                System.out.println("❗ No se encontró producto con ID: " + producto.getId() + " para actualizar.");
            }
        } catch (SQLException e) {
            System.err.println("❌ Error al actualizar producto: " + e.getMessage());
        }
    }

    public void eliminarProducto(int id) {
        String sql = "DELETE FROM productos WHERE id = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            int filasAfectadas = stmt.executeUpdate();
            if (filasAfectadas > 0) {
                System.out.println("🗑️ Producto eliminado.");
            } else {
                System.out.println("❗ No se encontró producto con ID: " + id + " para eliminar.");
            }
        } catch (SQLException e) {
            System.err.println("❌ Error al eliminar producto: " + e.getMessage());
        }
    }
}