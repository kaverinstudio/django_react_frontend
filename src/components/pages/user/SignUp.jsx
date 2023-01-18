import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fade from 'react-reveal/Fade';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {registration} from "../../../api/user";
import {Popover} from "@mui/material";
import {clearMessages, userLogout} from "../../../redux/slices/authSlice";
import Alert from "../../Alert";


const theme = createTheme();

const schema = yup.object().shape({
    name: yup.string().required('Это поле должно быть заполнено').min(2, 'Количество символов не может быть меньше 2').max(60, 'Количество символов не может быть больше 60'),
    email: yup.string().required('Это поле должно быть заполнено').email('Введите действительный Email адрес'),
    password: yup.string().required('Это поле должно быть заполнено').min(8, 'Количество символов не может быть меньше 8').max(60, 'Количество символов не может быть больше 60')
})

const SignUp = ({onLogin}) => {
    const dispatch = useDispatch()
    const loginErrors = useSelector(state => state.auth.errors)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        reValidateMode: 'onChange',
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true

    })

    const onSubmit = (event) => {
        dispatch(registration(event.name, event.email, event.password))
        reset()
    };

    // const [anchorEl, setAnchorEl] = useState(null);

    // const handleClose = () => {
    //     setAnchorEl(null);
    //     dispatch(clearMessages())
    // };

    // useEffect(()=>{
    //     if (loginErrors?.username || loginErrors?.email){
    //         setAnchorEl('open')
    //     }else {
    //         setAnchorEl(null)
    //     }
    // },[loginErrors])


    // const open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;

    return (
        <ThemeProvider theme={theme}>
            {/*<Popover*/}
            {/*    id={id}*/}
            {/*    open={open}*/}
            {/*    anchorEl={anchorEl}*/}
            {/*    onClose={handleClose}*/}
            {/*    anchorOrigin={{*/}
            {/*        vertical: 'center',*/}
            {/*        horizontal: 'center',*/}
            {/*    }}*/}
            {/*    transformOrigin={{*/}
            {/*        vertical: 'center',*/}
            {/*        horizontal: 'center',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {loginErrors?.username ? <Typography sx={{ p: 2, textAlign: 'center', color: 'red' }}>{loginErrors?.username}</Typography> : ''}*/}
            {/*    {loginErrors?.email ? <Typography sx={{ p: 2, textAlign: 'center', color: 'red' }}>{loginErrors?.email}</Typography> : ''}*/}
            {/*</Popover>*/}
            <Alert status={loginErrors?.username ? loginErrors?.username : loginErrors?.email} message={loginErrors?.username ? loginErrors?.username : loginErrors?.email} icon={'error'} logout={false} relink={false}/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: 621,
                    }}
                >
                    <Fade >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация на сайте
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('name')}
                                    error={!!errors.name}
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Логин"
                                    autoFocus
                                    helperText={errors?.name?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('email')}
                                    error={!!errors.email}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email адрес"
                                    name="email"
                                    autoComplete="email"
                                    helperText={errors?.email?.message}
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
                                    helperText={errors?.password?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Я хочу получать новости и уведомления об акциях на Email."
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
                            Зарегистрироваться
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={onLogin} href="#" variant="body2">
                                    Уже есть аккаунт? Войдите
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    </Fade>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;