import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  modalEditOpen: false,
  modalCreateAcademicYearOpen: false,
  changeAvatarModalOpen: false,
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
    },
    setChangeAvatarModalOpen: (state, action) => {
      state.changeAvatarModalOpen = action.payload;
    },
  }
});

export const { setModalOpen, setModalEditOpen, setModalCreateAcademicYearOpen, setChangeAvatarModalOpen } = modalReducer.actions;

export default modalReducer.reducer;
