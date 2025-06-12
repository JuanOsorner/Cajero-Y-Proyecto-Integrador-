package org.example;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionMySQL {
    private static final String URL = "jdbc:mysql://localhost:3306/tienda";
    private static final String User = "root";
    private static final String Password = "";

    public static Connection conectar() throws SQLException{
        return DriverManager.getConnection(URL, User, Password);
    }

}
