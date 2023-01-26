import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    files: null,
    category: null,
    isVisible: false,
    errors: null
}

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        getPortfolioFiles: (state, action) => {
            state.files = action.payload
        },
        showLoader: (state, action) => {
          state.isVisible = action.payload
        },
        getCategory: (state, action) => {
            state.category = action.payload
        }
    }
})

export const { getPortfolioFiles, showLoader, getCategory } = portfolioSlice.actions

export default portfolioSlice.reducer