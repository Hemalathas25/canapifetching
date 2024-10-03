import { createSlice } from "reduxjs/toolkit";
import { setCredentials } from "../component/DataFetcher";
import { Action } from "@remix-run/router";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(Action.payload));
        },

        logout: (state, action) => {
            state.userInfo = null;
            localStorage.clear();
        }
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;