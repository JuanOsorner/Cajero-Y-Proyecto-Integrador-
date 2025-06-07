// models.js

// Clase Producto
export class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

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

// Clase Carrito
export class Carrito {
    constructor() {
        this.productos = []; // Lista de objetos { producto: Producto, cantidad: number }
    }

    agregarProducto(p) {
        if (p instanceof Producto) {
            const productoExistente = this.productos.find(item => item.producto.id === p.id);

            if (productoExistente) {
                if (p.stock > productoExistente.cantidad) { // Verificar si hay stock disponible para agregar otra unidad
                    productoExistente.cantidad++;
                    console.log(`Se agregó una unidad más de ${p.nombre} al carrito.`);
                } else {
                    console.log(`No hay suficiente stock de ${p.nombre} para agregar más al carrito.`);
                }
            } else {
                if (p.stock > 0) { // Solo añadir si hay stock inicial
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

    calcularTotal() {
        return this.productos.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    }
}

// Clase Usuario
export class Usuario {
    constructor(id, nombre, correo, contrasena) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
        this.carrito = new Carrito(); // Cada usuario tiene su propio carrito
    }

    iniciarSesion(correo, contrasena) {
        if (this.correo === correo && this.contrasena === contrasena) {
            console.log(`Usuario ${this.nombre} ha iniciado sesión.`);
            return true;
        } else {
            console.log("Credenciales incorrectas.");
            return false;
        }
    }

    registrarse() {
        console.log(`Usuario ${this.nombre} con correo ${this.correo} registrado.`);
        return true;
    }
}

// Clase Administrador (hereda de Usuario)
export class Administrador extends Usuario {
    constructor(id, nombre, correo, contrasena) {
        super(id, nombre, correo, contrasena);
    }

    gestionarInventario(productosArray, productId, nuevaCantidad) {
        const producto = productosArray.find(p => p.id === productId);
        if (producto) {
            // Usa el método de la clase Producto para actualizar el stock.
            // Si la nuevaCantidad es diferente al stock actual, actualiza por la diferencia.
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
}