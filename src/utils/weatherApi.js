export async function fetchWeatherData(location) {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Location not found or API error");
        }
        const data = await response.json();
        console.log("Raw API response:", data); // Debug log

        if (!data || !data.main || !data.weather || !data.sys) {
            throw new Error("Invalid API response structure");
        }

        return {
            name: data.name || "N/A",
            country: data.sys.country || "N/A",
            temp: data.main.temp || 0,
            feels_like: data.main.feels_like || 0,
            humidity: data.main.humidity || 0,
            wind_speed: data.wind.speed || 0,
            pressure: data.main.pressure || 0,
            visibility: data.visibility || 0,
            description: data.weather[0]?.description || "N/A",
            icon: data.weather[0]?.icon || "",
            sunrise: data.sys.sunrise ? data.sys.sunrise * 1000 : null,
            sunset: data.sys.sunset ? data.sys.sunset * 1000 : null,
            dt: data.dt ? data.dt * 1000 : null,
        };
    } catch (error) {
        console.log("Fetch error:", error);
        throw error;
    }
}