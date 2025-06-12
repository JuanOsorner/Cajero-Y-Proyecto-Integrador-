package main.java.com.myproject.crud;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/barranquero";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static Connection getConnection() {
        Connection connection = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(JDBC_URL, USER, PASSWORD);
            System.out.println("DEBUG: Conexión a la base de datos establecida con éxito.");
        } catch (ClassNotFoundException e) {
            System.err.println("ERROR: Driver JDBC de MySQL no encontrado. Asegúrate de tener el JAR en tu classpath.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("ERROR: Fallo al conectar a la base de datos: " + e.getMessage());
            e.printStackTrace();
        }
        return connection;
    }

    public static void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
                System.out.println("DEBUG: Conexión a la base de datos cerrada.");
            } catch (SQLException e) {
                System.err.println("ERROR: Fallo al cerrar la conexión: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
}
