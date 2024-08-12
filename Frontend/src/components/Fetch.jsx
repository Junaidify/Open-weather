import "../styles/weather.css";
import { useSelector } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeart,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import day from "../images/day.jpg";
import night from "../images/night2.jpg";

const Fetch = () => {
  const { isLoading, isError, data } = useSelector((state) => state.fetch);
  const [searchCity, setSearchCity] = useState("");
  const [currentCity, setCurrentCity] = useState("delhi");
  const [saveToWishList, setSaveToWishList] = useState(null);
  const { city, list } = data || {};
  const cityRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [time, setTime] = useState(new Date());

  useFetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=535adb5939080eb74a7dd06ad6ffe5e3`
  );

  useEffect(() => {
    if (saveToWishList) {
      axios
        .post("https://open-weather-bpgp.onrender.com/cities", {
          city: saveToWishList,
          country: city.country,
          temp: list[0].main.temp,
          feels_like: list[0].main.feels_like,
          icon: list[0].weather[0].icon,
          humidity: list[0].main.humidity,
          description: list[0].weather[0].description,
        })
        .then((response) => {
          console.log("City saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving city:", error);
        });
    }
  }, [saveToWishList, city, list]);

  const handleSaveCityToWishlist = () => {
    setSaveToWishList(currentCity);
    alert("City added to wishlist");
  };

  useEffect(() => {
    const getSearchedCity = localStorage.getItem("currentCity");
    if (getSearchedCity && searchCity.length < 5) {
      localStorage.setItem("currentCity", searchCity);
    }
  }, [searchCity]);

  const handleSearchCity = () => {
    setCurrentCity(searchCity);
    setSearchCity("");
  };

  useEffect(() => {
    if (cityRef.current) {
      const slideWidth =
        cityRef.current.clientWidth / cityRef.current.children.length;
      cityRef.current.style.transition = "transform 0.5s ease-in-out";
      cityRef.current.style.transform = `translateX(-${
        slideIndex * slideWidth
      }px)`;
    }
  }, [slideIndex]);

  const handlePrev = () => {
    slideIndex > 0 &&
      setSlideIndex((prev) =>
        prev === 0 ? cityRef.current.children.length - 1 : prev - 1
      );
  };

  const handleNext = () => {
    slideIndex < cityRef.current.children.length - 1 &&
      setSlideIndex((prev) =>
        prev === cityRef.current.children.length - 1 ? 0 : prev + 1
      );
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

  if (!list || list.length === 0) return <h1>No data available</h1>;

  const temp = kelvinToCelsius(list[0].main.temp);
  const feels_like = kelvinToCelsius(list[0].main.feels_like);

  return (
    <>
      <div
        id="wrapper"
        style={{ backgroundImage: time < 18 ? `url(${night})` : `url(${day})` }}
      >
        <div id="container">
          <div key={city?.id}>
            <p>
              <FontAwesomeIcon icon={faLocationDot} /> {city?.name}{" "}
              {city?.country}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "0.5vh",
              }}
            >
              <p
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "1vh",
                  marginTop: "0.2vh",
                }}
              >
                {temp}°C
              </p>
              <p style={{ fontWeight: "bold" }}>
                <span style={{ fontWeight: "normal", marginRight: "0.3vw" }}>
                  feels like:
                </span>{" "}
                {feels_like}°C
              </p>
              <p style={{ fontWeight: "bold" }}>
                <span style={{ fontWeight: "normal", marginRight: "0.3vw" }}>
                  humidity:
                </span>{" "}
                {list[0].main.humidity}%
              </p>
              <p style={{ fontWeight: "bold" }}>
                <span style={{ fontWeight: "normal", marginRight: "0.3vw" }}>
                  Weather:
                </span>{" "}
                {list[0].weather[0].description}
              </p>
              <p style={{ fontWeight: "bold" }}>
                <span style={{ fontWeight: "normal", marginRight: "0.3vw" }}>
                  Wind Speed:
                </span>{" "}
                {list[0].wind.speed} m/s
              </p>
            </div>
          </div>
          <div id="search">
            <div>
              <input
                value={searchCity}
                type="text"
                placeholder="Enter city"
                onChange={(e) => setSearchCity(e.target.value)}
              />
              <button onClick={handleSearchCity}>Search</button>
            </div>
            <p className="wishlist_icon" onClick={handleSaveCityToWishlist}>
              <FontAwesomeIcon icon={faHeart} />
            </p>
          </div>
          <div id="forecast">
            <div className="carousel" ref={cityRef}>
              {list.map((item) => (
                <div key={item.dt} className="forecast_card">
                  <p>{new Date(item.dt * 1000).toLocaleString()}</p>
                  <p
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "1vh",
                      marginTop: "0.2vh",
                    }}
                  >
                    {kelvinToCelsius(item.main.temp)} °C
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    <span
                      style={{ fontWeight: "normal", marginRight: "0.3vw" }}
                    >
                      feels like:
                    </span>{" "}
                    {kelvinToCelsius(item.main.feels_like)} °C
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    <span
                      style={{ fontWeight: "normal", marginRight: "0.3vw" }}
                    >
                      humidity:
                    </span>{" "}
                    {item.main.humidity} %
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    <span
                      style={{ fontWeight: "normal", marginRight: "0.3vw" }}
                    >
                      Weather:
                    </span>{" "}
                    {item.weather[0].description}
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    <span
                      style={{ fontWeight: "normal", marginRight: "0.3vw" }}
                    >
                      Wind Speed:
                    </span>{" "}
                    {item.wind.speed} m/s
                  </p>
                </div>
              ))}
            </div>
            <button className="prev" onClick={handlePrev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="next" onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fetch;
