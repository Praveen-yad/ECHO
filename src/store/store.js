import { configureStore } from "@reduxjs/toolkit";
import reducer from './CombineReducer'
const store = configureStore({reducer})

export default store