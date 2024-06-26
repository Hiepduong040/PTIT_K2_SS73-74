import  reducerTodo  from "../store/reducers/todoReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        user:reducerTodo
    }
})

