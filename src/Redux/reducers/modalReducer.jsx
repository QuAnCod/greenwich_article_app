import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

const modalReducer = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      //   console.log(action.payload);
      state.modalOpen = action.payload;
    },
  },
});

export const { setModalOpen } = modalReducer.actions;

export default modalReducer.reducer;
