import { createSlice } from "@reduxjs/toolkit";

const dynamicListSlice = createSlice({
  name: "dynamicList",
  initialState: {
    addColumnPreferences: "",
    getAllListingPreferencesByUserId: "",
    addDynamicRoute: "",
  },
  reducers: {
    setAddColumnPreferences: (state, action) => {
      state.addColumnPreferences = action.payload;
    },
    setAddDynamicRoute: (state, action) => {
      state.addDynamicRoute = action.payload;
    },
  },
});

export const { setAddColumnPreferences, setAddDynamicRoute } =
  dynamicListSlice.actions;
export const dynamicListReducer = dynamicListSlice.reducer;
