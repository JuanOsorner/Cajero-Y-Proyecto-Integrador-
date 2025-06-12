import java.util.ArrayList;
import java.util.List;

public class AdministradorCRUD {
    private List<Administrador> administradores = new ArrayList<>();

    // Crear
    public void crearAdministrador(Administrador admin) {
        administradores.add(admin);
        System.out.println("Administrador creado: " + admin);
    }

    // Leer (todos)
    public List<Administrador> obtenerTodos() {
        return administradores;
    }

    // Leer (por id)
    public Administrador obtenerPorId(int id) {
        for (Administrador admin : administradores) {
            if (admin.getId() == id) {
                return admin;
            }
        }
        return null;
    }

    // Actualizar
    public boolean actualizarAdministrador(int id, String nuevoNombre, String nuevoCorreo) {
        Administrador admin = obtenerPorId(id);
        if (admin != null) {
            admin.setNombre(nuevoNombre);
            admin.setCorreo(nuevoCorreo);
            System.out.println("Administrador actualizado: " + admin);
            return true;
        }
        return false;
    }

    // Eliminar
    public boolean eliminarAdministrador(int id) {
        Administrador admin = obtenerPorId(id);
        if (admin != null) {
            administradores.remove(admin);
            System.out.println("Administrador eliminado con ID: " + id);
            return true;
        }
        return false;
    }
}
