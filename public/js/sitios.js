document.addEventListener('DOMContentLoaded', function () {
  fetchSitiosTuristicos();
});

function fetchSitiosTuristicos() {
  fetch('/api/sitios-turisticos')
    .then(response => response.json())
    .then(data => {
      const sitiosContainer = document.getElementById('sitios-container');
      sitiosContainer.innerHTML = ''; // Limpiar contenido previo

      if (data.length > 0) {
        data.forEach(sitio => {
          const sitioCard = document.createElement('div');
          sitioCard.classList.add('col-lg-4', 'col-md-6', 'mb-4');

          sitioCard.innerHTML = `
            <div class="card">
              <img src="${sitio.imagen_url}" class="card-img-top" alt="Imagen del sitio turístico">
              <div class="card-body">
                <h5 class="card-title">${sitio.name}</h5>
                <p class="card-text"><strong>Ubicación:</strong> ${sitio.location}</p>
                <p class="card-text">${sitio.description}</p>
              </div>
            </div>
          `;
          sitiosContainer.appendChild(sitioCard);
        });
      } else {
        sitiosContainer.innerHTML = '<p>No hay sitios turísticos disponibles en este momento.</p>';
      }
    })
    .catch(error => {
      console.error('Error al obtener los sitios turísticos:', error);
    });
}
