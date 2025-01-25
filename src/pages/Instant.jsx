


import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { InstantAPI } from "../services/RestAPI"; // Adjusted to fetch yesterday's weather data
import "./Instant.css";

const Instant = () => {
    const [Instant, setInstant] = useState(null); // Initialize as null
    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const instantWeather = () => {
        if (!city) {
            setError("Please enter a city name.");
            return;
        }
        InstantAPI(city) // Fetch yesterday's weather data from the API
            .then((response) => {
                if (response.data) {
                    setInstant(response.data); // Set the response data to state
                    setError(""); // Clear any previous errors
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Unable to fetch weather data. Please check the city name or API key.");
                setInstant(null); // Reset instant data in case of error
            });
    };

    return (
        <>
            <div className="container-fluid py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button className="btn btn-primary ms-2" onClick={instantWeather}>
                        Search
                    </button>
                </div>
                <div className="imagecontroler">
                    {error && <div className="alert alert-danger">{error}</div>}

                    {/* Ensure 'instant' is not null before rendering */}
                    {Instant && (
                        <div className="d-flex justify-content-center">
                            <div className="card weather-card mx-2 my-2" style={{ maxWidth: "350px" }}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Yesterday Weather in {Instant.location.name}
                                    </h5>
                                    <div className="d-flex justify-content-center mb-3">
                                        {/* Optionally, display weather icons */}
                                        {Instant.forecast && Instant.forecast.forecastday[0].day.condition && (
                                            <img
                                                className="weather-icon"
                                                src={Instant.forecast.forecastday[0].day.condition.icon}
                                                alt="Weather Icon"
                                            />
                                        )}
                                    </div>
                                    <p className="card-text">
                                        <strong>{Instant.forecast.forecastday[0].day.condition.text}</strong>
                                    </p>
                                    <p className="card-text">
                                        Temperature: {Instant.forecast.forecastday[0].day.avgtemp_c}°C
                                    </p>
                                    <p className="card-text">
                                        Humidity: {Instant.forecast.forecastday[0].day.avghumidity}%
                                    </p>
                                    <p className="card-text">
                                        Wind: {Instant.forecast.forecastday[0].day.maxwind_kph} km/h
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Instant;