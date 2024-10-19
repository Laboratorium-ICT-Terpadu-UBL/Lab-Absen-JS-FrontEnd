import { createSlice } from "@reduxjs/toolkit"

const getDateSessionStorage = () => {
    const getSessionStorage = sessionStorage.getItem("drf")
    return getSessionStorage ? getSessionStorage : null
}

const saveDateSessionStorage = (value) => {
    sessionStorage.setItem("drf", value)
}

const initialState = getDateSessionStorage()

const dateSlice = createSlice({
    name: 'dateState',
    initialState: initialState,
    reducers: {
        setDate(state, action) {
            state = action.payload
            saveDateSessionStorage(action.payload)
        },
    }
})

export const dateAction = dateSlice.actions
export default dateSlice.reducer