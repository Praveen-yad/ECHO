import { createSlice } from "@reduxjs/toolkit";


const ActiveChatSlice = createSlice({
    name: 'activeChat',
    initialState: '',
    reducers:{
        setActiveChat(state, action){
            return action.payload
        }
    }
})


export const { setActiveChat } = ActiveChatSlice.actions
export default ActiveChatSlice.reducer;