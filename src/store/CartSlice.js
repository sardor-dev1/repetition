import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductById = createAsyncThunk(
  "cart/fetchProductById",
  async (productId, thunkAPI) => {
    const response = await fetch(
      `https://headphones-server.onrender.com/products/${productId}`
    );
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Failed to fetch product data");
    }
    const product = await response.json();
    return product;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.carts.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.carts.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.carts = state.carts.filter(
        (product) => product.id !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const product = state.carts.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.carts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        const existingProduct = state.carts.find(
          (product) => product.id === action.payload.id
        );
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          state.carts.push({ ...action.payload, quantity: 1 });
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
