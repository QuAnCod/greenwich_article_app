import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  modalEditOpen: false,
  modalCreateAcademicYearOpen: false,
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
    setModalCreateAcademicYearOpen: (state, action) => {
      state.modalCreateAcademicYearOpen = action.payload;
    }
  },
});

export const { setModalOpen, setModalEditOpen, setModalCreateAcademicYearOpen } = modalReducer.actions;

export default modalReducer.reducer;
