document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/hoteles')
      .then(response => response.json())
      .then(data => {
        const hotelesContainer = document.getElementById('hoteles-container');
        hotelesContainer.innerHTML = ''; 
  
        if (data.length > 0) {
          data.forEach(hotel => {
            const hotelCard = document.createElement('div');
            hotelCard.classList.add('col-lg-4', 'col-md-6', 'mb-4');
  
            hotelCard.innerHTML = `
              <div class="card">
                <img src="${hotel.imagen_url}" class="card-img-top" alt="Imagen del hotel">
                <div class="card-body">
                  <h5 class="card-title">${hotel.name}</h5>
                  <p class="card-text">${hotel.description}</p>
                  <p class="card-text">Ubicación: ${hotel.location}</p>
                  <p class="card-text">Precio: $${hotel.price}</p>
                </div>
              </div>
            `;
            hotelesContainer.appendChild(hotelCard);
          });
        } else {
          hotelesContainer.innerHTML = '<p>No hay hoteles disponibles en este momento.</p>';
        }
      })
      .catch(error => {
        console.error('Error al obtener los hoteles:', error);
      });
  });
  //<a href="#" class="btn btn-primary">Reservar</a>
