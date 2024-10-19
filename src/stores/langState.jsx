import { createSlice } from "@reduxjs/toolkit"

const getLangLocalStorage = () => {
    const getLocalStorage = localStorage.getItem('language')
    return getLocalStorage === null ? { isEnLang: false } : JSON.parse(getLocalStorage)
}

const saveLangLocalStorage = (value) => {
    const language = { isEnLang: value }
    localStorage.setItem('language', JSON.stringify(language))
}

const initialState = getLangLocalStorage()

const langSlice = createSlice({
    name: 'langState',
    initialState: initialState,
    reducers: {
        setLangMode(state, action) {
            state.isEnLang = action.payload
            saveLangLocalStorage(action.payload)
        },
    }
})

export const langAction = langSlice.actions
export default langSlice.reducer
