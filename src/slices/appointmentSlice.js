import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointment: {},
  },
  reducers: {
    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },
  },
});

export const { setAppointment } = appointmentSlice.actions;
export const appointmentReducer = appointmentSlice.reducer;
