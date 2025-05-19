// Clase Cuenta
class Cuenta {
  constructor(numeroCuenta) {
    this.numeroCuenta = numeroCuenta;
  }
}

// Clase Cliente
class Cliente {
  constructor(nombre, apellido, direccion, identificacion) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
    this.identificacion = identificacion;
    this.cuenta = null; // Se asigna luego
  }

  generarNumeroCuenta() {
    // Simula número de cuenta aleatorio de 10 dígitos
    const numero = Math.floor(1000000000 + Math.random() * 9000000000);
    this.cuenta = new Cuenta(numero);
  }
}

// DOM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formularioCliente");
  const resultado = document.getElementById("resultado");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const direccion = document.getElementById("direccion").value;
    const identificacion = document.getElementById("identificacion").value;

    // Crear cliente
    const cliente = new Cliente(nombre, apellido, direccion, identificacion);
    cliente.generarNumeroCuenta();

    // Mostrar resultado
    resultado.innerHTML = `
      <p>Cliente creado:</p>
      <ul>
        <li>Nombre: ${cliente.nombre} ${cliente.apellido}</li>
        <li>Dirección: ${cliente.direccion}</li>
        <li>Identificación: ${cliente.identificacion}</li>
        <li><strong>Número de Cuenta:</strong> ${cliente.cuenta.numeroCuenta}</li>
      </ul>
    `;

    form.reset();
  });
});
