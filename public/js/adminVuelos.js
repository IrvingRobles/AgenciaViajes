document.addEventListener("DOMContentLoaded", function() {
    fetchVuelos();

    const formAddVuelo = document.getElementById("form-add-vuelo");

    formAddVuelo.addEventListener("submit", async function(event) {
        event.preventDefault();

        const vueloData = {
            aerolinea: document.getElementById("vuelo-aerolinea").value,
            origen: document.getElementById("vuelo-origen").value,
            destino: document.getElementById("vuelo-destino").value,
            fecha: document.getElementById("vuelo-fecha").value,
            precio: document.getElementById("vuelo-precio").value
        };

        try {
            const response = await fetch("/api/admin/vuelos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(vueloData)
            });
            const data = await response.json();

            if (response.ok) {
                alert("Vuelo agregado con éxito");
                fetchVuelos();
            } else {
                alert("Error al agregar el vuelo: " + data.message);
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    });
});

async function fetchVuelos() {
    try {
        const response = await fetch("/api/vuelos");
        const vuelos = await response.json();

        const vuelosList = document.getElementById("vuelos-list");
        vuelosList.innerHTML = "";

        vuelos.forEach(vuelo => {
            const vueloItem = document.createElement("div");
            vueloItem.classList.add("vuelo-item", "mb-3", "p-2", "border");

            vueloItem.innerHTML = `
                <h5>${vuelo.aerolinea}</h5>
                <p><strong>Origen:</strong> ${vuelo.origen}</p>
                <p><strong>Destino:</strong> ${vuelo.destino}</p>
                <p><strong>Fecha:</strong> ${vuelo.fecha}</p>
                <p><strong>Precio:</strong> $${vuelo.precio}</p>
                <button class="btn btn-danger btn-sm mt-2" onclick="deleteVuelo(${vuelo.id})">Eliminar</button>
            `;

            vuelosList.appendChild(vueloItem);
        });
    } catch (error) {
        console.error("Error al cargar vuelos:", error);
    }
}

async function deleteVuelo(vueloId) {
    if (confirm("¿Estás seguro de que deseas eliminar este vuelo?")) {
        try {
            const response = await fetch(`/api/admin/vuelos/${vueloId}`, {
                method: "DELETE",
            });
            const data = await response.json();

            if (response.ok) {
                alert("Vuelo eliminado con éxito");
                fetchVuelos();
            } else {
                alert("Error al eliminar el vuelo: " + data.message);
            }
        } catch (error) {
            console.error("Error al eliminar el vuelo:", error);
        }
    }
}
