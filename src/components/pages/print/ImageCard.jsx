import React from 'react';
import { Card, Fab, ImageListItem, ImageListItemBar, Tooltip } from "@mui/material";
import { fileDelete } from "../../../api/file";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import Fade from 'react-reveal/Fade';

const ImageCard = ({ item, handleOpenModal, user }) => {
    const dispatch = useDispatch()
    return (
        <Fade>
            <Card className='print__image-cart'>
                <Tooltip title="Удалить">
                    <Fab onClick={() => dispatch(fileDelete(user, item.id))} className='print__image-cart__delete-button' size='small' aria-label="delete">
                        <Delete />
                    </Fab>
                </Tooltip>
                <ImageListItem sx={{ height: '100% !important' }}>
                    <img
                        style={{ overflow: 'hidden' }}
                        src={`${item.thumb}?w=220&h=220&fit=crop&auto=format`}
                        srcSet={`${item.thumb}?w=220&h=220&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.format}
                        loading="lazy"
                        decoding='async'
                    />
                    <ImageListItemBar
                        title={item.format}
                        subtitle={item.papier + ', ' + item.count + ' шт'}
                        actionIcon={
                            <Tooltip title="Изменить">
                                <Fab onClick={() => handleOpenModal(item)} className='print__image-cart__edit-button' size='small' sx={{ opacity: 0.5 }}>
                                    <EditIcon />
                                </Fab>
                            </Tooltip>
                        }
                    />
                </ImageListItem>
            </Card>
        </Fade>
    );
};

export default ImageCard;