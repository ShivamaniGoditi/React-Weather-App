import React from "react";
import { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import "./App.css";

const App = () => {
  const [Input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentDate = new Date();
    const date = `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    return date;
  };

  const apiKey = import.meta.env.VITE_API_KEY;
  const search = (e) => {
    if (e.key == "Enter") {
      (setInput(""),
        setWeather({ ...weather, loading: true }),
        axios
          .get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
              q: Input,
              units: "metric",
              appid: apiKey,
            },
          })
          .then((res) => {
            console.log(res);
            setWeather({ data: res.data, loading: false, error: false });
          })
          .catch((err) => {
            setWeather({ ...weather, data: {}, error: true });
          }));
    }
  };
  return (
    <div className="App">
      <div className="weatherApp">
        <div className="city-search">
          <input
            type="text"
            className="city"
            placeholder="Enter City name.."
            value={Input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={search}
          />
        </div>
        {weather.loading && (
          <Oval type="Oval" color="green" height={70} width={70} />
        )}
        {weather.error && (
          <div className="error-message">
            <span>City Not Found</span>
          </div>
        )}
        {weather && weather.data && weather.data.main && (
          <div>
            <div className="city-name">
              <h1>
                {weather.data.name},<span>{weather.data.sys.country}</span>
              </h1>
            </div>
            <div className="date">
              <span>{toDate()}</span>
            </div>
            <div className="icon-temp">
              <img
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt=""
              ></img>
            </div>
            <div className="degree">
              {Math.round(weather.data.main.temp)}
              <sup className="deg">°C</sup>
            </div>
            <div className="des-wind">
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
            </div>
            <div className="wind">
              <p>Wind Speed: {weather.data.wind.speed}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
