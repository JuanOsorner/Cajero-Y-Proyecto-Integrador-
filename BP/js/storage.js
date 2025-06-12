// storage.js
import { Producto, Carrito, Usuario, Administrador } from './models.js'; // Importar todas las clases necesarias

export const LS_USERS_KEY = 'barranquero_users'; // Clave para los usuarios en localStorage
export const LS_PRODUCTS_KEY = 'barranquero_products'; // Clave para los productos en localStorage

/**
 * Carga los usuarios desde localStorage y los convierte de objetos planos a instancias de clase Usuario o Administrador.
 * @returns {Array<Usuario|Administrador>} Un array de instancias de Usuario o Administrador.
 */
export function cargarUsuarios() {
    const usuariosJSON = localStorage.getItem(LS_USERS_KEY); // Obtener la cadena JSON de usuarios
    if (usuariosJSON) {
        const usuariosData = JSON.parse(usuariosJSON); // Convertir la cadena JSON a array de objetos planos

        return usuariosData.map(userData => {
            let userInstance;
            // Desestructurar las propiedades del objeto plano para pasarlas al constructor
            const { id, nombre, correo, contrasena, fechaNacimiento, pais, ciudad, barrio, direccion } = userData;

            // Recrear la instancia correcta según el tipo de usuario
            // ¡IMPORTANTE! Las credenciales (correo y contraseña) aquí deben coincidir
            // EXACTAMENTE con las que usas para crear el administrador por defecto en login_registro.js
            if (correo === "admin@bp.com" && contrasena === "12345") {
                // Si coincide con las credenciales del admin, crea una instancia de Administrador
                userInstance = new Administrador(id, nombre, correo, contrasena, fechaNacimiento, pais, ciudad, barrio, direccion);
            } else {
                // Si no, crea una instancia de Usuario normal
                userInstance = new Usuario(id, nombre, correo, contrasena, fechaNacimiento, pais, ciudad, barrio, direccion);
            }

            // Recrear el carrito del usuario. JSON.parse no recrea instancias de clase,
            // así que los productos dentro del carrito también deben ser re-instanciados como Producto.
            if (userData.carrito && userData.carrito.productos) {
                userInstance.carrito.productos = userData.carrito.productos.map(item => ({
                    producto: new Producto(item.producto.id, item.producto.nombre, item.producto.precio, item.producto.stock),
                    cantidad: item.cantidad
                }));
            }
            return userInstance; // Retorna la instancia de Usuario o Administrador rehidratada
        });
    }
    return []; // Retorna un array vacío si no hay usuarios guardados
}

/**
 * Guarda un array de instancias de Usuario o Administrador en localStorage.
 * Las instancias se convierten a objetos planos para ser serializadas a JSON.
 * @param {Array<Usuario|Administrador>} usuarios El array de usuarios a guardar.
 */
export function guardarUsuarios(usuarios) {
    // Convertir las instancias de clase a objetos planos para que JSON.stringify pueda procesarlos correctamente.
    const usuariosPlanos = usuarios.map(user => ({
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        contrasena: user.contrasena,
        // Incluir los campos de perfil adicionales
        fechaNacimiento: user.fechaNacimiento || '', // Usar || '' para asegurar que se guarde un string vacío si es null/undefined
        pais: user.pais || '',
        ciudad: user.ciudad || '',
        barrio: user.barrio || '',
        direccion: user.direccion || '',
        // Convertir el carrito y sus productos a objetos planos también
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
    localStorage.setItem(LS_USERS_KEY, JSON.stringify(usuariosPlanos)); // Guardar como cadena JSON
    console.log("Usuarios guardados en localStorage.");
}

/**
 * Carga los productos desde localStorage y los convierte de objetos planos a instancias de la clase Producto.
 * @returns {Array<Producto>} Un array de instancias de Producto.
 */
export function cargarProductos() {
    const productosJSON = localStorage.getItem(LS_PRODUCTS_KEY);
    if (productosJSON) {
        const productosData = JSON.parse(productosJSON);
        return productosData.map(productData => {
            // Desestructurar todas las propiedades, incluyendo las nuevas con valores por defecto si no existen
            const { id, nombre, precio, stock, descuento = 0, imagenUrl = './img/default-product.png' } = productData; // <-- MODIFICADO
            // Pasar todas las propiedades al constructor de Producto
            return new Producto(id, nombre, precio, stock, descuento, imagenUrl); // <-- MODIFICADO
        });
    }
    return [];
}

/**
 * Guarda un array de instancias de Producto en localStorage.
 * Las instancias se convierten a objetos planos para ser serializadas a JSON.
 * @param {Array<Producto>} productos El array de productos a guardar.
 */
export function guardarProductos(productos) {
    const productosPlanos = productos.map(p => ({
        id: p.id,
        nombre: p.nombre,
        precio: p.precio,
        stock: p.stock,
        descuento: p.descuento || 0,       // <-- NUEVO: Asegura que se guarde un número o 0
        imagenUrl: p.imagenUrl || './img/default-product.png' // <-- NUEVO: Asegura una URL o la por defecto
    }));
    localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(productosPlanos));
    console.log("Productos guardados en localStorage.");
}