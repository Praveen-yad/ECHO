import { createSlice } from "@reduxjs/toolkit";


const SecondRecallSlice = createSlice({
    name: 'secondRecall',
    initialState: 0,
    reducers:{
        setSecondRecall(state, action){
            return state+1
        }
    }
})


export const { setSecondRecall } = SecondRecallSlice.actions
export default SecondRecallSlice.reducer;