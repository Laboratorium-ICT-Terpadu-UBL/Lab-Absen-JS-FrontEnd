import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeState'
import authReducer from './authState'
import langReducer from './langState'
import timeReducer from './timeState'
import dateReducer from './dateState'

const store = configureStore({
    reducer: {
        themes: themeReducer,
        auths: authReducer,
        languages: langReducer,
        cTimeStamp: timeReducer,
        dateDrf: dateReducer
    }
})

export default store