import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    files: [],
    isVisible: false,
    errors: null,
    session_key: null,
    fileInitialProps: null,
    fileInitial: [],
    order: null,
    confirmOrder: null
}

export const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        uploadFiles: (state, action) => {
            state.files = [...state.files, {...action.payload}]
        },
        errorFileMessages: (state, action) => {
            state.errors = action.payload
        },
        setSessionKey: (state, action) => {
            state.session_key = action.payload
        },
        setFileInitialProps: (state, action) => {
            state.fileInitialProps = action.payload
        },
        setFileInitial: (state, action) => {
            state.fileInitial = action.payload
        },
        addFile: (state, action) => {
            state.fileInitial.unshift(action.payload)
        },
        setDeleteFile: (state, action) => {
            state.fileInitial = [...state.fileInitial.filter(file => file.id !== action.payload)]
            // state.files = [...state.files.filter(file => file.id !== action.payload)]
        },
        setOrder: (state, action) => {
            state.order = action.payload
        },
        showUploader: (state, action) => {
            state.isVisible = true
        },
        hideUploader: (state, action) => {
            state.isVisible = false
        },
        changeUploadFile: (state, action) => {
            state.files = [...state.files.map(file => file.id === action.payload.id
            ? {...file, progress: action.payload.progress}
            : {...file}
            )]
        },
        clearUploadFiles: (state, action) => {
            state.files = []
        },
        deleteUploadFiles: (state, action) => {
            state.files = [...state.files.filter(file => file.name !== action.payload.name)]
        },
        setConfirmOrder: (state, action) => {
            state.confirmOrder = action.payload
        }
    }
})

export const {uploadFiles, showUploader, hideUploader, errorFileMessages, setFileInitialProps, setFileInitial, setDeleteFile, setOrder, changeUploadFile, addFile, clearUploadFiles, deleteUploadFiles, setConfirmOrder} = fileSlice.actions

export default fileSlice.reducer