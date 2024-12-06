document.addEventListener("DOMContentLoaded", async function () {
  try {
      const response = await fetch('/api/check-role');
      const data = await response.json();

      if (data.role === 'admin') {
          const adminLinks = document.getElementById("admin-links");

          adminLinks.innerHTML = `
              <a href="/admin/hoteles" class="nav-item nav-link">Admin Hoteles</a>
              <a href="/admin/sitios-turisticos" class="nav-item nav-link">Admin Sitios Turísticos</a>
              <a href="/admin/vuelos" class="nav-item nav-link">Admin Vuelos</a>
              <a href="/logout" class="nav-item nav-link">Cerrar Sesión</a>
          `;
      }
  } catch (error) {
      console.error("Error al verificar el rol de usuario:", error);
  }
});
