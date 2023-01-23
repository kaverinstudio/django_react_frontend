import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import fileReducer from "../slices/fileSlice";
import portfolioReducer from "../slices/portfolioSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        files: fileReducer,
        portfolio: portfolioReducer,
    },
})