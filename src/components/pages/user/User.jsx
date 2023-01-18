import React, {useEffect} from 'react';
import {Box, Tabs, Typography, Tab, Container} from "@mui/material";
import PropTypes from 'prop-types';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useDispatch, useSelector} from "react-redux";
import DashBoard from "./DashBoard";
import {auth} from "../../../api/user";


const User = () => {
    const [value, setValue] = React.useState('1');
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)


    const onRegister = () => {
        setValue('2')
    }
    const onLogin = () => {
        setValue('1')
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    if (isAuthenticated){
        return <DashBoard/>;
    }

    return (
        <Container maxWidth='md'>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="Войти в личный кабинет" value="1" />
                            <Tab label="Зарегистрироваться" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <SignIn onRegister={onRegister}/>
                    </TabPanel>
                    <TabPanel value="2">
                        <SignUp onLogin={onLogin}/>
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    )
};

export default User;