import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: string | string[];
    name: string | string[];
    image:string | null | string[];
    cost: number;
    quantity:number;
}

export interface CartState {
    value: number;
    cart: CartItem[];
}

const initialState: CartState = {
    value: 0,
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.cart.push(action.payload);
            console.log("cart items",state.cart)
        },
        removeItems: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
    },
});


export const { addToCart, removeItems } = cartSlice.actions;
export default cartSlice.reducer;
