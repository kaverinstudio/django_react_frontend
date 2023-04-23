import axios from "axios";
import {API_URL} from "./config";
import keygen from "keygenerator";
import {
  errorProductMessages,
  getCart,
  loadInitialProducts,
  loadPhotos,
  loadProducts,
} from "../redux/slices/productSlice";
import {errorFileMessages, hideUploader, setConfirmOrder, showUploader,} from "../redux/slices/fileSlice";
import {errorMessages} from "../redux/slices/authSlice";

export const getProducts = (
    category = "",
    slug = "",
    minPrice,
    maxPrice,
    sort,
    manufactured,
    cat
) => {
  return async (dispatch) => {
    let categoryUrl = "";
    let slugUrl = "";
    if (category) {
      categoryUrl = `${category}/`;
    }
    if (slug) {
      slugUrl = `${slug}/`;
    }
    try {
      dispatch(showUploader());
      const response = await axios.get(
          `${API_URL}api/products/${categoryUrl}${slugUrl}`,
          {
            params: {
              minPrice: minPrice,
              maxPrice: maxPrice,
              sort: sort,
              manufactured: manufactured,
              cat: cat,
            },
          }
      );
      dispatch(loadProducts(response.data.products));
      dispatch(loadPhotos(response.data.photos));
      if (!minPrice && !maxPrice) {
        dispatch(loadInitialProducts(response.data.products));
      }
      dispatch(hideUploader());
    } catch (e) {
      console.log(e);
    }
  };
};

export const addProductToCart = (product, user, count) => {
  return async (dispatch) => {
    try {
      let session_key = localStorage.getItem("session_key");
      if (!session_key) {
        session_key = keygen.session_id();
        localStorage.setItem("session_key", session_key);
      }
      let config = {
        headers: {Authorization: `Token ${localStorage.getItem("token")}`},
      };
      if (!user) {
        config = {
          headers: {"X-CSRFToken": session_key},
        };
      }
      const response = await axios.post(
          `${API_URL}api/cart/create/`,
          {
            product,
            count,
            session_key,
          },
          config
      );
      dispatch(getCart(response.data));
    } catch (e) {
      dispatch(errorProductMessages(e));
    }
  };
};

export const getUserCart = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}api/cart/`);
      dispatch(getCart(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateUserCart = (user, id, count) => {
  return async (dispatch) => {
    try {
      let config = {
        headers: {Authorization: `Token ${localStorage.getItem("token")}`},
      };
      if (!user) {
        config = {
          headers: {"X-CSRFToken": localStorage.getItem("session_key")},
        };
      }
      const response = await axios.put(
          `${API_URL}api/cart/update/${id}`,
          {count},
          config
      );
      dispatch(getCart(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteUserCart = (user, id) => {
  return async (dispatch) => {
    try {
      let config = {
        headers: {Authorization: `Token ${localStorage.getItem("token")}`},
      };
      if (!user) {
        config = {
          headers: {"X-CSRFToken": localStorage.getItem("session_key")},
        };
      }
      const response = await axios.delete(
          `${API_URL}api/cart/delete/${id}`,
          config
      );
      dispatch(getCart(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAllProductInCart = (user) => {
  return async (dispatch) => {
    try {
      let config = {
        headers: {Authorization: `Token ${localStorage.getItem("token")}`},
      };
      if (!user) {
        config = {
          headers: {"X-CSRFToken": localStorage.getItem("session_key")},
        };
      }
      const response = await axios.delete(`${API_URL}api/cart/delete/`, config);
      dispatch(getCart(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const shopConfirmOrder = (
    user,
    first_name,
    last_name,
    phone,
    email,
    address,
    comments,
    delivery,
    order
) => {
  return async (dispatch) => {
    try {
      dispatch(showUploader());
      let config = {
        headers: {Authorization: `Token ${localStorage.getItem("token")}`},
      };
      if (!user) {
        config = {
          headers: {"X-CSRFToken": localStorage.getItem("session_key")},
        };
      }
      const response = await axios.post(
          `${API_URL}api/cart/confirm`,
          {
            first_name,
            last_name,
            phone,
            email,
            address,
            comments,
            delivery,
            order,
          },
          config
      );
      dispatch(setConfirmOrder(response.data.order));
      dispatch(getCart(null));
      dispatch(errorFileMessages("ok"));
      dispatch(hideUploader());
    } catch (e) {
      dispatch(errorMessages(e.response.data));
      dispatch(hideUploader());
    }
  };
};
