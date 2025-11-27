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
  sessionBegin,
} from "./slices/authSlice";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../siteConfig";

export const registerUser = createAsyncThunk<
  boolean | string,
  RegisterFormData,
  { rejectValue: string }
>(
  "auth/registerUser",
  async (formData: RegisterFormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(registerStart());
      const response = await axios.post(`${BACKEND_URL}users/register/`, {
        email: formData.email,
        password: formData.password,
        username: formData.username,
      });

      if (!response.status) {
        throw new Error("Ошибка регистрации!");
      }
      const data = await response.data;
      dispatch(registerSuccess({ username: data.username, email: data.email }));
      dispatch(clearRegisterFormData({}));
      return true;
    } catch (err) {
      if (err instanceof AxiosError && err.status === 400) {
        // debugger;
        if (
          err.response?.data?.username
        ) {
          dispatch(
            registerFailure(
              "Ошибка регистрации! Клиент с таким ником уже зарегистрирован"
            )
          );
        } else if (err.response?.data?.password) {
          dispatch(
            registerFailure(
              "Ошибка регистрации! пароль должен иметь не менее 8-и символов, буквы и цифры"
            )
          );
        } else {
          dispatch(registerFailure("Ошибка при регистрации!"));
        }

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
      const response = await axios.post(`${BACKEND_URL}token/`, {
        username: formData.username,
        password: formData.password,
      });

      if (!response.status) {
        throw new Error("Ошибка входа!");
      }
      const data = await response.data;
      dispatch(
        loginSuccess({
          accessToken: data.access,
          refreshToken: data.refresh,
          username: formData.username,
          isUserAdmin: data.is_admin,
        })
      );
      dispatch(clearLoginFormData({}));
      return true;
    } catch (err) {
      if (err instanceof AxiosError && err.status === 401) {
        dispatch(
          registerFailure("Ошибка авторизации! Неверный логин или пароль")
        );
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

interface sessionBeginArg {
  token: string;
}

export const sessionBeginThunk = createAsyncThunk<void, sessionBeginArg>(
  "auth/sessionBegin",
  async ({ token }: sessionBeginArg, { dispatch }) => {
    try {
      dispatch(registerStart());
      const response = await axios.get(`${BACKEND_URL}user/by-token/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.status) {
        throw new Error("Ошибка получение username!");
      }
      const data = await response.data;
      dispatch(
        sessionBegin({ username: data.username, isUserAdmin: data.is_admin })
      );
      dispatch(clearLoginFormData({}));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(registerFailure(err.message));
      }
    }
  }
);
