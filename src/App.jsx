import React, {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import './assets/scss/app.scss';
import Header from "./components/Header";
import MainPage from "./components/pages/MainPage";
import Footer from "./components/Footer";
import User from "./components/pages/user/User";
import {Alert, Box, Container, Snackbar} from "@mui/material";
import { auth } from "./api/user";
import {useDispatch, useSelector} from "react-redux";
import LoadPhotoPage from "./components/pages/print/LoadPhotoPage";
import ConfirmOrderPage from "./components/pages/print/ConfirmOrderPage";
import { Helmet } from "react-helmet";
import PortfolioComponent from "./components/pages/portfolio/PortfolioComponent";
import ShopMainPage from "./components/pages/shop/ShopMainPage";
import ProductDetailPage from "./components/pages/shop/ProductDetailPage";
import BasketPage from "./components/pages/shop/BasketPage";
import ConfirmShopOrderPage from "./components/pages/shop/ConfirmShopOrderPage";
import FlatPage from "./components/pages/FlatPage";
import ContactPage from "./components/pages/ContactPage";

function App() {
  const dispatch = useDispatch()
  const snackBar = useSelector(state => state.products.snackBar)

  const [snackOpen, setSnackOpen] = useState(false)

  useEffect(()=>{
    setSnackOpen(snackBar)
  },[snackBar])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  useEffect(() => {
    dispatch(auth())
  }, [])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}>
      <Helmet>
        <title>Фотостудия "Фото №1"</title>
        <meta name='description' content='Лучшая фотостудия в городе' />
      </Helmet>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 'auto' }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/contact/" element={<ContactPage />} />
          <Route path="/:slug" element={<FlatPage />} />
          <Route path="/login/" element={<User />} />
          <Route path="/print/" element={<LoadPhotoPage />} />
          <Route path="/confirm/" element={<ConfirmOrderPage />} />
          <Route path="/portfolio/" element={<PortfolioComponent />} />
          <Route path="/portfolio/:cat/" element={<PortfolioComponent />} />
          <Route path="/products/" element={<ShopMainPage />} />
          <Route path="/products/:category/" element={<ShopMainPage />} />
          <Route path="/products/:category/:slug/" element={<ProductDetailPage />} />
          <Route path="/cart/" element={<BasketPage />} />
          <Route path="/cart/confirm/" element={<ConfirmShopOrderPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert elevation={6} everity="success" sx={{ width: '100%' }} onClose={handleClose}>
            Товар добавлен в корзину
          </Alert>
        </Snackbar>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
