import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const ModalReview = ({ open, close, review, onClose }) => {

    return (
        <Dialog
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {review.user_name}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent className='review__modal'>
                <DialogContentText id="alert-dialog-description">
                    {review.review_text}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default ModalReview;