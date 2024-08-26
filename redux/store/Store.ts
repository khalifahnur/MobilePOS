import { configureStore } from "@reduxjs/toolkit";
import counterCart from '../CartSlice'

export const Store = configureStore({
    reducer:{
        cart:counterCart
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch;