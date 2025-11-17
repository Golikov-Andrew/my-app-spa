import { createSlice } from "@reduxjs/toolkit";

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface authState {
  loading: boolean;
  error: string | null;
  username: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isUserAdmin: boolean;
  registerFormData: RegisterFormData;
  loginFormData: LoginFormData;
  isRedirectToLogin: boolean;
  isRedirectToAccount: boolean;
}

const initialState: authState = {
  loading: false,
  error: null,
  username: null,
  accessToken: null,
  refreshToken: null,
  isUserAdmin: false,
  registerFormData: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  loginFormData: {
    username: "",
    password: "",
  },
  isRedirectToLogin: false,
  isRedirectToAccount: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('token', action.payload.accessToken);
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setRegisterFormData: (state, action) => {
      state.registerFormData = action.payload;
    },
    setLoginFormData: (state, action) => {
      state.loginFormData = action.payload;
    },
    clearRegisterFormData: (state, action) => {
      state.registerFormData = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    },
    clearLoginFormData: (state, action) => {
      state.loginFormData = {
        username: "",
        password: "",
      };
    },
    setRedirectToLogin: (state, action) => {
      state.isRedirectToLogin = action.payload;
    },
    setRedirectToAccount: (state, action) => {
      state.isRedirectToAccount = action.payload;
    },
    logoutUser: (state, action) => {
      localStorage.removeItem('token');
      state.username = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isRedirectToLogin = true;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  setRegisterFormData,
  clearRegisterFormData,
  setLoginFormData,
  clearLoginFormData,
  setRedirectToLogin,
  setRedirectToAccount,
  logoutUser,
  loginSuccess
} = authSlice.actions;
export default authSlice.reducer;
