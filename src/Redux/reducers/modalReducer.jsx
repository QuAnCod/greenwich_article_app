import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  modalEditOpen: false,
};

const modalReducer = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      //   console.log(action.payload);
      state.modalOpen = action.payload;
    },
    setModalEditOpen: (state, action) => {
      state.modalEditOpen = action.payload;
    },
  },
});

export const { setModalOpen, setModalEditOpen } = modalReducer.actions;

export default modalReducer.reducer;
