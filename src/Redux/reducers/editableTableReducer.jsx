import { createSlice } from '@reduxjs/toolkit'
import { userService } from '../services/UserService';
import { STATUS_CODE } from '../../Utils/constanst/localConstanst';

const initialState = {
    userList: [],
    loadingList: false,
}

const editableTableReducer = createSlice({
    name: "editableTableReducer",
    initialState,
    reducers: {
        setUserList: (state, action) => {
            state.userList = action.payload
        },
        setLoadingList: (state, action) => {
            state.loadingList = action.payload
        },
    }
});

export const { setUserList, setLoadingList } = editableTableReducer.actions

export default editableTableReducer.reducer

// ------------- API CALLS -------------

export const fetchUserList = () => {
    return async (dispatch) => {
        dispatch(setLoadingList(true));
        try {
            const response = await userService.getAllUser();
            if (response.status === STATUS_CODE.SUCCESS) {
                dispatch(setUserList(response.data))
            }
            dispatch(setLoadingList(false));
        } catch (error) {
            console.log(error)
            console.log(error.response?.data)

        }
    }
}