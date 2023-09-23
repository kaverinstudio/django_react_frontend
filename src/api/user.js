import axios from "axios";
import {
  errorMessages,
  successMessages,
  userLoaded,
  userLoading,
  userLogin,
  userLogout,
} from "../redux/slices/authSlice";
import { API_URL } from "./config";

export const auth = () => {
  return async (dispatch) => {
    try {
      dispatch(userLoading());
      const response = await axios.get(`${API_URL}api/auth/user`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      dispatch(userLoaded(response.data));
    } catch (e) {
      dispatch(errorMessages(e.response.data));
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      dispatch(userLoading());
      const response = await axios.post(`${API_URL}api/auth/login`, {
        username,
        password,
      });
      dispatch(userLogin(response.data));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      dispatch(errorMessages(e.response.data));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(userLoading());
      await axios.post(`${API_URL}api/auth/logout`, "", {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      dispatch(userLogout());
      localStorage.removeItem("token");
    } catch (e) {
      dispatch(errorMessages(e.response.data));
    }
  };
};

export const registration = (username, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(userLoading());
      const response = await axios.post(`${API_URL}api/auth/register`, {
        username,
        email,
        password,
      });
      dispatch(userLoaded(response.data.user));
      localStorage.setItem("token", response.data.token);
      dispatch(successMessages(response.data.message));
    } catch (e) {
      dispatch(errorMessages(e.response.data));
    }
  };
};

export const update = (
  username,
  email,
  password,
  password2,
  first_name,
  last_name,
  phone,
  city,
  userId
) => {
  return async (dispatch) => {
    try {
      dispatch(userLoading());
      const response = await axios.put(
        `${API_URL}api/auth/update/${userId}`,
        {
          username,
          email,
          password,
          password2,
          first_name,
          last_name,
          phone,
          city,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );
      console.log(response.data);
      dispatch(userLoaded(response.data.user));
      localStorage.setItem("token", response.data.token);
      dispatch(successMessages(response.data.message));
    } catch (e) {
      dispatch(errorMessages(e.response.data));
    }
  };
};

export const uploadAvatar = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      console.log(file);
      const response = await axios.post(`${API_URL}api/auth/avatar`, formData, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      dispatch(userLoaded(response.data.user));
      console.log(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      dispatch(errorMessages(e.response.data));
    }
  };
};
