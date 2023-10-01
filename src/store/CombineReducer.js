import { combineReducers } from "@reduxjs/toolkit";
import RecallSlice from './recall'
import ActiveChatSlice from './activeChat'
import secondRecallSlice from './secondRecall'

export default combineReducers({
    recall: RecallSlice,
    activeChat: ActiveChatSlice,
    secondRecall: secondRecallSlice
})