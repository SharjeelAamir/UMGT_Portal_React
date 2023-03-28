import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "authenticationSlice",
    initialState: {
        loginData: "",
        // token: localStorage.getItem("token"),
        // nav: localStorage.getItem("nav"),
        // loggedIn: localStorage.getItem("loggedIn"),
    },
    reducers: {
        LOGIN_SUCCESS: (state, action) => {
            return {
                ...state,
                // loginData: action.payload,
                // token: localStorage.getItem("token"),
                // nav: localStorage.getItem("nav"),
                // loggedIn: localStorage.getItem("loggedIn"),
            };
        },
        LOGIN_ERROR: (state) => {
            return {
                ...state,
                loginData: "",
                token: "",
                nav: "",
                loggedIn: "",
            };
        },
    },
});

export const { LOGIN_SUCCESS, LOGIN_ERROR } = slice.actions;
export default slice.reducer;
