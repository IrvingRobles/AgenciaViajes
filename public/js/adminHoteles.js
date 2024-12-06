document.addEventListener("DOMContentLoaded", function() {
    fetchHoteles();

    const form = document.getElementById('hotel-form');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Recolectar los datos del formulario
        const formData = {
            name: document.getElementById("hotel-name").value,
            location: document.getElementById("hotel-location").value,
            price: document.getElementById("hotel-price").value,
            image: document.getElementById("hotel-image").value
        };

        try {
            // Enviar la solicitud POST para crear un nuevo hotel
            const response = await fetch("/api/admin/hoteles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                alert("Hotel agregado con éxito");
                form.reset(); // Limpiar el formulario después de enviar
                fetchHoteles(); // Actualizar la lista de hoteles
            } else {
                alert("Error al agregar el hotel: " + data.message);
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    });
});

async function fetchHoteles() {
    try {
        // Solicitar la lista de hoteles desde el servidor
        const response = await fetch("/api/hoteles");
        const hoteles = await response.json();

        // Limpiar la lista de hoteles en el DOM
        const hotelesList = document.getElementById("hoteles-list");
        hotelesList.innerHTML = "";

        // Crear los elementos de cada hotel
        hoteles.forEach(hotel => {
            const hotelItem = document.createElement("div");
            hotelItem.classList.add("hotel-item", "mb-3", "p-2", "border");

            hotelItem.innerHTML = `
                <h5>${hotel.name}</h5>
                <p><strong>Ubicación:</strong> ${hotel.location}</p>
                <p><strong>Precio:</strong> $${hotel.price} por noche</p>
                <img src="${hotel.imagen_url}" alt="Imagen del hotel" style="width: 150px; height: auto;">
                <button class="btn btn-danger btn-sm mt-2" onclick="deleteHotel(${hotel.id})">Eliminar</button>
            `;

            hotelesList.appendChild(hotelItem);
        });
    } catch (error) {
        console.error("Error al cargar hoteles:", error);
    }
}

async function deleteHotel(hotelId) {
    if (confirm("¿Estás seguro de que deseas eliminar este hotel?")) {
        try {
            // Enviar solicitud DELETE para eliminar el hotel
            const response = await fetch(`/api/admin/hoteles/${hotelId}`, {
                method: "DELETE",
            });
            const data = await response.json();

            if (response.ok) {
                alert("Hotel eliminado con éxito");
                fetchHoteles(); // Actualizar la lista de hoteles después de eliminar
            } else {
                alert("Error al eliminar el hotel: " + data.message);
            }
        } catch (error) {
            console.error("Error al eliminar el hotel:", error);
        }
    }
}
