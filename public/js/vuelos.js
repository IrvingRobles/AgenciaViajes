document.addEventListener("DOMContentLoaded", () => {
  fetchVuelos();
});

function fetchVuelos() {
  fetch('/api/vuelos')
    .then(response => response.json())
    .then(data => {
      const vuelosContainer = document.getElementById('vuelos-container');
      vuelosContainer.innerHTML = ''; // Limpiar contenido previo

      data.forEach(vuelo => {
        const vueloCard = document.createElement('div');
        vueloCard.classList.add('card', 'mb-3');
        vueloCard.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">Vuelo de ${vuelo.origen} a ${vuelo.destino}</h5>
            <p class="card-text"><strong>Aerolínea:</strong> ${vuelo.aerolinea}</p>
            <p class="card-text"><strong>Fecha:</strong> ${vuelo.fecha}</p>
            <p class="card-text"><strong>Precio:</strong> $${vuelo.precio}</p>
          </div>
        `;
        vuelosContainer.appendChild(vueloCard);
      });
    })
    .catch(error => {
      console.error('Error al obtener los vuelos:', error);
    });
}
