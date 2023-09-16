import { createSlice } from "@reduxjs/toolkit";


const RecallSlice = createSlice({
    name: 'recall',
    initialState: 0,
    reducers:{
        setRecall(state, action){
            return state+1
        }
    }
})


export const { setRecall } = RecallSlice.actions
export default RecallSlice.reducer;