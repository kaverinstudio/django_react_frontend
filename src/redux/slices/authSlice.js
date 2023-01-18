import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    errors: null,
    success: null
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoading: (state, action) => {
            state.isLoading = true
        },
        userLogin: (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.token = action.payload.token
        },
        userLoaded: (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.user = action.payload
        },
        userLogout: (state, action) => {
            state.isLoading = false
            state.isAuthenticated = false
            state.user = null
            state.token = null
            state.errors = action.payload
        },
        errorMessages: (state, action) => {
            state.errors = action.payload
        },
        successMessages: (state, action) => {
            state.success = action.payload
        },
        clearMessages: (state, action) => {
            state.errors = null
            state.success = null
        }
    }
});

export const { userLoading, userLoaded, userLogout, userLogin, errorMessages, successMessages, clearMessages} = authSlice.actions;

export default authSlice.reducer;

