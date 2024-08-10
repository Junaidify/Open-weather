import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setError,
  setLoading,
  setSuccess,
} from "../redux/reducers/fetchReducer";

export const useFetch = ( url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading());
      try {
        const response = await fetch(url);
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
  }, [ url, dispatch]);
};
