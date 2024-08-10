import { useSelector } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import "../styles/weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Fetch = () => {
  useFetch();
  const { isLoading, isError, data } = useSelector((state) => state.fetch);
  const [currentCity, setCurrentCity] = useState("Delhi");

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  const weatherData = data?.list?.[0];
  const city = data?.city;

  const roundTemperature = (temp) => (temp - 273.15).toFixed(1);

  return (
    <>
      <div id="weather_wrapper">
        <div id="weather_wrapper_child">
          <div id="weather_container_parent">
            <div id="weather_container">
              <div>
                {city ? (
                  <div
                    style={{
                      display: "flex",
                      fontSize: "1.1rem",
                      columnGap: "0.5rem",
                    }}
                  >
                    <p>
                      <FontAwesomeIcon icon={faLocationDot} /> {city.name}
                    </p>
                    <p> {city.country}</p>
                  </div>
                ) : (
                  <p>No city data available</p>
                )}
              </div>
              <div>
                {weatherData ? (
                  <>
                    <p className="temp">
                      {roundTemperature(weatherData.main?.temp)}°C
                    </p>
                    <p className="weather_details_parent">
                      <span className="weather_details">Feels Like:</span>{" "}
                      {roundTemperature(weatherData.main?.feels_like)}
                      °C
                    </p>
                    <p className="weather_details_parent">
                      <span className="weather_details">Weather:</span>{" "}
                      {weatherData.weather?.[0]?.description || "N/A"}
                    </p>
                    <p className="weather_details_parent">
                      <span className="weather_details">Wind Speed:</span>{" "}
                      {weatherData.wind?.speed || "N/A"} m/s
                    </p>
                    <p className="weather_details_parent">
                      <span className="weather_details">Humidity:</span>{" "}
                      {weatherData.main?.humidity || "N/A"}%
                    </p>
                    <p className="weather_details_parent">
                      <span className="weather_details">
                        {" "}
                        Rain (last 3 hours):
                      </span>{" "}
                      {weatherData.rain?.["3h"] || "0"} mm
                    </p>
                  </>
                ) : (
                  <p>No weather data available</p>
                )}
              </div>
            </div>
            <div id="weather_container_2">
              <input value={city} type="text" placeholder="Enter City" onChange={(e) => setCurrentCity(e.target.value) } />
              <button
                style={{
                  border: "none",
                  borderRadius: "5px",
                }}
             
              >
                Search
              </button>
            </div>
          </div>
          <div id="weather_forecast">
            {data && data.list && data.list.length > 0 ? (
              data.list.map((item) => (
                <div key={item.dt} className="weather_forecast_daily">
                  <p className="weather_forecast_children_temp">
                    {item.main.temp}°C
                  </p>

                  <p className="weather_forecast_children">
                    {" "}
                    <span className="weather_details_2">
                      Feels Like: {item.weather[0].description}
                    </span>
                  </p>
                  <p className="weather_forecast_children">
                    {" "}
                    <span className="weather_details_2">Feels Like:</span>
                    {item.main.feels_like}°F
                  </p>
                  <p className="weather_forecast_children">
                    <span className="weather_details_2">Min:</span>
                    {item.main.temp_min}°F
                  </p>
                  <p className="weather_forecast_children">
                    <span className="weather_details_2">Max:</span>
                    {item.main.temp_max}°F
                  </p>
                  <p className="weather_forecast_children">
                    <span className="weather_details_2">Humidity:</span>
                    {item.main.humidity}°C
                  </p>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Fetch;
