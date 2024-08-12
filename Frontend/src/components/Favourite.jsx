import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useSelector } from "react-redux";
import "../styles/favourite.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Favourite = () => {
  useFetch(`https://open-weather-bpgp.onrender.com/cities`);
  const { isLoading, isError, data } = useSelector((state) => state.fetch);
  const [deleteCityId, setDeleteCityId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (deleteCityId !== null) {
      axios
        .delete(`https://open-weather-bpgp.onrender.com/cities/${deleteCityId}`)
        .then((res) => {
          console.log(res.data);
          setDeleteCityId(null);
          setIsDeleted(true);
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [deleteCityId]);

  if (isDeleted) {
    alert("City deleted");
    setIsDeleted(false);
  }

  const handleDelete = (cityId) => {
    setDeleteCityId(cityId);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  console.log(data)

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "3vh auto 1vh",
        }}
      >
        Favourite
      </h1>
      <div id="fav_container">
        {data.map((city) => (
          <div key={city.id} id="fav_card">
            <p>
              <strong style={{ color: "gray", fontSize: "1.2rem" }}>
                City:
              </strong>{" "}
              {city.city}
            </p>
            <p>
              <strong style={{ color: "gray", fontSize: "1.2rem" }}>
                Country:
              </strong>{" "}
              {city.country}
            </p>
            <p>
              <strong style={{ color: "gray", fontSize: "1.2rem" }}>
                Temperature:
              </strong>{" "}
              {city.temp}
            </p>
            <p>
              <strong style={{ color: "gray", fontSize: "1.2rem" }}>
                Feels like:
              </strong>{" "}
              {city.feels_like}
            </p>
            <p>
              <strong style={{ color: "gray", fontSize: "1.2rem" }}>
                Weather:
              </strong>{" "}
              {city.icon}
            </p>
            <p>
              <strong style={{ color: "gray", fontSize: "1.2rem" }}>
                Humidity:
              </strong>
              {city.humidity}
            </p>
            <p>
              <strong style={{ color: "gray", fontSize: "1.2rem" }}>
                Description:
              </strong>{" "}
              {city.description}
            </p>
            <button
              onClick={() => handleDelete(city.id)}
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "1vh",
                marginLeft: "1vw",
                background: "none",
                border: "none",
                color: "red",
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourite;
