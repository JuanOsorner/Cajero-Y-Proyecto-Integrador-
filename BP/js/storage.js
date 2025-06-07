// storage.js
import { Producto, Carrito, Usuario, Administrador } from './models.js'; // Importar las clases

export const LS_USERS_KEY = 'barranquero_users';
export const LS_PRODUCTS_KEY = 'barranquero_products';

export function cargarUsuarios() {
    const usuariosJSON = localStorage.getItem(LS_USERS_KEY);
    if (usuariosJSON) {
        const usuariosData = JSON.parse(usuariosJSON);
        return usuariosData.map(userData => {
            // Recrear instancia correcta según el tipo de usuario (Administrador o Usuario)
            let userInstance;
            // Para identificar al admin, puedes usar una propiedad especial si la tuvieran,
            // o sus credenciales si son únicas. Por simplicidad, asumimos que el admin
            // tiene un correo y contraseña específicos predefinidos o se le marca.
            if (userData.correo === "admin@barranquero.com" && userData.contrasena === "admin123") {
                userInstance = new Administrador(userData.id, userData.nombre, userData.correo, userData.contrasena);
            } else {
                userInstance = new Usuario(userData.id, userData.nombre, userData.correo, userData.contrasena);
            }

            // Recrear el carrito del usuario, incluyendo instancias de Producto
            if (userData.carrito && userData.carrito.productos) {
                userInstance.carrito.productos = userData.carrito.productos.map(item => ({
                    producto: new Producto(item.producto.id, item.producto.nombre, item.producto.precio, item.producto.stock),
                    cantidad: item.cantidad
                }));
            }
            return userInstance;
        });
    }
    return []; // Retorna un array vacío si no hay usuarios
}

export function guardarUsuarios(usuarios) {
    // Para guardar correctamente los objetos de clase en JSON, es mejor convertirlos a objetos planos
    const usuariosPlanos = usuarios.map(user => ({
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        contrasena: user.contrasena,
        // Guardar el carrito también, asegurándose de que los productos dentro del carrito también sean planos
        carrito: {
            productos: user.carrito.productos.map(item => ({
                producto: {
                    id: item.producto.id,
                    nombre: item.producto.nombre,
                    precio: item.producto.precio,
                    stock: item.producto.stock
                },
                cantidad: item.cantidad
            }))
        }
    }));
    localStorage.setItem(LS_USERS_KEY, JSON.stringify(usuariosPlanos));
    console.log("Usuarios guardados en localStorage.");
}

export function cargarProductos() {
    const productosJSON = localStorage.getItem(LS_PRODUCTS_KEY);
    if (productosJSON) {
        const productosData = JSON.parse(productosJSON);
        // Mapeamos los datos planos a instancias de la clase Producto
        return productosData.map(productData => new Producto(productData.id, productData.nombre, productData.precio, productData.stock));
    }
    return []; // Retorna un array vacío si no hay productos
}

export function guardarProductos(productos) {
    // Los objetos Producto ya son bastante planos para JSON.stringify, pero podemos ser explícitos
    const productosPlanos = productos.map(p => ({
        id: p.id,
        nombre: p.nombre,
        precio: p.precio,
        stock: p.stock
    }));
    localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(productosPlanos));
    console.log("Productos guardados en localStorage.");
}