import { createSlice } from "@reduxjs/toolkit";
import { fetchConToken, fetchSinToken } from "../utils/fetch";
import { toast } from "react-toastify";

const initialState = {
  user: {},
  isVerified: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      return {
        user: action.payload.user,
      };
    },
    logout(state, action) {
      return initialState;
    },
    verified(state, action) {
      return {
        isVerified: action.payload.isVerified,
      };
    },
    notVerified() {
      return {
        isVerified: false,
      };
    },
  },
});

// External function
export const startLogin = (email, password) => {
  return async (dispatch) => {
    let resp, body;
    try {
      resp = await fetchSinToken(
        "users/loginAdmin",
        { email, password },
        "POST"
      );
      body = await resp.json();
      console.log(body);

      if (resp.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        // dispatch( login({
        //   user:{
        //     uid: body.result.id,
        //     name: body.result.username,
        //   }
        // }));
        toast.success("Usuario logueado", {
          position: "top-center",
        });
      } else {
        toast.error("Algo salio mal", {
          position: "top-center",
        });
      }
    } catch (e) {
      toast.error(`Error: ${e}`, {
        position: "top-center",
      });
    }
  };
};

export const startRegister = (email, names, surnames, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "users/insertAdmin",
      { email, names, surnames, password },
      "POST"
    );
    const body = await resp.json();

    if (resp.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        login({
          user: {
            uid: body.result.id,
            name: body.result.username,
          },
        })
      );
      toast.success("Usuario creado", {
        position: "top-center",
      });
    } else {
      toast.error("Error al registrar usuario", {
        position: "top-center",
      });
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    if (localStorage.getItem("token")) {
      const resp = await fetchConToken("users/verifyToken");
      const body = await resp.json();

      if (resp.ok) {
        // localStorage.setItem('token',body.token);
        // localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(
          login({
            user: {
              uid: body.result.id,
              name: body.result.name,
            },
          })
        );
      } else {
        console.log("BBBBBBBBBBBBB");
        // dispatch(checkingFinish());
      }
    }
  };
};

export const setVerified = () => {
  return async (dispatch) => {
    dispatch(
      login({
        isVerified: true,
      })
    );
  };
};
export const { login, logout, verified, notVerified } = authSlice.actions;

export default authSlice.reducer;
