function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');

    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cityName = data.name;
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;

            const resultHTML = `
                <h3>Weather in ${cityName}</h3>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${weatherDescription}</p>
            `;

            weatherResult.innerHTML = resultHTML;
        })
        .catch(error => console.error('Error:', error));
}
