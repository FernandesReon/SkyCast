import { useState } from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import SearchBar from "../components/SearchBar";
import { fetchWeatherData } from "../utils/weatherApi";
import Footer from "../components/Footer";

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (location) => {
        if (!location.trim()) return;

        try {
            setLoading(true);
            setError("");
            const data = await fetchWeatherData(location);
            console.log("Fetched data:", data); // Debug log
            if (data) {
                setWeatherData(data);
            } else {
                setError("No data returned from API.");
                setWeatherData(null);
            }
        } catch (err) {
            console.log("Error fetching data:", err); // Debug log
            setError("Failed to fetch weather data. Please try again.");
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <main className="main">
                <div className="container">
                    <h1 className="title">DriftSky</h1>
                    <SearchBar onSearch={handleSearch} />

                    {loading && (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                        </div>
                    )}

                    {error && <div className="error-message">{error}</div>}

                    {weatherData && !loading && (
                        console.log("Rendering WeatherDisplay with data:", weatherData), // Debug log
                        <WeatherDisplay data={weatherData} />
                    )}

                    {!weatherData && !loading && !error && (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="64"
                                    height="64"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                                </svg>
                            </div>
                            <p>Enter a location to see the weather forecast</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default WeatherApp;