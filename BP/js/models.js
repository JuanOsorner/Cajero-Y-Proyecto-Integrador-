// models.js

// Clase Producto: Representa un producto en el sistema
export class Producto {
    // Constructor de Producto, ahora incluye descuento e imagenUrl
    constructor(id, nombre, precio, stock, descuento = 0, imagenUrl = './img/default-product.png') {
        this.id = id;             // Identificador único del producto
        this.nombre = nombre;     // Nombre del producto
        this.precio = precio;     // Precio unitario del producto
        this.stock = stock;       // Cantidad disponible en inventario
        this.descuento = descuento;       // Porcentaje de descuento (ej. 15 para 15%)
        this.imagenUrl = imagenUrl;       // URL de la imagen del producto
    }

    /**
     * Actualiza la cantidad de stock del producto.
     * @param {number} cantidad - La cantidad a añadir o restar al stock (positivo para añadir, negativo para restar).
     * @returns {boolean} True si el stock se actualizó correctamente, false si no hay suficiente stock para reducir.
     */
    actualizarStock(cantidad) {
        if (this.stock + cantidad >= 0) {
            this.stock += cantidad;
            console.log(`Stock de ${this.nombre} actualizado a: ${this.stock}`);
            return true;
        } else {
            console.log(`No hay suficiente stock para reducir en ${cantidad} unidades. Stock actual: ${this.stock}`);
            return false;
        }
    }
}

// models.js

// ... (Clase Producto existente, ya con descuento e imagenUrl) ...

// Clase Carrito: Representa el carrito de compras de un usuario
export class Carrito {
    constructor() {
        this.productos = []; // Lista de objetos { producto: Producto, cantidad: number }
    }

    /**
     * Agrega un producto al carrito. Si ya existe, incrementa la cantidad.
     * Realiza una validación básica de stock global disponible.
     * @param {Producto} p - La instancia del producto a añadir.
     */
    agregarProducto(p) { 
        if (p instanceof Producto) {
            const productoEnCarrito = this.productos.find(item => item.producto.id === p.id);

            if (productoEnCarrito) {
                // Si el producto ya está en el carrito, incrementa la cantidad
                // Se verifica contra el stock global del producto 'p'.
                if (p.stock > productoEnCarrito.cantidad) { 
                    productoEnCarrito.cantidad++;
                    console.log(`Se agregó una unidad más de ${p.nombre} al carrito.`);
                } else {
                    console.log(`No hay suficiente stock general de ${p.nombre} para agregar más al carrito.`);
                }
            } else {
                // Si el producto no está en el carrito, lo añade con cantidad 1, si hay stock inicial.
                if (p.stock > 0) { 
                    this.productos.push({ producto: p, cantidad: 1 });
                    console.log(`${p.nombre} agregado al carrito.`);
                } else {
                    console.log(`No hay stock general de ${p.nombre} para agregar al carrito.`);
                }
            }
        } else {
            console.error("Solo se pueden agregar instancias de Producto al carrito.");
        }
    }

    /**
     * Elimina un producto completamente del carrito, o reduce su cantidad.
     * Este método NO actualiza el stock global del producto; solo la cantidad en el carrito.
     * @param {number} id - El ID del producto a eliminar/modificar.
     * @param {number} [cantidad=0] - Cantidad a eliminar. Si es 0 o no se especifica, elimina el producto completo.
     * @returns {boolean} True si se modificó/eliminó, false si no se encontró.
     */
    eliminarProducto(id, cantidad = 0) { // <-- Método ya modificado en discusiones previas
        const index = this.productos.findIndex(item => item.producto.id === id);
        if (index !== -1) {
            if (cantidad > 0 && this.productos[index].cantidad > cantidad) {
                this.productos[index].cantidad -= cantidad;
                console.log(`Se eliminaron ${cantidad} unidades de ${this.productos[index].producto.nombre} del carrito.`);
                return true;
            } else {
                const productoEliminado = this.productos.splice(index, 1);
                console.log(`Producto ${productoEliminado[0].producto.nombre} eliminado completamente del carrito.`);
                return true;
            }
        } else {
            console.log(`Producto con ID ${id} no encontrado en el carrito.`);
            return false;
        }
    }

