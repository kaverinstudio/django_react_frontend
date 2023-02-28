import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import './assets/scss/app.scss';
import Header from "./components/Header";
import MainPage from "./components/pages/MainPage";
import Footer from "./components/Footer";
import User from "./components/pages/user/User";
import {Box, Container} from "@mui/material";
import {auth} from "./api/user";
import {useDispatch} from "react-redux";
import LoadPhotoPage from "./components/pages/print/LoadPhotoPage";
import ConfirmOrderPage from "./components/pages/print/ConfirmOrderPage";
import {Helmet} from "react-helmet";
import PortfolioComponent from "./components/pages/portfolio/PortfolioComponent";
import ShopMainPage from "./components/pages/shop/ShopMainPage";
import ProductDetailPage from "./components/pages/shop/ProductDetailPage";

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(auth())
  },[])
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh'}}>
      <Helmet>
        <title>Фотостудия "Фото №1"</title>
        <meta name='description' content='Лучшая фотостудия в городе'/>
      </Helmet>
      <Header />
        <Container maxWidth="lg" sx={{flex: 'auto'}}>
        <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/login/" element={<User />}/>
        <Route path="/print/" element={<LoadPhotoPage/>}/>
        <Route path="/confirm/" element={<ConfirmOrderPage/>}/>
        <Route path="/portfolio/" element={<PortfolioComponent/>}/>
        <Route path="/portfolio/:cat/" element={<PortfolioComponent/>}/>
        <Route path="/products/" element={<ShopMainPage/>}/>
        <Route path="/products/:category/" element={<ShopMainPage/>}/>
        <Route path="/products/:category/:slug/" element={<ProductDetailPage/>}/>
        <Route path="*" element={<MainPage />}/>
        </Routes>
        </Container>
      <Footer/>
    </Box>
  );
}

export default App;
