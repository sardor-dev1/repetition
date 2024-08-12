import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        carts: [],
        loading: false,
        error: null
    },
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.carts.find(product => product.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                state.carts.push({...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.carts = state.carts.filter(product => product.id!== action.payload);
        },
        updateQuantity: (state, action) => {
            const product = state.carts.find(product => product.id === action.payload.id);
            if (product) {
                product.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.carts = [];
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;