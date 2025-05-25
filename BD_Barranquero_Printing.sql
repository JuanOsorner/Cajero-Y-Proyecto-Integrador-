create database Barranquero_Print

use Barranquero_Print

CREATE TABLE Producto (
    ID_Producto INT PRIMARY KEY,
    Nombre VARCHAR(85),
    Categoria VARCHAR(50),
    Precio_Unitario INT,
    Stock INT
);

CREATE TABLE Usuario (
    ID_Usuario INT PRIMARY KEY,
    Nombre VARCHAR(85),
    Rol VARCHAR(50),
    Correo VARCHAR(85)
);

CREATE TABLE Proveedor (
    ID_Proveedor INT PRIMARY KEY,
    Nombre VARCHAR(85),
    Telefono VARCHAR(20),
    Correo VARCHAR(85)
);

CREATE TABLE Venta (
    ID_Venta INT PRIMARY KEY,
    Fecha DATE,
    ID_Producto INT,
    Cantidad INT,
    Total_Venta INT,
    Vendido_por INT,
    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto),
    FOREIGN KEY (Vendido_por) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Orden_Compra (
    ID_Orden INT PRIMARY KEY,
    ID_Producto INT,
    Cantidad INT,
    Fecha_Orden DATE,
    Proveedor INT,
    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto),
    FOREIGN KEY (Proveedor) REFERENCES Proveedor(ID_Proveedor)
);

CREATE TABLE Devolucion (
    ID_Devolucion INT PRIMARY KEY,
    ID_Venta INT,
    ID_Producto INT,
    Cantidad_Devuelta INT,
    Motivo VARCHAR(255),
    Fecha DATE,
    FOREIGN KEY (ID_Venta) REFERENCES Venta(ID_Venta),
    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);