import { createSlice } from "@reduxjs/toolkit";

const fetchData = createSlice({
  name: "fetch",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    setSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    },
  },
});

export const { setLoading, setError, setSuccess } = fetchData.actions;
export default fetchData.reducer;
