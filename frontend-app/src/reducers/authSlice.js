import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  status: "idle",
  error: null,
  successMessage: "",
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { first_name, last_name, email, password, re_password },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/`,
        { first_name, last_name, email, password, re_password },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const facebookAuthenticate = createAsyncThunk(
  "auth/facebookAuthenticate",
  async ({ state, code }, { rejectWithValue }) => {
    if (state && code && !localStorage.getItem("access")) {
      const details = { state, code };
      const formBody = Object.keys(details)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
        )
        .join("&");

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/o/facebook/?${formBody}`,
          {},
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
    return Promise.reject("Invalid state or code");
  }
);

export const googleAuthenticate = createAsyncThunk(
  "auth/googleAuthenticate",
  async ({ state, code }, { rejectWithValue }) => {
    if (state && code && !localStorage.getItem("access")) {
      const details = { state, code };
      const formBody = Object.keys(details)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
        )
        .join("&");

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`,
          {},
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
    return Promise.reject("Invalid state or code");
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async ({ uid, token }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
        { uid, token },
        { headers: { "Content-Type": "application/json" } }
      );
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkAuthenticated = createAsyncThunk(
  "auth/checkAuthenticated",
  async (_, { rejectWithValue }) => {
    if (localStorage.getItem("access")) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
          { token: localStorage.getItem("access") },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (response.data.code !== "token_not_valid") {
          return { success: true };
        }
        return Promise.reject("Token is not valid");
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
    return Promise.reject("No access token found");
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    if (localStorage.getItem("access")) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/users/me/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access")}`,
              Accept: "application/json",
            },
          }
        );
        console.log("User data:", response.data);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
    return Promise.reject("No access token found");
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPasswordConfirm = createAsyncThunk(
  "auth/resetPasswordConfirm",
  async (
    { uid, token, new_password, re_new_password },
    { rejectWithValue }
  ) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        { uid, token, new_password, re_new_password },
        { headers: { "Content-Type": "application/json" } }
      );
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    dispatch({ type: "auth/logout" });
    window.location.reload();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = "";
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.status = "succeeded";
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(googleAuthenticate.fulfilled, (state, action) => {
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(googleAuthenticate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(facebookAuthenticate.fulfilled, (state, action) => {
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(facebookAuthenticate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(verify.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(verify.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(checkAuthenticated.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(checkAuthenticated.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.user = null;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.successMessage = "Successfully logged in!";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetPasswordConfirm.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(resetPasswordConfirm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.access = null;
        state.refresh = null;
        state.isAuthenticated = false;
        state.user = null;
        state.status = "idle";
      });
  },
});

export const { clearSuccessMessage, clearError } = authSlice.actions;
export default authSlice.reducer;
