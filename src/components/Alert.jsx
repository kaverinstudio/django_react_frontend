import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import {Box, Typography} from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {clearMessages, userLogout} from "../redux/slices/authSlice";
import {RotatingLines} from "react-loader-spinner";
import {errorFileMessages} from "../redux/slices/fileSlice";

const Alert = ({status, message, icon, relink, logout, link}) => {
    const [open, setOpen] = useState(null)
    const MySwal = withReactContent(Swal);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const uploader = useSelector(state => state.files.isVisible)


    useEffect(()=>{
        setOpen(status)
    },[status])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        title:{
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '40px',
            lineHeight: '40px',
            textAlign: 'center',
            paddingBottom: '50px',
        },
        img:{
            maxWidth: 328,
            width: '100%',
            marginLeft: '50%',
            transform: 'translateX(-50%)',
        }
    };

    if (uploader){
        return (
            <Box sx={{ position: 'absolute', top: '50%', left: '50%'}}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="2"
                animationDuration="0.75"
                width="50"
                visible={true}
            />
            </Box>
        )
    }

    if (open && open.length !== 0){
        MySwal.fire({
            icon: icon,
            width: 800,
            imageUrl: '',
            title: <Typography sx={style.title}>{message}</Typography>,
            confirmButtonColor: '#1e78fe',

        }).then((result) => {
            if (result.isConfirmed && relink){
                navigate(link)
                dispatch(errorFileMessages(''))
                dispatch(clearMessages())
                setOpen(null)
            }if(result.isConfirmed && logout){
                dispatch(userLogout(''))
                setOpen(null)
            }else {
                dispatch(clearMessages())
                dispatch(errorFileMessages(''))
                setOpen(null)
            }
        })
    }
};

export default Alert;