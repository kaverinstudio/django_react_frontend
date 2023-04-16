import React, {useEffect, useState} from 'react';
import {
    Box,
    Grid
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../../api/file";
import ModalItem from "./ModalItem";
import PhotoLoadBlock from "./PhotoLoadBlock";
import ImageListComponent from "./ImageListComponent";
import OrderTableComponent from "./OrderTableComponent";
import ConfirmOrderButton from "../../buttons/ConfirmOrderButton";


const LoadPhotoPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
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