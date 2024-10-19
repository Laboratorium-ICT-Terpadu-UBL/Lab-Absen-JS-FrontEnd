import { createSlice } from "@reduxjs/toolkit"

const getThemeLocalStorage = () => {
    const getLocalStorage = localStorage.getItem('theme')
    return getLocalStorage === null ? { isDarkMode: false } : JSON.parse(getLocalStorage)
}

const saveThemeLocalStorage = (value) => {
    const theme = { isDarkMode: value }
    localStorage.setItem('theme', JSON.stringify(theme))
}

const initialState = getThemeLocalStorage()

const themeSlice = createSlice({
    name: 'themeState',
    initialState: initialState,
    reducers: {
        setDarkMode(state, action) {
            state.isDarkMode = action.payload
            saveThemeLocalStorage(action.payload)
        },
    }
})

export const themeAction = themeSlice.actions
export default themeSlice.reducer
