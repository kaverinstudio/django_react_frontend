import axios from 'axios'
import { API_URL } from './config'
import {getPortfolioFiles, showLoader} from "../redux/slices/portfolioSlice";

export const getAllPortfolioFiles = () => {
    return async dispatch => {
        try {
            dispatch(showLoader(true))
            const response = await axios.get(`${API_URL}api/portfolio`)
                dispatch(getPortfolioFiles(response.data))
                dispatch(showLoader(false))
        }catch (e) {
            console.log(e)
        }
    }
}