import { configureStore } from "@reduxjs/toolkit";
import fetchData from "./reducers/fetchReducer";


export const store = configureStore({
    reducer: {
        fetch : fetchData
    },
})

