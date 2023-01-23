import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    files: null,
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
        }
    }
})

export const { getPortfolioFiles, showLoader } = portfolioSlice.actions

export default portfolioSlice.reducer