import React from 'react';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const EditOrderButton = () => {
    return (
        <Link to='/print'>
        <Button type='submit' variant="contained">
            Изменить заказ
        </Button>
        </Link>
    );
};

export default EditOrderButton;