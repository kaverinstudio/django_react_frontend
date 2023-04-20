import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Fade from "react-reveal/Fade";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {update, uploadAvatar} from "../../../api/user";
import Alert from "../../Alert";

const theme = createTheme();

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

const DashBoard = () => {
    const user = useSelector(state => state.auth.user)
    const loginErrors = useSelector(state => state.auth.errors)
    const successMessage = useSelector(state => state.auth.success)
    const dispatch = useDispatch()

    const [username, setUserName] = useState('')
    const handleChangeUserName = (e) => setUserName(e.currentTarget.value)

    const [email, setEmail] = useState('')
    const handleChangeEmail = (e) => setEmail(e.currentTarget.value)

    const [first_name, setFirstName] = useState('')
    const handleChangeFirstName = (e) => setFirstName(e.currentTarget.value)
    let testFirstName = 0
    if (first_name?.length > 0){
        testFirstName = 2
    }

    const [last_name, setLastName] = useState('')
    const handleChangeLastName = (e) => setLastName(e.currentTarget.value)
    let testLastName = 0
    if (last_name?.length > 0){
        testLastName = 2
    }

    const [phone, setPhone] = useState('')
    const handleChangePhone = (e) => setPhone(e.currentTarget.value)

    const [city, setCity] = useState('')
    const handleChangeCity = (e) => setCity(e.currentTarget.value)
    let testCity = 0
    if (city?.length > 0){
        testCity = 10
    }


    const [errorsMessage, setErrorsMessage] = useState('');


    const schema = yup.object().shape({
        username: yup.string().required('Это поле должно быть заполнено').min(2, 'Количество символов не может быть меньше 2').max(60, 'Количество символов не может быть больше 60'),
        email: yup.string().required('Это поле должно быть заполнено').email('Введите действительный Email адрес'),
        password: yup.string().required('Это поле должно быть заполнено').min(8, 'Количество символов не может быть меньше 8').max(60, 'Количество символов не может быть больше 60'),
        password2: yup.string().required('Это поле должно быть заполнено').min(8, 'Количество символов не может быть меньше 8').max(60, 'Количество символов не может быть больше 60'),
        phone: yup.string().test('phoneLength', 'Это не выглядит как телефонный номер', (value) => {
            if (value?.length > 0){
                const test = yup.string().matches(phoneRegExp)
                return test.isValidSync(value)
            }
            return true;
        }),
        first_name: yup.string().min(testFirstName, 'Количество символов не может быть меньше 2').max(60, 'Количество символов не может быть больше 60'),
        last_name: yup.string().min(testLastName, 'Количество символов не может быть меньше 2').max(60, 'Количество символов не может быть больше 60'),
        city: yup.string().min(testCity, 'Количество символов не может быть меньше 10').max(100, 'Количество символов не может быть больше 100')
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
            isValid
        },
        reset,
    } = useForm({
        defaultValues: {
          first_name: first_name,
          last_name: last_name,
          username: username,
          phone: phone,
          email: email,
          city: city
        },
        resolver: yupResolver(schema),
        mode: "all",
        reValidateMode: 'onChange',
        criteriaMode: "firstError",
        shouldFocusError: true,
    })
    useEffect(()=>{
        setValue('username', user?.username)
        setUserName(user?.username)
        setValue('email', user?.email)
        setEmail(user?.email)
        setValue('first_name', user?.first_name)
        setFirstName(user?.first_name)
        setValue('last_name', user?.last_name)
        setLastName(user?.last_name)
        setValue('phone', user?.phone)
        setPhone(user?.phone)
        setValue('city', user?.city)
        setCity(user?.city)
    },[user])

    const onSubmit = (event) => {
        dispatch(update(event.username, event.email, event.password, event.password2, event.first_name, event.last_name, event.phone, event.city, user.id))
        reset()
    };

    useEffect(()=>{
        if (loginErrors?.username?.username){
            setErrorsMessage(loginErrors?.username?.username)
        }if (loginErrors?.email?.email){
            setErrorsMessage(loginErrors?.email?.email)
        }if (loginErrors?.password){
            setErrorsMessage(loginErrors?.password)
        }
    },[loginErrors])

    function loadAvatarHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <ThemeProvider theme={theme}>
            <Alert status={errorsMessage ? errorsMessage : successMessage}
                   message={errorsMessage ? errorsMessage : successMessage}
                   relink={false} logout={false} icon={errorsMessage ? 'error' : 'success'}/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: 621,
                    }}
                 component='div'>
                    <Fade >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Ваши данные
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }} item xs={12}>
                                    <Tooltip title='Загрузить аватарку'>
                                        <label htmlFor="avatar">
                                <Avatar sx={{ width: 56, height: 56, cursor: 'pointer' }} alt={!!user ? user.username : 'N'} src={user?.avatar} />
                                        </label>
                                    </Tooltip>
                                    <input onChange={(e) =>loadAvatarHandler(e)} hidden type="file" id="avatar" accept="image/*"/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register('first_name')}
                                        error={!!errors.first_name}
                                        name="first_name"
                                        fullWidth
                                        id="first_name"
                                        label={'Ваше имя'}
                                        helperText={errors?.first_name?.message}
                                        value={first_name ? first_name : ''}
                                        onChange={handleChangeFirstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register('last_name')}
                                        error={errors.last_name}
                                        name="last_name"
                                        fullWidth
                                        id="last_name"
                                        label={'Фамилия'}
                                        helperText={errors?.last_name?.message}
                                        value={last_name ? last_name : ''}
                                        onChange={handleChangeLastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register('email')}
                                        error={!!errors.email}
                                        required
                                        fullWidth
                                        id="email"
                                        helperText={errors?.email?.message}
                                        name="email"
                                        label={'Email-адрес'}
                                        autoComplete="email"
                                        value={email ? email : ''}
                                        onChange={handleChangeEmail}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register('username')}
                                        error={!!errors.username}
                                        name="username"
                                        required
                                        fullWidth
                                        id="username"
                                        label={'Логин'}
                                        helperText={errors?.username?.message}
                                        onChange={handleChangeUserName}
                                        value={username ? username : ''}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register('phone')}
                                        error={!!errors.phone}
                                        fullWidth
                                        id="phone"
                                        helperText={errors?.phone?.message}
                                        name="phone"
                                        autoComplete="phone"
                                        type="tel"
                                        label={'Телефон'}
                                        value={phone ? phone : ''}
                                        onChange={handleChangePhone}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register('city')}
                                        error={!!errors.city}
                                        fullWidth
                                        id="city"
                                        helperText={errors?.city?.message}
                                        name="city"
                                        autoComplete="city"
                                        label={'Адрес доставки'}
                                        minRows={3}
                                        multiline={true}
                                        value={city ? city : ''}
                                        onChange={handleChangeCity}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register('password')}
                                        error={!!errors.password}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Пароль"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register('password2')}
                                        error={!!errors.password2}
                                        required
                                        fullWidth
                                        name="password2"
                                        label="Повторите ввод пароля"
                                        type="password"
                                        id="password2"
                                        autoComplete="new-password2"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                disabled={!isValid}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Изменить
                            </Button>
                        </Box>
                    </Fade>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default DashBoard;