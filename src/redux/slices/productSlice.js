import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    products: null,
    photos: null,
    isVisible: false,
    errors: null,
    cart: []
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
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
        }
    }
})

export const { showUploader, errorProductMessages, loadProducts, loadPhotos, getCart } = productSlice.actions

export default productSlice.reducer