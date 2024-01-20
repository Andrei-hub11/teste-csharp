import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UpdateUser,
  User,
  UserLogin,
  UserRegister,
  UserToEdit,
} from "../../types/types";

import accountService from "./accountService";

interface AccountUserState {
  User: User;
  Users: User[] | [];
  UserToEdit: UserToEdit | "";
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  Role: [string];
}

const initialState: AccountUserState = {
  User: {
    Id: "",
    UserName: "",
    LastName: "",
    Email: "",
  },
  Users: [],
  UserToEdit: "",
  Role: [""],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUsers = createAsyncThunk("account/users", async () => {
  try {
    return await accountService.getUsers();
  } catch (error) {
    const message = (error as Error).message;

    throw new Error(message);
  }
});

export const login = createAsyncThunk(
  "account/login",
  async (user: UserLogin) => {
    try {
      return await accountService.login(user);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  }
);

export const register = createAsyncThunk(
  "account/register",
  async (user: UserRegister, thunkAPI) => {
    try {
      return await accountService.register(user);
    } catch (error) {
      const message = (error as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addNewUser = createAsyncThunk(
  "account/add-user",
  async (user: UserRegister, thunkAPI) => {
    try {
      return await accountService.addNewUser(user);
    } catch (error) {
      const message = (error as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfileUser = createAsyncThunk(
  "account/update-user",
  async (userData: UpdateUser) => {
    try {
      return await accountService.updateProfileUser(userData);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  }
);

export const deleteUserByEmail = createAsyncThunk(
  "account/delete-user",
  async (email: string) => {
    try {
      return await accountService.deleteUserByEmail(email);
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  }
);

export const getMe = createAsyncThunk("account/me", async (token: string) => {
  try {
    return await accountService.getMe(token);
  } catch (error) {
    const message = (error as Error).message;

    throw new Error(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return accountService.logout();
});

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setUserToEdit: (state, action: PayloadAction<UserToEdit>) => {
      state.UserToEdit = action.payload;
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.Users = state.Users.filter((user) => user.Email !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<AccountUserState>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.Users = Array.isArray(action.payload.Users)
            ? action.payload.Users.filter(
                (user) => user.Email !== state.User.Email
              )
            : [];
          state.Role = action.payload.Role;
        }
      )
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AccountUserState>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.User = action.payload.User;
          state.Role = action.payload.Role;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      })

      .addCase(addNewUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AccountUserState>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.User = action.payload.User;
          state.Role = action.payload.Role;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      })
      .addCase(updateProfileUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateProfileUser.fulfilled,
        (state, action: PayloadAction<AccountUserState>) => {
          state.isLoading = false;
          state.isSuccess = true;

          state.Users = state.Users.map((user) => {
            if (user.Id === action.payload.User.Id) {
              const updatedUser = {
                ...user,
                UserName: action.payload.User.UserName,
                LastName: action.payload.User.LastName,
                Email: action.payload.User.Email,
              };

              return updatedUser;
            }
            return user;
          });
        }
      )
      .addCase(updateProfileUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      })
      .addCase(deleteUserByEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.Message || "Unknown error";
      })
      .addCase(deleteUserByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Unknown error";
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Erro desconhecido";
        state.User = {
          Id: "",
          UserName: "",
          LastName: "",
          Email: "",
        };
        state.Role = [""];
      })
      .addCase(
        getMe.fulfilled,
        (state, action: PayloadAction<AccountUserState>) => {
          state.isLoading = false;
          state.User = action.payload.User;
          state.Role = action.payload.Role;
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.User = {
          Id: "",
          UserName: "",
          Email: "",
          LastName: "",
        };
        state.Role = [""];
        state.isSuccess = false;
      });
  },
});

export const { reset, setUserToEdit, removeUser } = accountSlice.actions;
export default accountSlice.reducer;
