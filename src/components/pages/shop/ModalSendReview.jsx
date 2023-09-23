import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Rating,
    TextField, Typography
} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {sendReview} from "../../../api/products";

const schema = yup.object().shape({
    name: yup.string().required('Это поле должно быть заполнено').min(2, 'Количество символов не может быть меньше 2').max(60, 'Количество символов не может быть больше 60'),
    review: yup.string().required('Это поле должно быть заполнено').max(1000, 'Количество символов не может быть больше 1000'),
})

const ModalSendReview = ({open, close, product}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    const [name, setFirstName] = useState('')
    const handleChangeFirstName = (e) => setFirstName(e.currentTarget.value)

    const [review, setReview] = useState('')
    const handleChangeReview = (e) => setReview(e.target.value)

    const [rating, setRating] = useState(0)

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
            isValid,
        },
        reset,
    } = useForm({
        defaultValues: {
            name: name,
            review: '',
        },
        resolver: yupResolver(schema),
        mode: 'all',
        reValidateMode: 'onChange',
        criteriaMode: "firstError",
        shouldFocusError: true,
    })

    useEffect(()=>{
        setValue('name', user?.first_name)
        setFirstName(user?.first_name)
    },[user])

    const onSubmit = (event) => {
        if (rating > 0){
            dispatch(sendReview(user?.id, event.name, event.review, product.id, rating))
            reset()
        }
    }

    return (
        <Dialog
            open={open}
        >
            <Box component={"form"} noValidate onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle id="dialog-title">
                Ваш отзыв о "{product.product_name}"
            </DialogTitle>
            <DialogContent>
                        <TextField
                            {...register('name')}
                            margin="normal"
                            id="name"
                            name='name'
                            autoComplete='name'
                            label="Ваше имя"
                            fullWidth
                            variant="standard"
                            error={!!errors.name}
                            helperText={errors?.name?.message}
                            value={name ? name : ''}
                            onChange={handleChangeFirstName}
                        />
                        <TextField
                            autoFocus
                            {...register('review')}
                            error={!!errors.review}
                            fullWidth
                            minRows={3}
                            multiline={true}
                            name="review"
                            helperText={errors?.review?.message}
                            label='Оставьте ваш отзыв в этом поле'
                            type="text"
                            id="review"
                            autoComplete="review"
                            value={review}
                            onChange={handleChangeReview}
                        />
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                {rating === 0 &&
                    <Alert severity="error">Установите рейтинг для товара!</Alert>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Отмена</Button>
                <Button
                    onClick={close}
                    type={"submit"}
                    disabled={!isValid}
                >Отправить</Button>
            </DialogActions>
        </Box>
        </Dialog>
    );
};

export default ModalSendReview;