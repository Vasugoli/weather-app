import WeatherMetric from "./WeatherMetric.jsx";
import './weatheCard.css';
import searchIcon from '../assets/search.png';
import humidityIcon from '../assets/humidity-icon.png';
import windIcon from '../assets/wind-icon.png';
import tempIcon from '../assets/temp-icon.png';
import locIcon from '../assets/loct-icon.png';
import { useEffect, useState } from "react";
import axios from "axios";

function WeatherCard() {
    const [icon, setIcon] = useState("04n");
    const [image, setImage] = useState("");
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState(null);
    const [metrics, setMetrics] = useState([
        { value: "--", label: "Humidity", icon: humidityIcon, iconAlt: "humidity icon" },
        { value: "--", label: "Wind", icon: windIcon, iconAlt: "wind icon" }
    ]);

    // Fetch weather data
    useEffect(() => {
        if (!city) return; // Prevent API call on empty city input

        const fetchData = async () => {
            try {
                const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                    params: {
                        q: city,
                        appid: WEATHER_API_KEY,
                        units: 'metric'
                    }
                });

                const data = response.data;
                setTemperature(data.main.temp); // Set temperature
                setMetrics([
                    { value: `${data.main.humidity}%`, label: "Humidity", icon: humidityIcon, iconAlt: "humidity icon" },
                    { value: `${data.wind.speed} m/s`, label: "Wind", icon: windIcon, iconAlt: "wind icon" }
                ]);
                setIcon(data.weather[0].icon);
                // fetchImage(data.weather[0].icon); // Fetch weather icon
                fetchImage(icon);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setTemperature("--");
                setMetrics([
                    { value: "--", label: "Humidity", icon: humidityIcon, iconAlt: "humidity icon" },
                    { value: "--", label: "Wind", icon: windIcon, iconAlt: "wind icon" }
                ]);
            }
        };

        fetchData();
    }, [city]);

    // Fetch weather icon
    const fetchImage = async (iconCode) => {
        try {
            const response = await axios.get(`https://openweathermap.org/img/wn/${iconCode}.png`, {
                responseType: 'blob'
            });
            const imageUrl = URL.createObjectURL(response.data);
            setImage(imageUrl);
        } catch (error) {
            console.error("Error fetching weather icon:", error);
        }
    };

    return (
        <div className="weather-card">
            <div className="weather-card-name">Weather Flow</div>

            <form className="weather-card-input" onSubmit={(e) => e.preventDefault()}>
                <input
                    id="cityInput"
                    type="text"
                    placeholder="Enter the city"
                    className="weather-card-search-bar"
                />
                <img
                    loading="lazy"
                    src={searchIcon}
                    alt="search icon"
                    className="weather-card-search-icon"
                    onClick={() => setCity(document.querySelector("#cityInput").value.trim())}
                />
            </form>

            <div className="grid-box">
                {image && <img className="weather-card-main-icon" src={image} alt="weather icon" />}
            </div>

            <div className="weather-card-info">
                <div className="weather-card-temp">
                    <img
                        loading="lazy"
                        src={tempIcon}
                        alt="temperature icon"
                        className="weather-card-temp-icon"
                    />
                    <div className="weather-card-temp-number">{temperature} °C</div>
                </div>

                <div className="weather-card-loct">
                    <img
                        loading="lazy"
                        src={locIcon}
                        alt="location marker"
                        className="weather-card-loct-icon"
                    />
                    <div className="weather-card-loct-text">{city || "Location"}</div>
                </div>
            </div>

            <div className="weather-card-metrics">
                {metrics.map((metric, index) => (
                    <WeatherMetric
                        key={index}
                        value={metric.value}
                        label={metric.label}
                        icon={metric.icon}
                        iconAlt={metric.iconAlt}
                    />
                ))}
            </div>
        </div>
    );
}

export default WeatherCard;
