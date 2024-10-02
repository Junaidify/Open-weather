import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import { setError, setLoading, setSuccess } from "../redux/reducers/fetchReducer";

export const useFetch = (currentCity) => {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);

  useMemo(() => {
    if (currentCity && currentCity.trim() !== "") {
      const getData = async () => {
        dispatch(setLoading());
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=535adb5939080eb74a7dd06ad6ffe5e3`
          );
          if (!response.ok) {
            setIsValid(false);
            throw new Error(response.statusText);
          }
          const data = await response.json();
          dispatch(setSuccess(data));
          setIsValid(true);
        } catch (err) {
          dispatch(setError(err.toString()));
          setIsValid(false);
        }
      };

      getData();
    }
  }, [currentCity, dispatch]);

  return isValid;
};
