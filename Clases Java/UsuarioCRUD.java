import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UsuarioCRUD {

    // --- Configuración de la Base de Datos ---
    private static final String URL = "jdbc:mysql://localhost:3306/mi_base_de_datos"; // Reemplaza 'mi_base_de_datos' con el nombre de tu BD
    private static final String USUARIO = "root"; // Reemplaza 'root' con tu usuario de BD
    private static final String CONTRASENA = ""; // Reemplaza '' con tu contraseña de BD

    // Constructor vacío
    public UsuarioCRUD() {
        // Asegúrate de que el driver JDBC esté disponible
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("Error: Driver JDBC de MySQL no encontrado.");
            e.printStackTrace();
        }
    }

    // --- Métodos de Conexión ---
    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USUARIO, CONTRASENA);
    }

    // --- Operación: Insertar (Crear) un nuevo Usuario ---
    public boolean insertarUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, usuario.getNombre());
            stmt.setString(2, usuario.getCorreo());
            stmt.setString(3, usuario.getContraseña()); // Nota: En un sistema real, hashearías la contraseña

            int filasAfectadas = stmt.executeUpdate();
            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.err.println("Error al insertar usuario: " + e.getMessage());
            // Si el correo es duplicado, MySQL lanzará una excepción
            if (e.getMessage().contains("Duplicate entry")) {
                System.err.println("El correo '" + usuario.getCorreo() + "' ya está registrado.");
            }
            return false;
        }
    }

    // --- Operación: Leer (Obtener) un Usuario por ID ---
    public Usuario obtenerUsuarioPorId(int id) {
        String sql = "SELECT id, nombre, correo, contrasena FROM usuarios WHERE id = ?";
        try (Connection conn = getConnection();
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
            System.err.println("Error al obtener usuario por ID: " + e.getMessage());
        }
        return null; // Retorna null si no se encuentra el usuario
    }

    // --- Operación: Leer (Obtener) todos los Usuarios ---
    public List<Usuario> obtenerTodosLosUsuarios() {
        List<Usuario> usuarios = new ArrayList<>();
        String sql = "SELECT id, nombre, correo, contrasena FROM usuarios";
        try (Connection conn = getConnection();
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
            System.err.println("Error al obtener todos los usuarios: " + e.getMessage());
        }
        return usuarios;
    }

    // --- Operación: Actualizar un Usuario existente ---
    public boolean actualizarUsuario(Usuario usuario) {
        // Permite actualizar nombre, correo y contraseña.
        // Asegúrate de que el ID del usuario esté establecido.
        if (usuario.getId() == null) {
            System.err.println("Error: No se puede actualizar un usuario sin un ID.");
            return false;
        }

        String sql = "UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, usuario.getNombre());
            stmt.setString(2, usuario.getCorreo());
            stmt.setString(3, usuario.getContraseña()); // Contraseña ya debería estar hasheada si aplica
            stmt.setInt(4, usuario.getId());

            int filasAfectadas = stmt.executeUpdate();
            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.err.println("Error al actualizar usuario: " + e.getMessage());
            // Si el correo es duplicado, MySQL lanzará una excepción
            if (e.getMessage().contains("Duplicate entry")) {
                System.err.println("El correo '" + usuario.getCorreo() + "' ya está registrado por otro usuario.");
            }
            return false;
        }
    }

    // --- Operación: Eliminar un Usuario por ID ---
    public boolean eliminarUsuario(int id) {
        String sql = "DELETE FROM usuarios WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            int filasAfectadas = stmt.executeUpdate();
            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.err.println("Error al eliminar usuario: " + e.getMessage());
            return false;
        }
    }

    // --- Método para verificar credenciales de inicio de sesión (opcional) ---
    public Usuario iniciarSesion(String correo, String contrasena) {
        String sql = "SELECT id, nombre, correo, contrasena FROM usuarios WHERE correo = ?";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, correo);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    String contrasenaHashAlmacenada = rs.getString("contrasena");
                    // En un sistema real, aquí usarías password_verify en PHP o BCrypt.checkpw en Java
                    // para comparar la contraseña proporcionada con el hash almacenado.
                    // Por simplicidad, aquí comparo directamente, pero NO ES SEGURO para producción.
                    if (contrasena.equals(contrasenaHashAlmacenada)) { // ¡REEMPLAZA ESTO EN PRODUCCIÓN!
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
            System.err.println("Error al intentar iniciar sesión: " + e.getMessage());
        }
        return null; // Retorna null si las credenciales son inválidas o hay un error
    }


    // --- Clase Principal para Probar el CRUD ---
    public static void main(String[] args) {
        UsuarioCRUD crud = new UsuarioCRUD();

        System.out.println("--- PRUEBAS DE CRUD DE USUARIOS ---");

        // 1. Insertar usuarios
        System.out.println("\n--- Insertar Usuarios ---");
        Usuario nuevoUsuario1 = new Usuario(null, "Carlos Ruiz", "carlos.ruiz@example.com", "pass123");
        if (crud.insertarUsuario(nuevoUsuario1)) {
            System.out.println("Usuario 'Carlos Ruiz' insertado.");
        }

        Usuario nuevoUsuario2 = new Usuario(null, "Laura Gómez", "laura.gomez@example.com", "securepass");
        if (crud.insertarUsuario(nuevoUsuario2)) {
            System.out.println("Usuario 'Laura Gómez' insertado.");
        }

        // Intentar insertar un correo duplicado
        System.out.println("\n--- Intentando insertar correo duplicado ---");
        Usuario duplicado = new Usuario(null, "Otro Carlos", "carlos.ruiz@example.com", "otrapass");
        if (!crud.insertarUsuario(duplicado)) {
            System.out.println("Intentar insertar 'carlos.ruiz@example.com' falló como se esperaba (correo duplicado).");
        }

        // 2. Obtener todos los usuarios
        System.out.println("\n--- Obtener Todos los Usuarios ---");
        List<Usuario> usuarios = crud.obtenerTodosLosUsuarios();
        if (usuarios.isEmpty()) {
            System.out.println("No hay usuarios en la base de datos.");
        } else {
            usuarios.forEach(u -> System.out.println("ID: " + u.getId() + ", Nombre: " + u.getNombre() + ", Correo: " + u.getCorreo()));
        }

        // 3. Obtener un usuario por ID (asumiendo que el ID 1 o 2 existen de las inserciones)
        System.out.println("\n--- Obtener Usuario por ID (ID 1) ---");
        Usuario usuarioEncontrado = crud.obtenerUsuarioPorId(1);
        if (usuarioEncontrado != null) {
            System.out.println("Usuario encontrado: ID: " + usuarioEncontrado.getId() + ", Nombre: " + usuarioEncontrado.getNombre() + ", Correo: " + usuarioEncontrado.getCorreo());
        } else {
            System.out.println("Usuario con ID 1 no encontrado.");
        }

        System.out.println("\n--- Obtener Usuario por ID (ID inexistente, ej. 99) ---");
        Usuario usuarioInexistente = crud.obtenerUsuarioPorId(99);
        if (usuarioInexistente == null) {
            System.out.println("Usuario con ID 99 no encontrado (comportamiento esperado).");
        }

        // 4. Actualizar un usuario
        System.out.println("\n--- Actualizar Usuario ---");
        // Asume que obtuvimos un usuario con ID 1
        if (usuarioEncontrado != null) {
            usuarioEncontrado.setNombre("Carlos Ruiz Actualizado");
            usuarioEncontrado.setCorreo("carlos.actualizado@example.com");
            usuarioEncontrado.setContraseña("new_pass_carlos"); // Cambiando la contraseña
            if (crud.actualizarUsuario(usuarioEncontrado)) {
                System.out.println("Usuario con ID " + usuarioEncontrado.getId() + " actualizado.");
                // Verificamos el cambio
                Usuario usuarioPostUpdate = crud.obtenerUsuarioPorId(usuarioEncontrado.getId());
                if (usuarioPostUpdate != null) {
                    System.out.println("Después de actualizar: " + usuarioPostUpdate.getNombre() + ", " + usuarioPostUpdate.getCorreo());
                }
            } else {
                System.out.println("Fallo al actualizar usuario con ID " + usuarioEncontrado.getId());
            }
        }

        // 5. Eliminar un usuario
        System.out.println("\n--- Eliminar Usuario (ID 2) ---");
        if (crud.eliminarUsuario(2)) { // Asumiendo que Laura Gómez tiene ID 2
            System.out.println("Usuario con ID 2 eliminado.");
        } else {
            System.out.println("Fallo al eliminar usuario con ID 2.");
        }

        // 6. Iniciar Sesión (prueba)
        System.out.println("\n--- Prueba de Inicio de Sesión ---");
        // Si Carlos Ruiz Actualizado existe y su ID es 1
        if (usuarioEncontrado != null && crud.iniciarSesion("carlos.actualizado@example.com", "new_pass_carlos") != null) {
            System.out.println("Inicio de sesión exitoso con credenciales de Carlos.");
        } else {
            System.out.println("Fallo el inicio de sesión con credenciales de Carlos.");
        }

        if (crud.iniciarSesion("correo.no.existe@example.com", "cualquierpass") == null) {
            System.out.println("Fallo el inicio de sesión para correo inexistente (comportamiento esperado).");
        }

        if (crud.iniciarSesion("carlos.actualizado@example.com", "contrasena_incorrecta") == null) {
            System.out.println("Fallo el inicio de sesión con contraseña incorrecta (comportamiento esperado).");
        }

        // Re-obtener todos los usuarios para ver el resultado final
        System.out.println("\n--- Todos los Usuarios al Finalizar ---");
        usuarios = crud.obtenerTodosLosUsuarios();
        if (usuarios.isEmpty()) {
            System.out.println("No hay usuarios en la base de datos.");
        } else {
            usuarios.forEach(u -> System.out.println("ID: " + u.getId() + ", Nombre: " + u.getNombre() + ", Correo: " + u.getCorreo()));
        }
    }
}