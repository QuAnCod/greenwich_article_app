import { createSlice } from '@reduxjs/toolkit'
import { academicYearsService } from '../services/AcademicYearsService';
import { STATUS_CODE } from '../../Utils/constanst/localConstanst';

const initialState = {
    academicYears: []
}

const academicYearsReducer = createSlice({
    name: "academicYearsReducer",
    initialState,
    reducers: {
        setAcademicYears: (state, action) => {
            state.academicYears = action.payload
        }
    }
});

export const { setAcademicYears } = academicYearsReducer.actions

export default academicYearsReducer.reducer

// ------------- API CALLS -------------
export const getAllAcademicYears = () => {
    return async (dispatch) => {
        try {
            const res = await academicYearsService.getAllAcademicYears()
            if (res.status === STATUS_CODE.SUCCESS) {
                dispatch(setAcademicYears(res.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const createNewAcademicYear = (data) => {
    return async (dispatch) => {
        try {
            const res = await academicYearsService.createNewAcademicYear(data)
            if (res.status === STATUS_CODE.SUCCESS) {
                dispatch(getAllAcademicYears())
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateAcademicYear = (data) => {
    return async (dispatch) => {
        try {
            const res = await academicYearsService.updateAcademicYear(data)
            if (res.status === STATUS_CODE.SUCCESS) {
                dispatch(getAllAcademicYears())
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteAcademicYear = (id) => {
    return async (dispatch) => {
        try {
            const res = await academicYearsService.deleteAcademicYear(id)
            if (res.status === STATUS_CODE.SUCCESS) {
                dispatch(getAllAcademicYears())
            }
        } catch (error) {
            console.log(error)
        }
    }
}