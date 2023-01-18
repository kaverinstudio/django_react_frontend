import React, {useEffect, useState} from 'react';
import axios from "axios";
import {
    Box,
    Button, Card, Fab,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Stack, Tooltip,
    Typography
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import {PhotoCamera} from "@mui/icons-material";
import Fade from "react-reveal/Fade";
import {useDispatch, useSelector} from "react-redux";
import {fileDelete, fileUpload, getFiles} from "../../../api/file";
import {API_URL} from "../../../api/config";
import {setFileInitial, setFileInitialProps} from "../../../redux/slices/fileSlice";
import ModalItem from "./ModalItem";
import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhotoLoadBlock from "./PhotoLoadBlock";
import ImageCard from "./ImageCard";
import ImageListComponent from "./ImageListComponent";
import OrderTableComponent from "./OrderTableComponent";
import ConfirmOrderButton from "./buttons/ConfirmOrderButton";


const LoadPhotoPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const files = useSelector(state => state.files.files)
    const filesInitial = useSelector(state => state.files.fileInitial)

    useEffect(()=>{
        dispatch(getFiles(user))
    },[])


    const [modalActive, setModalActive] = useState(false)
    const [modalItem, setModalItem] = useState('')

    const handleOpenModal = (item) => {
        setModalActive(true)
        setModalItem(item)
    }

    return (
        <>
        <Box sx={{flexGrow: 1, marginTop: 2, marginBottom: 2}}>
                <Grid className="print" container>
                    <Grid item xs={12}>
                        <Grid container justifyContent='center' flexWrap='no-wrap' spacing={2}>
                            {filesInitial?.length > 0 ?
                                <>
                                <Grid item xs={12} md={6}>
                                    <PhotoLoadBlock />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <OrderTableComponent filesInitial={filesInitial} orderButton={<ConfirmOrderButton/>}/>
                                </Grid>
                                </>
                                :
                                <Grid item xs={12}>
                                    <PhotoLoadBlock />
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    <ImageListComponent user={user} handleOpenModal={handleOpenModal} filesInitial={filesInitial}/>
                    </Grid>
                </Grid>
        </Box>
            <ModalItem active={modalActive} setActive={setModalActive} item={modalItem} files={filesInitial}/>
        </>
    );
};

export default LoadPhotoPage;