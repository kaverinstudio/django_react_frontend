import React, {useState} from 'react';
import {Button, IconButton, Stack, Typography} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import {fileUpload} from "../../../api/file";
import {useDispatch, useSelector} from "react-redux";
import {clearUploadFiles} from "../../../redux/slices/fileSlice";

const PhotoLoadBlock = () => {
    const dispatch = useDispatch()
    const [dragEnter, setDragEnter] = useState(false)
    const user = useSelector(state => state.auth.user)

    const fileUploadHandler = (event) => {
        dispatch(clearUploadFiles())
        const files = [...event.target.files]
        files.forEach(file => dispatch(fileUpload(file, user)))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        dispatch(clearUploadFiles())
        const files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(fileUpload(file, user)))
        setDragEnter(false)
    }

    return (!dragEnter ?
        <div className="print__load-space" onDragOver={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragEnter={dragEnterHandler}>
            <Stack direction="row" alignItems="center" justifyContent="center" marginTop={2}>
                <Button variant="contained" component="label">
                    Загрузить фотографии
                    <input onChange={(event => fileUploadHandler(event))} hidden accept="image/*" multiple={true} type="file" />
                    <IconButton aria-label="upload picture" component="label">
                        <input multiple={true} hidden accept="image/*" type="file" />
                        <PhotoCamera className="print__camera-icon"/>
                    </IconButton>
                </Button>
            </Stack>
            <Typography variant="body2" color="text.secondary" component="p" textAlign="center" p={2}>
                Для загрузки нажмите на кнопку или перенесите файлы в эту область
            </Typography>
        </div>
            :
            <div className="print__load-space" onDrop={dropHandler} onDragOver={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragEnter={dragEnterHandler}>
                <Typography variant="body2" color="text.secondary" component="p" textAlign="center" p={2}>
                    Перенесите файлы в эту область
                </Typography>
            </div>
    );
};

export default PhotoLoadBlock;