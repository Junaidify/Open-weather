import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setError,
  setLoading,
  setSuccess,
} from "../redux/reducers/fetchReducer";

export const useFetch = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading());
      try {
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/forecast?lat=28.7041&lon=77.1025&appid=535adb5939080eb74a7dd06ad6ffe5e3"
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        dispatch(setSuccess(data));
      } catch (err) {
        dispatch(setError(err.toString()));
      }
    };

    getData();
  }, []);
};
