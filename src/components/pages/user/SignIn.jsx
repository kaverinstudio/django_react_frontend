import React, {useEffect} from 'react';
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
import {login} from "../../../api/user";
import {Popover} from "@mui/material";
import {userLogout} from "../../../redux/slices/authSlice";
import Alert from "../../Alert";

const schema = yup.object().shape({
    user: yup.string().required('Это поле должно быть заполнено').min(2, 'Количество символов не может быть меньше 2').max(60, 'Количество символов не может быть больше 60'),
    password: yup.string().required('Это поле должно быть заполнено').min(8, 'Количество символов не может быть меньше 8').max(60, 'Количество символов не может быть больше 60'),
})

const SignIn = ({onRegister}) => {
    const dispatch = useDispatch()
    const loginErrors = useSelector(state => state.auth.errors)
    const theme = createTheme();

    const {
        handleSubmit,
        register,
        formState: {
            errors,
            isValid,
        },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        reValidateMode: 'onChange',
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true,
    })

    const onSubmit = (event) => {
        dispatch(login(event.user, event.password))
        reset()
    };

    // const [anchorEl, setAnchorEl] = React.useState(null);
    //
    // const handleClose = () => {
    //     setAnchorEl(null);
    //     dispatch(userLogout(''))
    // };
    //
    // useEffect(()=>{
    //     if (loginErrors?.non_field_errors){
    //         setAnchorEl('open')
    //     }
    // },[loginErrors])
    //
    //
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
            {/*    <Typography sx={{ p: 2, textAlign: 'center', color: 'red' }}>{loginErrors?.non_field_errors}</Typography>*/}
            {/*</Popover>*/}
            <Alert status={loginErrors?.non_field_errors} message={loginErrors?.non_field_errors} icon={'error'} relink={false} logout={true}/>
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
                        Войти в личный кабинет
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            {...register('user')}
                            error={!!errors.user}
                            margin="normal"
                            required
                            fullWidth
                            id="user"
                            label="Логин или email адрес"
                            name="user"
                            autoComplete="user"
                            autoFocus
                            helperText={errors?.user?.message}
                        />
                        <TextField
                            {...register('password')}
                            error={!!errors.password}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={errors?.password?.message}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Запомнить меня"
                        />
                        <Button
                            type="submit"
                            disabled={!isValid}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Забыли пароль?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link onClick={onRegister} href="#" variant="body2">
                                    {"Нет аккаунта? Зарегистрируйтесь"}
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

export default SignIn;