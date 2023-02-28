import axios from "axios";
import { API_URL } from './config'
import keygen from "keygenerator";
import {
    addToCart,
    errorProductMessages,
    getCart, loadInitialProducts,
    loadPhotos,
    loadProducts,
    showUploader
} from "../redux/slices/productSlice";


export const getProducts = (category='', slug= '', minPrice, maxPrice, sort, manufactured, cat) => {
    return async dispatch => {
        let categoryUrl = ''
        let slugUrl = ''
        if (category){
            categoryUrl = `${category}/`
        }
        if (slug){
            slugUrl = `${slug}/`
        }
        try {
            dispatch(showUploader(true))
            const response = await axios.get(`${API_URL}api/products/${categoryUrl}${slugUrl}`, {
                params: {
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    sort: sort,
                    manufactured: manufactured,
                    cat: cat
                }
            })
            dispatch(loadProducts(response.data.products))
            dispatch(loadPhotos(response.data.photos))
            if (!minPrice && !maxPrice){
                dispatch(loadInitialProducts(response.data.products))
            }
            dispatch(showUploader(false))
        }catch (e) {
            console.log(e)
        }
    }
}

export const addProductToCart = (product, user, count) => {
    return async dispatch => {
        try {
            let session_key = localStorage.getItem('session_key')
            if (!session_key){
                session_key = keygen.session_id()
                localStorage.setItem('session_key', session_key)
            }
            let config = {
                headers: {Authorization: `Token ${localStorage.getItem('token')}`}
            }
            if (!user){
                config = {
                    withCredentials: true
                }
            }
            const response = await axios.post(`${API_URL}api/cart/create/`, {
                product,
                count,
                session_key
            }, config)
            dispatch(getCart(response.data.product))
        }catch (e) {
            dispatch(errorProductMessages(e))
        }
    }
}

export const getUserCart = () => {
  return async dispatch => {
      try {
          const response = await axios.get(`${API_URL}api/cart/`)
          dispatch(getCart(response.data.product))
      }catch (e) {
          console.log(e)
      }
  }
}