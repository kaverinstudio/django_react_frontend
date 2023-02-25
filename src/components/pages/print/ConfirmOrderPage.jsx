import React, {useEffect, useState} from 'react';
import {Box, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Tooltip} from "@mui/material";
import PhotoLoadBlock from "./PhotoLoadBlock";
import OrderTableComponent from "./OrderTableComponent";
import {useDispatch, useSelector} from "react-redux";
import EditOrderButton from "./buttons/EditOrderButton";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {update} from "../../../api/user";
import Typography from "@mui/material/Typography";
import {confirmOrder, getFiles} from "../../../api/file";
import Alert from "../../Alert";

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

const ConfirmOrderPage = () => {
    const user = useSelector(state => state.auth.user)
    const filesInitial = useSelector(state => state.files.fileInitial)
    const order = useSelector(state => state.files.order)
    const status = useSelector(state => state.files.errors)
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const handleChangeEmail = (e) => setEmail(e.currentTarget.value)

    const [first_name, setFirstName] = useState('')
    const handleChangeFirstName = (e) => setFirstName(e.currentTarget.value)

    const [last_name, setLastName] = useState('')
    const handleChangeLastName = (e) => setLastName(e.currentTarget.value)

    const [phone, setPhone] = useState('')
    const handleChangePhone = (e) => setPhone(e.currentTarget.value)

    const [city, setCity] = useState('')
    const handleChangeCity = (e) => setCity(e.currentTarget.value)

    const [comments, setComments] = useState('')
    const handleChangeComments = (e) => setComments(e.target.value)

    const [delivery, setDelivery] = useState('yes')

    const initialCheckCity = yup.string().required('Это поле должно быть заполнено').min(10, 'Количество символов не может быть меньше 10').max(100, 'Количество символов не может быть больше 100')

    const [checkCity, setCheckCity] = useState(initialCheckCity)

    const [userName, setUserName] = useState('')

    const handleChangeDelivery = (event) => {
        setDelivery(event.target.value);
        if (event.target.value === 'yes'){
            setCheckCity(initialCheckCity)
            setValue('city', user?.city)
        }else {
            setCheckCity(yup.string())
            setValue('city', '')
        }
    };

    const schema = yup.object().shape({
        email: yup.string().email('Введите действительный Email адрес'),
        comments: yup.string().max(60, 'Количество символов не может быть больше 200'),
        phone: yup.string().required('Это поле должно быть заполнено').test('phoneLength', 'Это не выглядит как телефонный номер', (value) => {
            if (value?.length > 0){
                const test = yup.string().matches(phoneRegExp)
                return test.isValidSync(value)
            }
            return true;
        }),
        first_name: yup.string().required('Это поле должно быть заполнено').min(2, 'Количество символов не может быть меньше 2').max(60, 'Количество символов не может быть больше 60'),
        last_name: yup.string().max(60, 'Количество символов не может быть больше 60'),
        city: checkCity
    })

    useEffect(()=>{
        dispatch(getFiles(user))
    },[])

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        },
        reset,
    } = useForm({
        defaultValues: {
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          email: email,
          city: city,
          comments: '',
          delivery: 'yes'
        },
        resolver: yupResolver(schema),
        mode: 'all',
        reValidateMode: 'onChange',
        criteriaMode: "firstError",
        shouldFocusError: true,
    })

    useEffect(()=>{
        setValue('first_name', user?.first_name)
        setFirstName(user?.first_name)
        setValue('last_name', user?.last_name)
        setLastName(user?.last_name)
        setValue('phone', user?.phone)
        setPhone(user?.phone)
        setValue('city', user?.city)
        setCity(user?.city)
        setValue('email', user?.email)
        setEmail(user?.email)
        setValue('delivery', 'yes')
    },[user])

    const onSubmit = (event) => {
        dispatch(confirmOrder(user, event.first_name, event.last_name, event.phone, event.email, event.city, event.comments, delivery, order))
        setUserName(event.first_name)
        reset()
        setFirstName('')
        setLastName('')
        setPhone('')
        setEmail('')
        setCity('')
        setComments('')
    };

    return (
        <>
            <Box sx={{flexGrow: 1, marginTop: 2, marginBottom: 2}}>
                <Grid className="print" container>
                    <Grid item xs={12}>
                        <Grid container justifyContent='center' flexWrap='no-wrap' spacing={2}>
                            {filesInitial?.length > 0 ?
                                <>
                                    <Grid item xs={12} md={6}>
                                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }} className='print__load-space'>
                                            <Typography component="h1" variant="h5">
                                                Ваши данные
                                            </Typography>
                                            <Grid container spacing={2} mt={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        {...register('first_name')}
                                                        error={!!errors.first_name}
                                                        name="first_name"
                                                        fullWidth
                                                        required
                                                        id="first_name"
                                                        helperText={errors?.first_name?.message}
                                                        label={'Введите ваше имя'}
                                                        value={first_name ? first_name : ''}
                                                        onChange={handleChangeFirstName}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        {...register('last_name')}
                                                        error={!!errors.last_name}
                                                        name="last_name"
                                                        fullWidth
                                                        id="last_name"
                                                        helperText={errors?.last_name?.message}
                                                        label={'Ваша фамилия (по желанию)'}
                                                        value={last_name ? last_name : ''}
                                                        onChange={handleChangeLastName}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        {...register('email')}
                                                        error={!!errors.email}
                                                        fullWidth
                                                        id="email"
                                                        helperText={errors?.email?.message}
                                                        label={'Ваш Email (по желанию)'}
                                                        name="email"
                                                        type='email'
                                                        autoComplete="email"
                                                        value={email ? email : ''}
                                                        onChange={handleChangeEmail}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        {...register('phone')}
                                                        error={!!errors.phone}
                                                        fullWidth
                                                        id="phone"
                                                        required
                                                        helperText={errors?.phone?.message}
                                                        label={'Ваш номер телефона'}
                                                        name="phone"
                                                        autoComplete="phone"
                                                        type="tel"
                                                        value={phone ? phone : ''}
                                                        onChange={handleChangePhone}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <FormLabel id="delivery">Варианты доставки</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="delivery"

                                                        id='delivery'
                                                        name="delivery"
                                                        onChange={handleChangeDelivery}
                                                        value={delivery}
                                                    >
                                                        <FormControlLabel value="yes" control={<Radio />} label="Заказать доставку" />
                                                        <FormControlLabel value="no" control={<Radio />} label="Самовывоз" />
                                                    </RadioGroup>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        {...register('city')}
                                                        error={!!errors.city && delivery === 'yes'}
                                                        required={delivery === 'yes'}
                                                        disabled={delivery === 'no'}
                                                        fullWidth
                                                        id="city"
                                                        helperText={!!errors?.city?.message && delivery === 'yes' ? errors?.city?.message : ''}
                                                        label={'Укажите адрес доставки'}
                                                        name="city"
                                                        minRows={3}
                                                        multiline={true}
                                                        autoComplete="city"
                                                        value={city ? city : ''}
                                                        onChange={handleChangeCity}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        {...register('comments')}
                                                        error={!!errors.comments}
                                                        fullWidth
                                                        minRows={3}
                                                        multiline={true}
                                                        name="comments"
                                                        helperText={errors?.comments?.message}
                                                        label='Комментарии к заказу можно оставить в этом поле'
                                                        type="comments"
                                                        id="comments"
                                                        autoComplete="new-comments"
                                                        value={comments}
                                                        onChange={handleChangeComments}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Button
                                                type="submit"
                                                color='success'
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Оформить заказ
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <OrderTableComponent filesInitial={filesInitial} orderButton={<EditOrderButton/>}/>
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
            <Alert status={status} message={`${userName}, ваш заказ успешно принят!`} icon={'success'} relink={true} logout={false}/>
        </>
    );
};

export default ConfirmOrderPage;