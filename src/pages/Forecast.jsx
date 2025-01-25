
import  { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ForcastAPI } from "../services/RestAPI";

import './Forecast.css';
import Spinner from "../utils/Spinner";

const ForeCast = () => {
    const [forecast, setForecast] = useState([]);
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    const fetchWeather = () => {
        setShowSpinner(true);
        ForcastAPI(city)
            .then((response) => {
                setForecast(response.data.forecast.forecastday[0].hour);
                setError("");
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to fetch weather data. Please try again.");
            })
            .finally(() => {
                setShowSpinner(false);
            });
    };

    return (
        <>
            {showSpinner && <Spinner />}
            <div className="container-fluid py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button className="btn btn-primary ms-2" onClick={fetchWeather}>
                        Search
                    </button>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="row justify-content-center">
                    {forecast.map((hour, index) => (

                        <div className="col-12 col-sm-6 col-md-3 my-2" key={index}>
                            <div className="card weather-card" style={{ width: "65%", height: "85%", padding: "10px" }}>
                                <div className="card-body">
                                    <div className="weather-grid">
                                        <div className="weather-time">
                                            {new Date(hour.time).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </div>
                                        <div className="weather-temp justfy-content-center align-items-center">{hour.temp_c}°C</div>
                                        <div className="weather-icon justfy-content-center align-items-center">
                                            <img src={hour.condition.icon} alt={hour.condition.text} />
                                        </div>
                                        <div className="weather-text" style={{ textAlign: "center" }}>{hour.condition.text}</div>
                                        <div className="weather-wind" style={{ textAlign: "center" }}>Wind: {hour.wind_kph} kph</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ForeCast;