import { createSlice } from "@reduxjs/toolkit";


const darkMode = createSlice({
    name: 'darkMode',
    initialState: true,
    reducers:{
        setDark(state, action){
            return !state
        }
    }
})


export const { setDark } = darkMode.actions
export default darkMode.reducer;