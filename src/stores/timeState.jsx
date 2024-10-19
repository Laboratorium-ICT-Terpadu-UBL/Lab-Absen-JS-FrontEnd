import { createSlice } from "@reduxjs/toolkit"

const initialState = { timeStamp: null }

const timeSlice = createSlice({
    name: 'timeState',
    initialState: initialState,
    reducers: {
        setTimeStamp(state, action) {
            state.timeStamp = action.payload
        },
    }
})

export const timeAction = timeSlice.actions
export default timeSlice.reducer
