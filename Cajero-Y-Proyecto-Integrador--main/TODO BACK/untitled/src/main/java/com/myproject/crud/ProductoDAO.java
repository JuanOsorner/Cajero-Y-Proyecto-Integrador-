package main.java.com.myproject.crud;

import com.myproject.clases.Producto;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductoDAO {
    public void createProducto(Producto producto) {
        String sql = "INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setString(1, producto.getNombre());
            pstmt.setDouble(2, producto.getPrecio());
            pstmt.setInt(3, producto.getStock());

            int affectedRows = pstmt.executeUpdate();

            if (affectedRows > 0) {
                try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        producto.setId(generatedKeys.getInt(1));
                    }
                }
                System.out.println("CRUD: Producto '" + producto.getNombre() + "' creado con éxito. ID: " + producto.getId());
            }

        } catch (SQLException e) {
            System.err.println("CRUD ERROR: Fallo al crear producto: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public Producto getProductoById(int id) {
        String sql = "SELECT id, nombre, precio, stock FROM productos WHERE id = ?";
        Producto producto = null;
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    producto = new Producto(
                        rs.getInt("id"),
                        rs.getString("nombre"),
                        rs.getDouble("precio"),
                        rs.getInt("stock")
                    );
                }
            }
        } catch (SQLException e) {
            System.err.println("CRUD ERROR: Fallo al obtener producto por ID: " + e.getMessage());
            e.printStackTrace();
        }
        return producto;
    }

    public List<Producto> getAllProductos() {
        String sql = "SELECT id, nombre, precio, stock FROM productos";
        List<Producto> productos = new ArrayList<>();
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Producto producto = new Producto(
                    rs.getInt("id"),
                    rs.getString("nombre"),
                    rs.getDouble("precio"),
                    rs.getInt("stock")
                );
                productos.add(producto);
            }
        } catch (SQLException e) {
            System.err.println("CRUD ERROR: Fallo al obtener todos los productos: " + e.getMessage());
            e.printStackTrace();
        }
        return productos;
    }

    public void updateProducto(Producto producto) {
        String sql = "UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, producto.getNombre());
            pstmt.setDouble(2, producto.getPrecio());
            pstmt.setInt(3, producto.getStock());
            pstmt.setInt(4, producto.getId());

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                System.out.println("CRUD: Producto con ID " + producto.getId() + " actualizado con éxito.");
            } else {
                System.out.println("CRUD: No se encontró el producto con ID " + producto.getId() + " para actualizar.");
            }

        } catch (SQLException e) {
            System.err.println("CRUD ERROR: Fallo al actualizar producto: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void deleteProducto(int id) {
        String sql = "DELETE FROM productos WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                System.out.println("CRUD: Producto con ID " + id + " eliminado con éxito.");
            } else {
                System.out.println("CRUD: No se encontró el producto con ID " + id + " para eliminar.");
            }

        } catch (SQLException e) {
            System.err.println("CRUD ERROR: Fallo al eliminar producto: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
