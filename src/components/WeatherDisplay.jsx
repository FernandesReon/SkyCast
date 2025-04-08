import { formatDate, formatTime } from "../utils/dateUtils"
import "../styles//WeatherDisplay.css"

function WeatherDisplay({ data }) {
    if (!data) return null

    const {
        name,
        country,
        temp,
        feels_like,
        humidity,
        wind_speed,
        pressure,
        visibility,
        description,
        icon,
        sunrise,
        sunset,
        dt,
    } = data

    // Determine background gradient based on temperature
    const getTemperatureClass = (temp) => {
        if (temp < 5) return "cold"
        if (temp < 15) return "cool"
        if (temp < 25) return "mild"
        if (temp < 32) return "warm"
        return "hot"
    }

    const tempClass = getTemperatureClass(temp)

    return (
        <div className="weather-card">
            {/* Header with location and date */}
            <div className={`weather-header ${tempClass}`}>
                <div className="weather-header-content">
                    <div>
                        <h2 className="location-name">
                            {name}, {country}
                        </h2>
                        <p className="date">{formatDate(dt)}</p>
                    </div>
                    <div className="temperature-container">
                        <div className="temperature">{Math.round(temp)}°</div>
                        <p className="weather-description">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
                    </div>
                </div>
            </div>

            {/* Weather icon and feels like */}
            <div className="feels-like-container">
                <div className="feels-like-content">
                    <div className="weather-icon-container">
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} width={80} height={80} />
                    </div>
                    <div className="feels-like-text">
                        <p className="feels-like-label">Feels like</p>
                        <p className="feels-like-value">{Math.round(feels_like)}°</p>
                    </div>
                </div>
            </div>

            {/* Weather details grid */}
            <div className="weather-details">
                <WeatherDetail icon={<SunIcon />} title="Sunrise" value={formatTime(sunrise)} iconClass="icon-sunrise" />
                <WeatherDetail icon={<SunsetIcon />} title="Sunset" value={formatTime(sunset)} iconClass="icon-sunset" />
                <WeatherDetail icon={<DropletsIcon />} title="Humidity" value={`${humidity}%`} iconClass="icon-humidity" />
                <WeatherDetail icon={<WindIcon />} title="Wind Speed" value={`${wind_speed} m/s`} iconClass="icon-wind" />
                <WeatherDetail icon={<GaugeIcon />} title="Pressure" value={`${pressure} hPa`} iconClass="icon-pressure" />
                <WeatherDetail
                    icon={<EyeIcon />}
                    title="Visibility"
                    value={`${(visibility / 1000).toFixed(1)} km`}
                    iconClass="icon-visibility"
                />
            </div>
        </div>
    )
}

function WeatherDetail({ icon, title, value, iconClass }) {
    return (
        <div className="detail-item">
            <div className={`detail-icon ${iconClass}`}>{icon}</div>
            <div className="detail-text">
                <p className="detail-title">{title}</p>
                <p className="detail-value">{value}</p>
            </div>
        </div>
    )
}

// Icon components
function SunIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
    )
}

function SunsetIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 10V2"></path>
            <path d="m4.93 10.93 1.41 1.41"></path>
            <path d="M2 18h2"></path>
            <path d="M20 18h2"></path>
            <path d="m19.07 10.93-1.41 1.41"></path>
            <path d="M22 22H2"></path>
            <path d="m16 6-4 4-4-4"></path>
            <path d="M16 18a4 4 0 0 0-8 0"></path>
        </svg>
    )
}

function DropletsIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
        </svg>
    )
}

function WindIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
            <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
        </svg>
    )
}

function GaugeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 14 4-4"></path>
            <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
        </svg>
    )
}

function EyeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    )
}

export default WeatherDisplay
