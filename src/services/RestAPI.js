import axios from "axios";

const BaseURL = "https://api.weatherapi.com/v1";
const apiKey = "3ad780095a0c40848b755059240708";

//24 Hours Forecast by city
export const ForcastAPI = (city) => {
  return axios.get(`${BaseURL}/forecast.json?key=${apiKey}&q=${city}&days=24`);
};

// Calculate yesterday's date in 'YYYY-MM-DD' format
const getYesterdayDate = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1); // Set the date to yesterday
  return today.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
};

export const InstantAPI = (city) => {
  const yesterdayDate = getYesterdayDate(); // Get yesterday's date
  return axios.get(
    `${BaseURL}/history.json?key=${apiKey}&q=${city}&dt=${yesterdayDate}`
  );
};

//Next 24 Hours Weather

export const FutureAPI = (city) => {
  return axios.get(
    `${BaseURL}/forecast.json?key=${apiKey}&q=${city}&days=2&aqi=no&alerts=no`
  );
};