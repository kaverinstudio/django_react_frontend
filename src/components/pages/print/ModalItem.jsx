import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, FormControlLabel, FormLabel, ImageListItem, RadioGroup, TextField} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {fileUpdate} from "../../../api/file";
import Radio from '@mui/material/Radio';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ModalItem = ({active, setActive, item, files}) => {
    const dispatch = useDispatch()
    const fileInitialProps = useSelector(state => state.files.fileInitialProps)

    const [formatValue, setFormatValue] = useState('')
    const [papierValue, setPapierValue] = useState('')
    const [count, setCount] = useState('')

    const handleClose = () => {
        setActive(false)
        setFormatValue('')
        setPapierValue('')
        setCount('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (event.target.all.checked){
            files.map(file => dispatch(fileUpdate(event.target.format.value, event.target.papier.value, event.target.count.value, file.id, null)))
        }else {
            dispatch(fileUpdate(event.target.format.value, event.target.papier.value, event.target.count.value, item.id, null))
        }

        setActive(false)
        setFormatValue('')
        setPapierValue('')
        setCount('')
    }

    const handleChangeFormat = (event) => {
        setFormatValue(event.target.value)
    };

    const handleChangePapier = (event) => {
        setPapierValue(event.target.value)
    };

    const handleChangeCount = (event) => {
        setCount(event.target.value)
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={active}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={active}>
                    <Box sx={style} component='form' onSubmit={handleSubmit}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Параметры печати фотографии
                        </Typography>
                        <Box height={280}>
                            <ImageListItem sx={{height: '100% !important'}}>
                        <img
                            style={{overflow: 'hidden'}}
                            src={`${item?.file}?w=248&h=248&fit=crop&auto=format`}
                            srcSet={`${item?.file}?w=248&h=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item?.format}
                            loading='lazy'
                            decoding='async'
                        />
                            </ImageListItem>
                        </Box>
                        <Box sx={{mt: 2, mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                            <FormControl sx={{ width: '45%' }} size="small">
                                <InputLabel id="demo-select-small">Формат</InputLabel>
                                <Select
                                    labelId="format"
                                    id="format"
                                    value={formatValue ? formatValue : item?.format}
                                    label="format"
                                    name='format'
                                    onChange={handleChangeFormat}
                                >
                                    {
                                        fileInitialProps?.papierSize.map(size =>
                                            <MenuItem key={size.id} value={size.papier_width + 'x' + size.papier_height}>{size.papier_width}x{size.papier_height}</MenuItem>
                                        )
                                    }

                                </Select>
                            </FormControl>
                            <TextField
                                sx={{ width: '45%' }} size="small"
                                type='number'
                                id="count"
                                label="Количество"
                                variant="outlined"
                                value={count ? count : item?.count}
                                onChange={handleChangeCount}
                                inputProps={{ inputMode: 'numeric', min: 1 }}
                            />

                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel id="papier">Бумага</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="papier"
                                    name="papier"
                                    id="papier"
                                    value={papierValue ? papierValue : item?.papier}
                                    onChange={handleChangePapier}
                                >
                                    {
                                        fileInitialProps?.papierType.map(type =>
                                            <FormControlLabel key={type.id} value={type.papier_type} control={<Radio sx={{color: 'blue'}} />} label={type.papier_type} />

                                        )
                                    }

                                </RadioGroup>
                            </FormControl>
                            <FormControlLabel control={<Checkbox name='all'/>} label="Применить ко всем фотографиям" />
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>

                            <Button type='submit' variant="contained" color="success">
                                Сохранить
                            </Button>
                            <Button onClick={handleClose} variant="outlined" color="error">
                                Отменить
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default ModalItem;