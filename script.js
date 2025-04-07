const apiKey = "d92fcc34c4b01f6c3c4cbd9705969e10";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if(response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch(data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/414/414927.png";
                break;
            case "Clear":
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3222/3222800.png";
                break;
            case "Rain":
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3351/3351979.png";
                break;
            case "Drizzle":
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3351/3351979.png";
                break;
            case "Mist":
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4151/4151022.png";
                break;
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
