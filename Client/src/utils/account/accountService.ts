import axios, { AxiosError } from "axios";
import Cookies from "cookies-js";

import {
  ErrorResponse,
  UpdateUser,
  UserLogin,
  UserRegister,
} from "../../types/types";
import manageJWTCookieState from "../customHook/useJwt/useJwt";
import ToastService from "../variables/toastService";

//definindo endpoint
const API_URL = import.meta.env.VITE_MOVIE_APP_API_URL + "/api/v1/";

const getUsers = async () => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.get(API_URL + `users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.status === 400) {
        ToastService.showError(axiosError.response?.data.Errors);
      }
      throw new Error(axiosError.response?.data.Message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

const login = async (userData: UserLogin) => {
  try {
    const { data } = await axios.post(API_URL + "login", userData);
    const { Token } = data;

    const { saveToken } = manageJWTCookieState();
    saveToken(Token);

    return data;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response) {
      const axiosError = error as AxiosError<ErrorResponse>;

      throw new Error(axiosError.response?.data.Message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

const register = async (userData: UserRegister) => {
  const { data } = await axios.post(API_URL + "register", userData);

  const { Token } = data;

  const { saveToken } = manageJWTCookieState();
  saveToken(Token);

  return data;
};

const addNewUser = async (userData: UserRegister) => {
  const { data } = await axios.post(API_URL + "register", userData);

  return data;
};

const updateProfileUser = async (userData: UpdateUser) => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.put(
      API_URL + `update-user/${userData.Id}`,
      {
        UserName: userData.UserName,
        LastName: userData.LastName,
        Email: userData.Email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.status === 400) {
        ToastService.showError(axiosError.response?.data.Errors);
      }
      throw new Error(axiosError.response?.data.Message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

const deleteUserByEmail = async (email: string) => {
  const { token } = manageJWTCookieState();

  try {
    const { data } = await axios.delete(API_URL + `delete-user/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.status === 400) {
        ToastService.showError(axiosError.response?.data.Errors);
      }
      throw new Error(axiosError.response?.data.Message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

const getMe = async (accessToken: string) => {
  try {
    const { data } = await axios.get(API_URL + "get-me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.Message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

const logout = () => {
  Cookies.expire("accessToken");

  return null;
};

const accountService = {
  getUsers,
  register,
  addNewUser,
  login,
  updateProfileUser,
  deleteUserByEmail,
  getMe,
  logout,
};

export default accountService;
