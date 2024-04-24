import { createSlice } from '@reduxjs/toolkit'
import { facultiesService } from '../services/FacultiesService';
import { STATUS_CODE } from '../../Utils/constanst/localConstanst';

const initialState = {
    faculties: []
}

const facultiesReducer = createSlice({
    name: "facultiesReducer",
    initialState,
    reducers: {
        setFaculties: (state, action) => {
            state.faculties = action.payload
        }
    }
});

export const { setFaculties } = facultiesReducer.actions

export default facultiesReducer.reducer

// API
export const getAllFaculties = () => {
    return async (dispatch) => {
        try {
            const response = await facultiesService.getAllFaculties();
            if (response.status === STATUS_CODE.SUCCESS) {
                dispatch(setFaculties(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}