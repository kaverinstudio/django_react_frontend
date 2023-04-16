import React from 'react';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const EditOrderButton = ({link}) => {
    return (
        <Link to={link}>
        <Button type='submit' variant="contained">
            Изменить заказ
        </Button>
        </Link>
    );
};

export default EditOrderButton;