    /**
     * Calcula el valor total de todos los productos en el carrito, aplicando descuentos.
     * @returns {number} El total del carrito.
     */
    calcularTotal() {
        return this.productos.reduce((total, item) => {
            let precioUnitario = item.producto.precio;
            // Calcular precio con descuento si aplica
            if (item.producto.descuento > 0 && item.producto.descuento <= 100) {
                precioUnitario = item.producto.precio * (1 - item.producto.descuento / 100);
            }
            return total + (precioUnitario * item.cantidad);
        }, 0);
    }
}

// Clase Usuario: Representa a un usuario registrado en el sistema
export class Usuario {
    // Constructor de Usuario, ahora incluye propiedades de perfil adicionales
    constructor(id, nombre, correo, contrasena, fechaNacimiento = '', pais = '', ciudad = '', barrio = '', direccion = '') {
        this.id = id;                 // Identificador único del usuario
        this.nombre = nombre;         // Nombre completo del usuario
        this.correo = correo;         // Correo electrónico (usado como login)
        this.contrasena = contrasena; // Contraseña (en un sistema real, sería un hash)
        this.carrito = new Carrito(); // Cada usuario tiene su propio carrito

        // Propiedades adicionales para el perfil
        this.fechaNacimiento = fechaNacimiento;
        this.pais = pais;
        this.ciudad = ciudad;
        this.barrio = barrio;
        this.direccion = direccion;
    }

