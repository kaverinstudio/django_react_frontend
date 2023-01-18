import axios from "axios";
import {API_URL} from "./config";
import {
    addFile,
    changeUploadFile, clearUploadFiles, deleteUploadFiles, errorFileMessages, hideUploader, setConfirmOrder,
    setDeleteFile,
    setFileInitial,
    setFileInitialProps,
    showUploader,
    uploadFiles
} from "../redux/slices/fileSlice";
import {errorMessages} from "../redux/slices/authSlice";
import keygen from "keygenerator";

export const getFiles = (user) => {
    return async dispatch => {
        try {
            let config = null
            if (user){
                config = {headers:{Authorization: `Token ${localStorage.getItem('token')}`}}
            }
            const response = await axios.get(`${API_URL}api/print/`, config);
            const data = response.data.files;
            const papierSize = response.data.papier_size
            const papierType = response.data.papier_type
            const services = response.data.services
            dispatch(setFileInitial(data))
            dispatch(setFileInitialProps({'papierSize': papierSize, 'papierType': papierType, 'services': services}))
        }catch (e) {
            dispatch(e.response.messages.data)
        }
    }
}


export const fileUpload = (file, user) => {
    return async dispatch => {
        try {
            let session_key = localStorage.getItem('session_key')
            if (!session_key){
                session_key = keygen.session_id()
                localStorage.setItem('session_key', session_key)
            }

            const formData = new FormData()
            formData.append('file', file)
            formData.append('session_key', session_key)

            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(uploadFiles(uploadFile))

            let config = {
                headers:{Authorization: `Token ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {

                    const totalLength = progressEvent.total
                    if (totalLength){
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile))
                        if (uploadFile.progress === 100){
                            dispatch(deleteUploadFiles(uploadFile))
                        }
                    }
                }
            }
            if (!user){
                config = {
                    withCredentials: true,
                    onUploadProgress: progressEvent => {

                        const totalLength = progressEvent.total
                        if (totalLength){
                            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            dispatch(changeUploadFile(uploadFile))
                            if (uploadFile.progress === 100){
                                dispatch(deleteUploadFiles(uploadFile))
                            }
                        }
                    }
                }
            }
            const response = await axios.post(`${API_URL}api/print/upload`, formData, config)
            dispatch(addFile(response.data.file))
        }catch (e) {
            dispatch(errorMessages(e.response.data))
        }
    }
}

export const fileUpdate = (format, papier, count, fileId, user) => {
    return async dispatch => {
        try {

            let config = {headers:{Authorization: `Token ${localStorage.getItem('token')}`}}
            if (!user){
                config = { withCredentials: true }
            }

            const response = await axios.put(`${API_URL}api/print/update/${fileId}`, {
                format,
                papier,
                count
            }, config);
            dispatch(setFileInitial(response.data.files))

        }catch (e) {
            dispatch(errorMessages(e.response.data))
        }
    }
}

export const fileDelete = (user, fileId) => {
    return async dispatch => {
        try {
            
            let config = {headers:{Authorization: `Token ${localStorage.getItem('token')}`}}
            if (!user){
                config = { withCredentials: true }
            }
            await axios.delete(`${API_URL}api/print/delete/${fileId}`, config)
            dispatch(setDeleteFile(fileId))
        }catch (e) {
            dispatch(errorMessages(e.response.data))
        }
    }
}

export const confirmOrder = (user, first_name, last_name, phone, email, address, comments, delivery, order) => {
    return async dispatch => {
        try {
            dispatch(showUploader())
            let config = {headers:{Authorization: `Token ${localStorage.getItem('token')}`}}
            if (!user){
                config = { withCredentials: true }
            }
            const response = await axios.post(`${API_URL}api/print/confirm`, {
                first_name,
                last_name,
                phone,
                email,
                address,
                comments,
                delivery,
                order
            }, config)
            dispatch(setConfirmOrder(response.data.order))
            dispatch(setFileInitial(response.data.files))
            dispatch(errorFileMessages('ok'))
            dispatch(hideUploader())
        }catch (e) {
            dispatch(errorMessages(e.response.data))
            dispatch(hideUploader())
        }
    }
}