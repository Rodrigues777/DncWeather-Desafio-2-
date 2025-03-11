document.getElementById("weatherForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const cep = document.getElementById("cep").value;
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const addressResult = document.getElementById("addressResult");
    const weatherResult = document.getElementById("weatherResult");

    // Validação do CEP
    if (cep.length !== 8 || isNaN(cep)) {
        alert("Por favor, insira um CEP válido!");
        return;
    }

    try {
        // Consulta ao ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const endereco = await response.json();

        if (endereco.erro) {
            addressResult.innerHTML = "<tr><td colspan='3'>CEP não encontrado.</td></tr>";
        } else {
            addressResult.innerHTML = `
                <tr>
                    <td>${endereco.logradouro || "N/A"}</td>
                    <td>${endereco.bairro || "N/A"}</td>
                    <td>${endereco.localidade} - ${endereco.uf}</td>
                </tr>
            `;
        }

        // Consulta ao Open-Meteo
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        weatherResult.textContent = `Previsão do tempo de acordo com a região: ${weatherData.current_weather.temperature}°C`;

    } catch (error) {
        alert("Erro ao buscar informações. Tente novamente.");
    }
});