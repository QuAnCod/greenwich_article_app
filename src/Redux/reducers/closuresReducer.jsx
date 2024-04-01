import { createSlice } from "@reduxjs/toolkit";
import { closuresService } from "../services/ClosuresService";
import { STATUS_CODE } from "../../Utils/constanst/localConstanst";
import {
  setDetailAcademicYear,
  setDisplayDetailAcademicYear,
} from "./academicYearsReducer";

const initialState = {
  closures: [],
  displayAddClosure: false,
};

const closuresReducer = createSlice({
  name: "closureReducer",
  initialState,
  reducers: {
    setClosures: (state, action) => {
      state.closures = action.payload;
    },
    setDisplayAddClosure: (state, action) => {
      state.displayAddClosure = action.payload;
    },
  },
});

export const { setClosures, setDisplayAddClosure } = closuresReducer.actions;

export default closuresReducer.reducer;

// ------------- API CALLS -------------

export const getAllClosures = () => {
  return async (dispatch) => {
    try {
      const res = await closuresService.getAllClosures();
      if (res.status === STATUS_CODE.SUCCESS) {
        dispatch(setClosures(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const postClosure = (data) => {
  //   console.log(data);
  return async (dispatch) => {
    try {
      const res = await closuresService.postClosure(data);
      if (res.status === STATUS_CODE.CREATED) {
        alert("Create closure successfully!");
        await dispatch(getClosuresByAcademicYear(res.data.academicYear.id));
        // reset data
        dispatch(
          setDetailAcademicYear({
            year: "",
            id: 0,
            current: 0,
          })
        );
        // after create closure, close the modal and display the detail academic year
        dispatch(setDisplayAddClosure(false));
        dispatch(setDisplayDetailAcademicYear(true));
        // dispatch(setDetailAcademicYear({}));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getClosuresByAcademicYear = (academicYearId) => {
  return async (dispatch) => {
    try {
      const res = await closuresService.getClosuresByAcademicYear(
        academicYearId
      );
      if (res.status === STATUS_CODE.SUCCESS) {
        dispatch(setClosures(res.data));
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
