package org.example.clasesCrud;

import org.example.clases.Administrador;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AdministradorCRUD {

    // Crear
    public boolean crearAdministrador(Administrador admin) {
        String sql = "INSERT INTO administradores (nombre, correo) VALUES (?, ?)"; // ID es auto-increment
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) { // Para obtener el ID generado

            stmt.setString(1, admin.getNombre());
            stmt.setString(2, admin.getCorreo());

            int filasAfectadas = stmt.executeUpdate();
            if (filasAfectadas > 0) {
                try (ResultSet rs = stmt.getGeneratedKeys()) {
                    if (rs.next()) {
                        admin.setId(rs.getInt(1)); // Asigna el ID generado al objeto
                    }
                }
                System.out.println("✅ Administrador creado: " + admin);
                return true;
            }
        } catch (SQLException e) {
            System.err.println("❌ Error al crear administrador: " + e.getMessage());
            if (e.getMessage().contains("Duplicate entry")) {
                System.err.println("El correo '" + admin.getCorreo() + "' ya está registrado para otro administrador.");
            }
        }
        return false;
    }

    // Leer (todos)
    public List<Administrador> obtenerTodos() {
        List<Administrador> administradores = new ArrayList<>();
        String sql = "SELECT id, nombre, correo FROM administradores";
        try (Connection conn = ConexionMySQL.conectar();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                administradores.add(new Administrador(
                        rs.getInt("id"),
                        rs.getString("nombre"),
                        rs.getString("correo")
                ));
            }
        } catch (SQLException e) {
            System.err.println("❌ Error al obtener todos los administradores: " + e.getMessage());
        }
        return administradores;
    }

    // Leer (por id)
    public Administrador obtenerPorId(int id) {
        String sql = "SELECT id, nombre, correo FROM administradores WHERE id = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Administrador(
                            rs.getInt("id"),
                            rs.getString("nombre"),
                            rs.getString("correo")
                    );
                }
            }
        } catch (SQLException e) {
            System.err.println("❌ Error al obtener administrador por ID: " + e.getMessage());
        }
        return null;
    }

    // Actualizar
    public boolean actualizarAdministrador(Administrador admin) {
        String sql = "UPDATE administradores SET nombre = ?, correo = ? WHERE id = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, admin.getNombre());
            stmt.setString(2, admin.getCorreo());
            stmt.setInt(3, admin.getId());

            int filasAfectadas = stmt.executeUpdate();
            if (filasAfectadas > 0) {
                System.out.println("✏️ Administrador actualizado: " + admin);
                return true;
            }
        } catch (SQLException e) {
            System.err.println("❌ Error al actualizar administrador: " + e.getMessage());
            if (e.getMessage().contains("Duplicate entry")) {
                System.err.println("El correo '" + admin.getCorreo() + "' ya está registrado por otro administrador.");
            }
        }
        return false;
    }

    // Eliminar
    public boolean eliminarAdministrador(int id) {
        String sql = "DELETE FROM administradores WHERE id = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            int filasAfectadas = stmt.executeUpdate();
            if (filasAfectadas > 0) {
                System.out.println("🗑️ Administrador eliminado con ID: " + id);
                return true;
            }
        } catch (SQLException e) {
            System.err.println("❌ Error al eliminar administrador: " + e.getMessage());
        }
        return false;
    }
}
