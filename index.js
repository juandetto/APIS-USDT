document.addEventListener("DOMContentLoaded", function () {
    // URL de la API de CriptoYa
    const apiUrl = "https://criptoya.com/api/buenbit/usd/ars/0.1";

    // Elementos de la página donde se mostrarán los precios de bid y ask
    const bidPriceElement = document.getElementById("bidPrica");
    const askPriceElement = document.getElementById("askPrice");

    // Realizar la solicitud a la API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Actualizar los elementos de la página con los datos de la API
            bidPriceElement.textContent = data.bid;
            askPriceElement.textContent = data.ask;
        })
        .catch((error) => {
            console.error("Error al obtener los datos de la API: ", error);
        });
});