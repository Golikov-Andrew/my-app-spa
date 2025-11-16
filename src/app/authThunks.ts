import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  type RegisterFormData,
  clearRegisterFormData,
  type LoginFormData,
  clearLoginFormData,
  loginSuccess,
} from "./slices/authSlice";
import axios from "axios";

export const registerUser = createAsyncThunk<
  boolean | string,
  RegisterFormData,
  { rejectValue: string }
>(
  "auth/registerUser",
  async (formData: RegisterFormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(registerStart());
      const response = await axios.post(
        `http://localhost:62417/api/v1/users/register/`,
        {
          email: formData.email,
          password: formData.password,
          username: formData.username,
        }
      );

      if (!response.status) {
        throw new Error("Ошибка регистрации!");
      }
      const data = await response.data;
      dispatch(registerSuccess({ username: data.username, email: data.email }));
      alert(`Клиент ${data.username} успешно зарегистрирован!`);
      dispatch(clearRegisterFormData({}));
      return true;
    } catch (err) {
      if (err instanceof Error) {
        dispatch(registerFailure(err.message));
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const loginUser = createAsyncThunk<
  boolean | string,
  LoginFormData,
  { rejectValue: string }
>(
  "auth/loginUser",
  async (formData: LoginFormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(registerStart());
      const response = await axios.post(
        `http://localhost:62417/api/v1/token/`,
        {
          username: formData.username,
          password: formData.password,
        }
      );

      if (!response.status) {
        throw new Error("Ошибка входа!");
      }
      const data = await response.data;
      dispatch(
        loginSuccess({
          accessToken: data.access,
          refreshToken: data.refresh,
          username: formData.username,
        })
      );
      alert(`Клиент ${formData.username} успешно залогинен!`);
      dispatch(clearLoginFormData({}));
      return true;
    } catch (err) {
      if (err instanceof Error) {
        dispatch(registerFailure(err.message));
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);
