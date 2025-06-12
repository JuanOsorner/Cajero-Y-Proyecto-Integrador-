package org.example.clasesCrud;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionMySQL {
    private static final String URL = "jdbc:mysql://localhost:3306/tienda"; // Asegúrate de que 'tienda' sea el nombre de tu BD
    private static final String USER = "root";
    private static final String PASSWORD = "";

    static {
        try {
            // Cargar el driver JDBC al inicio de la aplicación
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("Error: Driver JDBC de MySQL no encontrado. Asegúrate de que el JAR esté en el classpath.");
            e.printStackTrace();
        }
    }

    public static Connection conectar() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
