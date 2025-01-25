
import  { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Future.css"
import { FutureAPI } from "../services/RestAPI"; // Import FutureAPI from RestAPI

const Future = () => {
  const [future, setFuture] = useState(null); // Store tomorrow's weather
  const [city, setCity] = useState(""); // City input state
  const [error, setError] = useState(""); // Error handling state

  // Function to fetch the weather data for tomorrow using FutureAPI
  const futureWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError(""); // Clear any previous errors
      const response = await FutureAPI(city); // Call FutureAPI with the city
      const data = response.data; // Axios response contains the data in the 'data' field
      const tomorrow = data.forecast.forecastday[1]; // Index 1 corresponds to tomorrow
      setFuture(tomorrow); // Update state with tomorrow's weather
    } catch (err) {
      setError(err.message); // Set error message if fetch fails
      setFuture(null); // Clear any previous weather data on error
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state
        />
        <button className="btn btn-primary ms-2" onClick={futureWeather}>
          Search
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>} {/* Display error if any */}

      {future && (
        <div className="card weather-card mx-auto my-4">
          <div className="card-body">
            <h4 className="card-title">
              Weather Forecast for Tomorrow ({future.date})
            </h4>
            <div className="d-flex flex-column align-items-center">
              <div className="weather-icon">
                <img
                  src={future.day.condition.icon}
                  alt={future.day.condition.text}
                />
              </div>
              <div className="weather-temp my-2">
                Avg Temp: {future.day.avgtemp_c}°C
              </div>
              <div className="weather-text">{future.day.condition.text}</div>
              <div className="weather-details mt-3">
                <p>Max Temp: {future.day.maxtemp_c}°C</p>
                <p>Min Temp: {future.day.mintemp_c}°C</p>
                <p>Wind Speed: {future.day.maxwind_kph} kph</p>
                <p>Rain Probability: {future.day.daily_chance_of_rain}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Future;