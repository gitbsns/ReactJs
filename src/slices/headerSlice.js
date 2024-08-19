import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    btnTextContent: "",
    btnAction: null,
  },
  reducers: {
    setBtnTextContent: (state, action) => {
      state.btnTextContent = action.payload;
    },
    setBtnAction: (state, action) => {
      state.btnAction = action.payload;
    },
  },
});

export const { setBtnTextContent, setBtnAction } = headerSlice.actions;
export const headerReducer = headerSlice.reducer;
