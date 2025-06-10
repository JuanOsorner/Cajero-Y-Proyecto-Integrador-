package main.java.com.myproject.crud;

import com.myproject.clases.Usuario;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UsuarioDAO {
    public void createUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setString(1, usuario.getNombre());
            pstmt.setString(2, usuario.getCorreo());
            pstmt.setString(3, usuario.getContraseña());

            int affectedRows = pstmt.executeUpdate();

            if (affectedRows > 0) {
                try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        usuario.setId(generatedKeys.getInt(1));
                    }
                }
                System.out.println("CRUD: Usuario '" + usuario.getNombre() + "' creado con éxito. ID: " + usuario.getId());
            }

        } catch (SQLException e) {
            System.err.println("CRUD ERROR: Fallo al crear usuario: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public Usuario getUsuarioById(int id) {
        String sql = "SELECT id, nombre, correo, contraseña FROM usuarios WHERE id = ?";
        Usuario usuario = null;
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    usuario = new Usuario(
                        rs.getInt("id"),
                        rs.getString("nombre"),
                        rs.getString("correo"),
                        rs.getString("contraseña")
                    );
                }
            }
        } catch (SQLException e) {
            System.err.println("CRUD ERROR: Fallo al obtener usuario por ID: " + e.getMessage());
            e.printStackTrace();
        }
        return usuario;
    }

    public List<Usuario> getAllUsuarios() {
        String sql = "SELECT id, nombre, correo, contraseña FROM usuarios";
        List<Usuario> usuarios = new ArrayList<>();
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Usuario usuario = new Usuario(
                    rs.getInt("id"),
                    rs.getString("nombre"),
                    rs.getString("correo"),
                    rs.getString("contraseña")
                );
                usuarios.add(usuario);
            }
        } catch (SQLException e) {
            System.err.println("CRUD ERROR: Fallo al obtener todos los usuarios: " + e.getMessage());
            e.printStackTrace();
        }
        return usuarios;
    }

    public void updateUsuario(Usuario usuario) {
        String sql = "UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, usuario.getNombre());
            pstmt.setString(2, usuario.getCorreo());
            pstmt.setString(3, usuario.getContraseña());
            pstmt.setInt(4, usuario.getId());

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                System.out.println("CRUD: Usuario con ID " + usuario.getId() + " actualizado con éxito.");
            } else {
                System.out.println("CRUD: No se encontró el usuario con ID " + usuario.getId() + " para actualizar.");
            }

        } catch (SQLException e) {
            System.err.println("CRUD ERROR: Fallo al actualizar usuario: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void deleteUsuario(int id) {
        String sql = "DELETE FROM usuarios WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                System.out.println("CRUD: Usuario con ID " + id + " eliminado con éxito.");
            } else {
                System.out.println("CRUD: No se encontró el usuario con ID " + id + " para eliminar.");
            }

        } catch (SQLException e) {
            System.err.println("CRUD ERROR: Fallo al eliminar usuario: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
