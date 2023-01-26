import axios from 'axios'
import { API_URL } from './config'
import {getCategory, getPortfolioFiles, showLoader} from "../redux/slices/portfolioSlice";

export const getAllPortfolioFiles = (cat) => {
    return async dispatch => {
        let catUrl = ''
        if (cat){
            catUrl = `/${cat}`
        }
        try {
            dispatch(showLoader(true))
            const response = await axios.get(`${API_URL}api/portfolio${catUrl}`)
                dispatch(getPortfolioFiles(response.data.files))
                dispatch(getCategory(response.data.category))
                dispatch(showLoader(false))
        }catch (e) {
            console.log(e)
        }
    }
}