    /**
     * Intenta iniciar sesión con las credenciales proporcionadas.
     * @param {string} correo - El correo electrónico ingresado.
     * @param {string} contrasena - La contraseña ingresada.
     * @returns {boolean} True si las credenciales son correctas, false en caso contrario.
     */
    iniciarSesion(correo, contrasena) {
        // En un sistema real, se compararía el hash de la contraseña ingresada con el hash guardado
        if (this.correo === correo && this.contrasena === contrasena) {
            console.log(`Usuario ${this.nombre} ha iniciado sesión.`);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Registra un nuevo usuario (aquí solo simula el registro).
     * @returns {boolean} Siempre true en esta simulación.
     */
    registrarse() {
        console.log(`Usuario ${this.nombre} con correo ${this.correo} registrado.`);
        return true;
    }

    /**
     * Actualiza las propiedades del perfil del usuario con los nuevos datos.
     * @param {object} nuevosDatos - Objeto con las propiedades a actualizar (nombre, correo, fechaNacimiento, etc.).
     * @returns {boolean} True si la actualización fue exitosa.
     */
    actualizarPerfil(nuevosDatos) {
        if (nuevosDatos.nombre !== undefined) this.nombre = nuevosDatos.nombre;
        if (nuevosDatos.correo !== undefined) this.correo = nuevosDatos.correo;
        if (nuevosDatos.fechaNacimiento !== undefined) this.fechaNacimiento = nuevosDatos.fechaNacimiento;
        if (nuevosDatos.pais !== undefined) this.pais = nuevosDatos.pais;
        if (nuevosDatos.ciudad !== undefined) this.ciudad = nuevosDatos.ciudad;
        if (nuevosDatos.barrio !== undefined) this.barrio = nuevosDatos.barrio;
        if (nuevosDatos.direccion !== undefined) this.direccion = nuevosDatos.direccion;
        console.log(`Perfil de ${this.nombre} actualizado.`);
        return true;
    }

    /**
     * Permite al usuario cambiar su contraseña.
     * @param {string} contrasenaActual - La contraseña actual del usuario.
     * @param {string} nuevaContrasena - La nueva contraseña.
     * @returns {boolean} True si la contraseña se cambió correctamente, false si la contraseña actual es incorrecta.
     */
    cambiarContrasena(contrasenaActual, nuevaContrasena) {
        if (this.contrasena === contrasenaActual) { // Comparación simple, en un sistema real sería con hash
            this.contrasena = nuevaContrasena;
            console.log(`Contraseña de ${this.nombre} cambiada exitosamente.`);
            return true;
        } else {
            console.log("La contraseña actual es incorrecta.");
            return false;
        }
    }
}

// Clase Administrador: Hereda de Usuario y añade funcionalidades de gestión de sistema
export class Administrador extends Usuario {
    // El constructor de Administrador también ahora acepta los nuevos campos de perfil
    constructor(id, nombre, correo, contrasena, fechaNacimiento = '', pais = '', ciudad = '', barrio = '', direccion = '') {
        super(id, nombre, correo, contrasena, fechaNacimiento, pais, ciudad, barrio, direccion);
    }

    /**
     * Gestiona el inventario de un producto específico (añadir/reducir stock).
     * @param {Array<Producto>} productosArray - El array global de productos.
     * @param {number} productId - El ID del producto a gestionar.
     * @param {number} nuevaCantidad - La nueva cantidad de stock para el producto.
     * @returns {boolean} True si el inventario se gestionó, false si el producto no se encontró o la actualización falló.
     */
    gestionarInventario(productosArray, productId, nuevaCantidad) {
        const producto = productosArray.find(p => p.id === productId);
        if (producto) {
            const diferencia = nuevaCantidad - producto.stock;
            if (diferencia !== 0) {
                return producto.actualizarStock(diferencia);
            }
            console.log(`Stock de ${producto.nombre} ya es ${nuevaCantidad}. No se requiere actualización.`);
            return true; // No se hizo cambio pero no es un error
        } else {
            console.log(`Producto con ID ${productId} no encontrado.`);
            return false;
        }
    }

    /**
     * Muestra la lista de todos los usuarios registrados.
     * (Este método es más para fines de depuración o un panel de admin dedicado a usuarios).
     * @param {Array<Usuario|Administrador>} usuariosArray - El array global de usuarios.
     * @returns {Array<Usuario|Administrador>} El array de usuarios.
     */
    verUsuarios(usuariosArray) {
        console.log("Lista de Usuarios:");
        if (usuariosArray.length === 0) {
            console.log("No hay usuarios registrados.");
            return [];
        }
        usuariosArray.forEach(user => {
            console.log(`ID: ${user.id}, Nombre: ${user.nombre}, Correo: ${user.correo}`);
        });
        return usuariosArray;
    }

    /**
     * Elimina un usuario del sistema.
     * @param {Array<Usuario|Administrador>} usuariosArray - El array global de usuarios.
     * @param {number} id - El ID del usuario a eliminar.
     * @returns {boolean} True si se eliminó, false si no se encontró.
     */
    eliminarUsuario(usuariosArray, id) {
        const initialLength = usuariosArray.length;
        const index = usuariosArray.findIndex(user => user.id === id);
        if (index !== -1) {
            const usuarioEliminado = usuariosArray.splice(index, 1);
            console.log(`Usuario con ID ${id} (${usuarioEliminado[0].nombre}) eliminado.`);
            return true;
        } else {
            console.log(`Usuario con ID ${id} no encontrado.`);
            return false;
        }
    }

    /**
     * Agrega un nuevo producto al sistema.
     * @param {Array<Producto>} productosArray - El array global de productos.
     * @param {Producto} producto - La instancia del producto a agregar.
     * @returns {boolean} True si se agregó, false si ya existía.
     */
    agregarProducto(productosArray, producto) {
        if (producto instanceof Producto) {
            const productoExistente = productosArray.find(p => p.id === producto.id);
            if (productoExistente) {
                console.log(`Producto con ID ${producto.id} ya existe. Considera usar 'gestionarInventario' para actualizarlo.`);
                return false;
            } else {
                productosArray.push(producto);
                console.log(`Producto ${producto.nombre} agregado al sistema.`);
                return true;
            }
        } else {
            console.error("Solo se pueden agregar instancias de Producto.");
            return false;
        }
    }

    /**
     * Elimina un producto completamente del catálogo.
     * @param {Array<Producto>} productosArray - El array global de productos.
     * @param {number} productId - El ID del producto a eliminar.
     * @returns {boolean} True si se eliminó, false si no se encontró.
     */
    eliminarProducto(productosArray, productId) {
        const initialLength = productosArray.length;
        const index = productosArray.findIndex(p => p.id === productId);
        if (index !== -1) {
            const productoEliminado = productosArray.splice(index, 1);
            console.log(`Producto con ID ${productId} (${productoEliminado[0].nombre}) eliminado del catálogo.`);
            return true;
        } else {
            console.log(`Producto con ID ${productId} no encontrado en el catálogo.`);
            return false;
        }
    }
}