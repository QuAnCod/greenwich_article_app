import { createSlice } from '@reduxjs/toolkit'
import { closuresService } from '../services/ClosuresService';
import { STATUS_CODE } from '../../Utils/constanst/localConstanst';

const initialState = {
    closures: []
}

const closuresReducer = createSlice({
    name: "closureReducer",
    initialState,
    reducers: {
        setClosures: (state, action) => {
            state.closures = action.payload
        }
    }
});

export const { setClosures } = closuresReducer.actions

export default closuresReducer.reducer

// ------------- API CALLS -------------

export const getAllClosures = () => {
    return async (dispatch) => {
        try {
            const res = await closuresService.getAllClosures()
            if (res.status === STATUS_CODE.SUCCESS) {
                dispatch(setClosures(res.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const postClosure = (data) => {

}