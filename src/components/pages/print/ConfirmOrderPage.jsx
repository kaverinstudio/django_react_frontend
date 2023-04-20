import React, { useState } from 'react';
import { Box, Grid } from "@mui/material";
import PhotoLoadBlock from "./PhotoLoadBlock";
import OrderTableComponent from "./OrderTableComponent";
import { useSelector } from "react-redux";
import EditOrderButton from "../../buttons/EditOrderButton";
import { Link } from "react-router-dom";
import Alert from "../../Alert";
import OrderForm from "../../OrderForm";
import BreadcrumbsComponent from '../../BreadcrumbsComponent';



const ConfirmOrderPage = () => {
    const filesInitial = useSelector(state => state.files.fileInitial)
    const status = useSelector(state => state.files.errors)

    const [userName, setUserName] = useState('')

    const setUserNameHandler = (event) => {
        setUserName(event)
    }

    let breadcrumbs = [
        { name: 'Печать фотографий', link: '/print/' },
        { name: 'Оформление заказа', link: '/confirm/' },
    ]

    return (
        <>
            <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }} component='div'>
                <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
            </Box>
            <Box sx={{ flexGrow: 1, marginTop: 2, marginBottom: 2 }} component='div'>
                <Grid className="print" container>
                    <Grid item xs={12}>
                        <Grid container justifyContent='center' flexWrap='no-wrap' spacing={2}>
                            {filesInitial?.length > 0 ?
                                <>
                                    <OrderForm init={2} setUserName={setUserNameHandler} />
                                    <Grid item xs={12} md={6}>
                                        <OrderTableComponent filesInitial={filesInitial} orderButton={<EditOrderButton link="/print" />} />
                                    </Grid>
                                </>
                                :
                                <Grid item xs={12}>
                                    <Link to='/print'>
                                        <PhotoLoadBlock />
                                    </Link>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Alert link="/print/" status={status} message={`${userName}, ваш заказ успешно принят!`} icon={'success'} relink={true} logout={false} />
        </>
    );
};

export default ConfirmOrderPage;