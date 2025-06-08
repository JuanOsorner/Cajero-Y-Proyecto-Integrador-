// models.js

// Clase Producto: Representa un producto en el sistema
export class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;             // Identificador único del producto
        this.nombre = nombre;     // Nombre del producto
        this.precio = precio;     // Precio unitario del producto
        this.stock = stock;       // Cantidad disponible en inventario
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

// Clase Carrito: Representa el carrito de compras de un usuario
export class Carrito {
    constructor() {
        // Lista de objetos, cada uno con { producto: Producto, cantidad: number }
        this.productos = [];
    }

    /**
     * Agrega un producto al carrito. Si ya existe, incrementa la cantidad.
     * Realiza una validación básica de stock.
     * @param {Producto} p - La instancia del producto a añadir.
     */
    agregarProducto(p) {
        if (p instanceof Producto) {
            const productoExistente = this.productos.find(item => item.producto.id === p.id);

            if (productoExistente) {
                // Si el producto ya está en el carrito, incrementa la cantidad
                // Se verifica contra el stock total del producto 'p'
                if (p.stock > productoExistente.cantidad) {
                    productoExistente.cantidad++;
                    console.log(`Se agregó una unidad más de ${p.nombre} al carrito.`);
                } else {
                    console.log(`No hay suficiente stock de ${p.nombre} para agregar más al carrito.`);
                }
            } else {
                // Si el producto no está en el carrito, lo añade con cantidad 1
                if (p.stock > 0) { // Solo añadir si hay stock inicial disponible
                    this.productos.push({ producto: p, cantidad: 1 });
                    console.log(`${p.nombre} agregado al carrito.`);
                } else {
                    console.log(`No hay stock de ${p.nombre} para agregar al carrito.`);
                }
            }
        } else {
            console.error("Solo se pueden agregar instancias de Producto al carrito.");
        }
    }

    /**
     * Elimina un producto completamente del carrito.
     * @param {number} id - El ID del producto a eliminar.
     * @returns {boolean} True si se eliminó, false si no se encontró.
     */
    eliminarProducto(id) {
        const initialLength = this.productos.length;
        this.productos = this.productos.filter(item => item.producto.id !== id);
        if (this.productos.length < initialLength) {
            console.log(`Producto con ID ${id} eliminado del carrito.`);
            return true;
        } else {
            console.log(`Producto con ID ${id} no encontrado en el carrito.`);
            return false;
        }
    }

    /**
     * Calcula el valor total de todos los productos en el carrito.
     * @returns {number} El total del carrito.
     */
    calcularTotal() {
        return this.productos.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    }
}

// Clase Usuario: Representa a un usuario registrado en el sistema
export class Usuario {
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
            // console.log("Credenciales incorrectas."); // Se maneja en el JS que llama
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
                console.log(`Producto con ID ${producto.id} ya existe. Considera usar 'gestionarInventario' para actualizar el stock.`);
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