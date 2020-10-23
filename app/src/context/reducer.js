import React, { useReducer } from "react";

let user = "";
let token = "";

const storageUser = localStorage.getItem('user');
const storageToken = localStorage.getItem('token');

if (storageUser)
    user = JSON.parse(storageUser) || "";
if (storageToken)
    token = storageToken || "";
    

export const initialState = {
    userDetails: user || "",
    token: token || "",
    loading: false,
    errorMessage: null
}

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                loading: true
            };
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                user: action.payload.user,
                token: action.payload.accessToken,
                loading: false
            };
        case "LOGOUT":
            return {
                ...initialState,
                user: "",
                token: ""
            };
        case "LOGIN_ERROR":
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};