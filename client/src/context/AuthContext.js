import {createContext} from "react";

function mokFunc() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: mokFunc,
    logout: mokFunc,
    isAuthenticated: false
})
