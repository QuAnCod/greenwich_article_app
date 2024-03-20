import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API, LOCAL_STORAGE } from '../../Utils/constanst/localConstanst';
import { userService } from '../services/UserService';

const initialState = {
    // Add your initial state here
    userLogin: {
        loading: false,
        error: null,
        data: null
    },
    userRegister: {
        loading: false,
        error: null,
        data: null
    },
    userList: [],
    loadingList: false,
}

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        // Add your action reducers here
        setUserLogin: (state, action) => {
            state.userLogin = action.payload
        },
        setUserRegister: (state, action) => {
            state.userRegister = action.payload
        },
        logOut: (state) => {
            state.userLogin = {
                loading: false,
                error: null,
                data: null
            }
        },
        setUserList: (state, action) => {
            state.userList = action.payload
        },
        setLoadingList: (state, action) => {
            state.loadingList = action.payload
        },
    },
});

export const { setUserLogin, logOut, setUserList, setUserRegister, setLoadingList } = userReducer.actions

export default userReducer.reducer

// ------------- API CALLS -------------

export const loginAction = (data) => {
    return async (dispatch) => {
        console.log(data)
        dispatch(setUserLogin({
            loading: true,
            error: null,
            data: null
        }))
        try {
            const res = await userService.login(data)
            dispatch(setUserLogin({
                loading: false,
                error: null,
                data: res.data
            }))
            localStorage.setItem(LOCAL_STORAGE.TOKEN, res.data.token)
        } catch (error) {
            dispatch(setUserLogin({
                loading: false,
                error: error,
                data: null
            }))
        }
    }
}

export const registerAction = (data) => {
    return async (dispatch) => {
        console.log(data)
        dispatch(setUserRegister({
            loading: true,
            error: null,
            data: null
        }))
        try {
            const res = await userService.register(data)
            dispatch(setUserRegister({
                loading: false,
                error: null,
                data: res.data
            }))
        } catch (error) {
            dispatch(setUserRegister({
                loading: false,
                error: error,
                data: null
            }))
        }
    }
}

export const getUserListAction = () => {
    return async (dispatch) => {
        dispatch(setLoadingList(true))
        try {
            const res = await userService.getUser()
            if (res.status === 200) {
                dispatch(setUserList(res.data))
                dispatch(setLoadingList(false))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
