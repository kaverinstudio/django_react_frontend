import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    initialProducts: null,
    // fullProducts: null,
    products: null,
    photos: null,
    isVisible: false,
    errors: null,
    cart: null,
    filterManufactured: null,
    filterCategory: null,
    snackBar: false
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        loadInitialProducts: (state, action) => {
          state.initialProducts = action.payload
          // state.fullProducts = action.payload
        },
        loadProducts: (state, action) => {
            state.products = action.payload
        },
        loadPhotos: (state, action) => {
            state.photos = action.payload
        },
        showUploader: (state, action) => {
            state.isVisible = action.payload
        },
        errorProductMessages: (state, action) => {
            state.errors = action.payload
        },
        getCart: (state, action) => {
            state.cart = action.payload
        },
        filterManufactured: (state, action) => {
            state.filterManufactured = action.payload
        },
        filterCategory: (state, action) => {
            state.filterCategory = action.payload
        },
        setSnackBar: (state, action) => {
            state.snackBar = action.payload
        }
    }
})

export const { showUploader, errorProductMessages, loadProducts, loadPhotos, getCart, loadInitialProducts, filterManufactured, filterCategory, setSnackBar } = productSlice.actions

export default productSlice.reducer