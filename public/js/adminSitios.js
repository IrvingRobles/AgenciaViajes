document.addEventListener("DOMContentLoaded", function() {
    fetchSitiosTuristicos();

    const form = document.getElementById('sitio-form');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("sitio-name").value,
            location: document.getElementById("sitio-location").value,
            description: document.getElementById("sitio-description").value,
            imagen_url: document.getElementById("sitio-image").value // Asegúrate de que coincida con la columna en la BD
        };

        try {
            const response = await fetch("/api/admin/sitios-turisticos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                alert("Sitio turístico agregado con éxito");
                form.reset(); // Limpiar el formulario después de enviar
                fetchSitiosTuristicos(); // Actualizar la lista de sitios turísticos
            } else {
                alert("Error al agregar el sitio turístico: " + data.message);
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    });
});

async function fetchSitiosTuristicos() {
    try {
        const response = await fetch("/api/sitios-turisticos");
        const sitios = await response.json();

        const sitiosList = document.getElementById("sitios-list");
        sitiosList.innerHTML = ""; // Limpiar lista

        sitios.forEach(sitio => {
            const sitioItem = document.createElement("div");
            sitioItem.classList.add("sitio-item", "mb-3", "p-2", "border");

            sitioItem.innerHTML = `
                <h5>${sitio.name}</h5>
                <p><strong>Ubicación:</strong> ${sitio.location}</p>
                <p>${sitio.description}</p>
                <img src="${sitio.imagen_url}" alt="Imagen del sitio" style="width: 150px; height: auto;">
                <button class="btn btn-danger btn-sm mt-2" onclick="deleteSitio(${sitio.id})">Eliminar</button>
            `;

            sitiosList.appendChild(sitioItem);
        });
    } catch (error) {
        console.error("Error al cargar sitios turísticos:", error);
    }
}

async function deleteSitio(sitioId) {
    if (confirm("¿Estás seguro de que deseas eliminar este sitio turístico?")) {
        try {
            const response = await fetch(`/api/admin/sitios-turisticos/${sitioId}`, {
                method: "DELETE",
            });
            const data = await response.json();

            if (response.ok) {
                alert("Sitio turístico eliminado con éxito");
                fetchSitiosTuristicos(); // Actualizar la lista de sitios turísticos después de eliminar
            } else {
                alert("Error al eliminar el sitio turístico: " + data.message);
            }
        } catch (error) {
            console.error("Error al eliminar el sitio turístico:", error);
        }
    }
}
