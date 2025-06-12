package org.example.clasesCrud;

import org.example.clases.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class UsuarioCRUD {

    public UsuarioCRUD() {
        // El driver JDBC ya se carga en ConexionMySQL en el static block.
    }

    // --- Operación: Insertar (Crear) un nuevo Usuario ---
    public boolean insertarUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, usuario.getNombre());
            stmt.setString(2, usuario.getCorreo());
            stmt.setString(3, usuario.getContraseña()); // Nota: En un sistema real, hashearías la contraseña

            int filasAfectadas = stmt.executeUpdate();
            if (filasAfectadas > 0) {
                try (ResultSet rs = stmt.getGeneratedKeys()) {
                    if (rs.next()) {
                        usuario.setId(rs.getInt(1)); // Asigna el ID generado al objeto
                    }
                }
                System.out.println("✅ Usuario insertado: " + usuario.getNombre());
                return true;
            }
            return false;

        } catch (SQLException e) {
            System.err.println("❌ Error al insertar usuario: " + e.getMessage());
            if (e.getMessage().contains("Duplicate entry") && e.getMessage().contains("for key 'correo'")) {
                System.err.println("El correo '" + usuario.getCorreo() + "' ya está registrado.");
            }
            return false;
        }
    }

    // --- Operación: Leer (Obtener) un Usuario por ID ---
    public Usuario obtenerUsuarioPorId(int id) {
        String sql = "SELECT id, nombre, correo, contrasena FROM usuarios WHERE id = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Usuario(
                            rs.getInt("id"),
                            rs.getString("nombre"),
                            rs.getString("correo"),
                            rs.getString("contrasena")
                    );
                }
            }
        } catch (SQLException e) {
            System.err.println("❌ Error al obtener usuario por ID: " + e.getMessage());
        }
        return null;
    }

    // --- Operación: Leer (Obtener) todos los Usuarios ---
    public List<Usuario> obtenerTodosLosUsuarios() {
        List<Usuario> usuarios = new ArrayList<>();
        String sql = "SELECT id, nombre, correo, contrasena FROM usuarios";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                usuarios.add(new Usuario(
                        rs.getInt("id"),
                        rs.getString("nombre"),
                        rs.getString("correo"),
                        rs.getString("contrasena")
                ));
            }
        } catch (SQLException e) {
            System.err.println("❌ Error al obtener todos los usuarios: " + e.getMessage());
        }
        return usuarios;
    }

    // --- Operación: Actualizar un Usuario existente ---
    public boolean actualizarUsuario(Usuario usuario) {
        if (usuario.getId() == null) {
            System.err.println("❗ Error: No se puede actualizar un usuario sin un ID.");
            return false;
        }

        String sql = "UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, usuario.getNombre());
            stmt.setString(2, usuario.getCorreo());
            stmt.setString(3, usuario.getContraseña());
            stmt.setInt(4, usuario.getId());

            int filasAfectadas = stmt.executeUpdate();
            if (filasAfectadas > 0) {
                System.out.println("✏️ Usuario actualizado: " + usuario.getNombre());
                return true;
            } else {
                System.out.println("❗ No se encontró usuario con ID: " + usuario.getId() + " para actualizar.");
            }
            return false;

        } catch (SQLException e) {
            System.err.println("❌ Error al actualizar usuario: " + e.getMessage());
            if (e.getMessage().contains("Duplicate entry") && e.getMessage().contains("for key 'correo'")) {
                System.err.println("El correo '" + usuario.getCorreo() + "' ya está registrado por otro usuario.");
            }
            return false;
        }
    }

    // --- Operación: Eliminar un Usuario por ID ---
    public boolean eliminarUsuario(int id) {
        String sql = "DELETE FROM usuarios WHERE id = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            int filasAfectadas = stmt.executeUpdate();
            if (filasAfectadas > 0) {
                System.out.println("🗑️ Usuario eliminado con ID: " + id);
                return true;
            } else {
                System.out.println("❗ No se encontró usuario con ID: " + id + " para eliminar.");
            }
            return false;

        } catch (SQLException e) {
            System.err.println("❌ Error al eliminar usuario: " + e.getMessage());
            return false;
        }
    }

    // --- Método para verificar credenciales de inicio de sesión (opcional) ---
    public Usuario iniciarSesion(String correo, String contrasena) {
        String sql = "SELECT id, nombre, correo, contrasena FROM usuarios WHERE correo = ?";
        try (Connection conn = ConexionMySQL.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, correo);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    String contrasenaAlmacenada = rs.getString("contrasena");
                    // ¡ADVERTENCIA DE SEGURIDAD!: En producción, esta comparación debe ser con hashing (BCrypt, etc.)
                    if (contrasena.equals(contrasenaAlmacenada)) {
                        System.out.println("Inicio de sesión exitoso para " + rs.getString("nombre"));
                        return new Usuario(
                                rs.getInt("id"),
                                rs.getString("nombre"),
                                rs.getString("correo"),
                                rs.getString("contrasena")
                        );
                    } else {
                        System.out.println("Contraseña incorrecta para el correo: " + correo);
                    }
                } else {
                    System.out.println("No se encontró usuario con el correo: " + correo);
                }
            }
        } catch (SQLException e) {
            System.err.println("❌ Error al intentar iniciar sesión: " + e.getMessage());
        }
        return null;
    }
}