import { combineReducers } from "@reduxjs/toolkit";
import darkMode from './darkMode'
import ActiveChatSlice from './activeChat'
import secondRecallSlice from './secondRecall'

export default combineReducers({
    darkMode: darkMode,
    activeChat: ActiveChatSlice,
    secondRecall: secondRecallSlice
})