import { createSlice } from "@reduxjs/toolkit";

let initial = localStorage.getItem('dark') == 'true' ? true : false

const darkMode = createSlice({
    name: 'darkMode',
    initialState: initial,
    reducers:{
        setDark(state, action){
            localStorage.setItem('dark', !state)
            return !state
        }
    }
})


export const { setDark } = darkMode.actions
export default darkMode.reducer;