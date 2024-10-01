import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useSelector } from "react-redux";

import "../styles/weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Fetch = () => {
  const [current, setCurrent] = useState("");
  const [search, setSearch] = useState("delhi");
  const { isLoading, isError, data } = useSelector((state) => state.fetch);
  const [uniqueDates, setUniqueDates] = useState([]);

  useFetch(search);

  const handleSearch = () => {
    if (current && current.trim() !== "") {
      setSearch(current);
    }
  };

  useEffect(() => {
    if (data.list && data.list.length) {
      const uniqueDays = new Map();
      data.list.filter((item) => {
        const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
          month: "short",
          weekday: "long",
          day: "numeric",
        });

        console.log(date);

        if (!uniqueDays.has(date)) {
          uniqueDays.set(date, item);
        }

        setUniqueDates([...uniqueDays.values()]);
      });
    }
  }, [data.list]);

  console.log(data.city);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div id="app_wrapper">
      <h1>Discover the weather in </h1>
      <h1>every city you go</h1>

      <main id="weather">
        <div className="search_box">
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Enter city name"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        <div id="weather_container">
          {uniqueDates.slice(0, 3).map((item) => (
            <div className="weather_content" key={item.dt}>
              <p className="date">
                {new Date(item.dt_txt).toLocaleDateString("en-US", {
                  month: "short",
                  weekday: "long",
                  day: "numeric",
                })}
              </p>
              <p className="temp">
                {item.main.temp} <sup style={{ fontSize: "1rem" }}>&#8451;</sup>
              </p>
              <p className="sky">{item.weather[0].description}</p>
            </div>
          ))}
        </div>
      </main>
      <div id="weather_info">
        {data.city && (
          <div className="sunrise" key={data.city.id}>
            <p>
              {data.city.name} {data.city.country}
            </p>
            <div>
              <p> Sunrise</p>
              {new Date(data.city.sunrise).toLocaleTimeString("en-US", {
                hour: "numeric",
                day: "numeric",
                minute: "numeric",
              })}
            </div>
          </div>
        )}

        <div className="location">
          <p>
            {data.city.coord.lat}
            <span>N</span>{" "}
          </p>
          <p>
            {data.city.coord.lon}
            <span>E</span>{" "}
          </p>
        </div>

        <div className="sunset">
          <p>
            {data.city.name} {data.city.country}
          </p>
          <div>
            <p> Sunset</p>
            {new Date(data.city.sunset).toLocaleTimeString("en-US", {
              hour: "numeric",
              day: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fetch;
