import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

const getAuthLocalStorage = () => {
    const getLocalStorage = localStorage.getItem("authentication")
    if (getLocalStorage === null) {
        return {
            isAuthenticated: false,
            payload: "",
        }
    } else {
        const { isAuthenticated, payload } = JSON.parse(getLocalStorage)
        return {
            isAuthenticated,
            payload,
        }
    }
}

const saveAuthLocalStorage = (isAuthenticated, payload) => {
    const authentication = { isAuthenticated, payload }
    localStorage.setItem("authentication", JSON.stringify(authentication))
}

const removeAuthLocalStorage = () => {
    localStorage.removeItem("authentication")
}


const initialState = () => {
    const { isAuthenticated, payload } = getAuthLocalStorage()
    const signInTokenCookie = Cookies.get("signInToken")
    if (isAuthenticated && signInTokenCookie) {
        return { isAuthenticated, payload }
    }
    return { isAuthenticated: false, payload: "" }
}

const authSlicer = createSlice({
    name: "auth",
    initialState: initialState(),
    reducers: {
        login(state, action) {
            state.isAuthenticated = true
            state.payload = action.payload
            saveAuthLocalStorage(true, state.payload)
        },
        logout(state) {
            state.isAuthenticated = false
            state.payload = ""
            removeAuthLocalStorage()
            Cookies.remove("signInToken")

        }
    }
})

export const authAction = authSlicer.actions
export default authSlicer.reducer