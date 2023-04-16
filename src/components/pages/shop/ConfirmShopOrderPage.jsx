import React, {useState} from 'react';
import {Box, Grid} from "@mui/material";
import OrderShopTableComponent from "./OrderShopTableComponent";
import {useSelector} from "react-redux";
import EditOrderButton from "../../buttons/EditOrderButton";
import Alert from "../../Alert";
import OrderForm from "../../OrderForm";



const ConfirmShopOrderPage = () => {
    const cartInitial = useSelector(state => state.products.cart?.product)
    const status = useSelector(state => state.files.errors)

    const [userName, setUserName] = useState('')

    const setUserNameHandler = (event) => {
        setUserName(event)
    }

    return (
        <>
            <Box sx={{flexGrow: 1, marginTop: 2, marginBottom: 2}}>
                <Grid className="print" container>
                    <Grid item xs={12}>
                        <Grid container justifyContent='center' flexWrap='no-wrap' spacing={2}>
                            <OrderForm init={1} setUserName={setUserNameHandler}/>
                            <Grid item xs={12} md={6}>
                                <OrderShopTableComponent cartInitial={cartInitial} orderButton={<EditOrderButton link="/cart/"/>}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Alert link="/products/" status={status} message={`${userName}, ваш заказ успешно принят!`} icon={'success'} relink={true} logout={false}/>
        </>
    );
};

export default ConfirmShopOrderPage;