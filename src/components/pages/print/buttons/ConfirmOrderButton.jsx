import React from 'react';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const ConfirmOrderButton = () => {
    return (
        <Link to='/confirm'>
        <Button type='submit' variant="contained" color="success">
            Оформить заказ
        </Button>
        </Link>
    );
};

export default ConfirmOrderButton;