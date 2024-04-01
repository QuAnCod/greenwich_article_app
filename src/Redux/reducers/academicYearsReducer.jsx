import { createSlice } from '@reduxjs/toolkit'
import { academicYearsService } from '../services/AcademicYearsService';
import { STATUS_CODE } from '../../Utils/constanst/localConstanst';
import { setModalCreateAcademicYearOpen } from './modalReducer';

const initialState = {
    academicYears: [],
    displayDetailAcademicYear: false,
    detailAcademicYear: []
}

const academicYearsReducer = createSlice({
    name: "academicYearsReducer",
    initialState,
    reducers: {
        setAcademicYears: (state, action) => {
            state.academicYears = action.payload
        },
        setDisplayDetailAcademicYear: (state, action) => {
            state.displayDetailAcademicYear = action.payload
        },
        setDetailAcademicYear: (state, action) => {
            state.detailAcademicYear = action.payload
        }
    }
});

export const { setAcademicYears, setDisplayDetailAcademicYear, setDetailAcademicYear } = academicYearsReducer.actions

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
            if (res.status === STATUS_CODE.SUCCESS || res.status === STATUS_CODE.CREATED) {
                alert('Create academic year successfully!')
                dispatch(getAllAcademicYears())
                dispatch(setModalCreateAcademicYearOpen(false))
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
            if (res.status === STATUS_CODE.SUCCESS || res.status === STATUS_CODE.NO_CONTENT) {
                dispatch(getAllAcademicYears())
            }
        } catch (error) {
            console.log(error)
        }
    }
}
