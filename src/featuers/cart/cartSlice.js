import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const url = 'https://course-api.com/react-useReducer-cart-project'

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
  try {
    console.log(name)
    console.log(thunkAPI.getState())
    // thunkAPI.dispatch(openModal())
    const { data } = await axios(url);
    return data
  } catch (err) {
    thunkAPI.rejectWithValue('Something went wrong')
  }
})

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};


const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter(item => item.id !== itemId)
    },
    increase: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find(item => item.id === itemId)
      cartItem.amount += 1
    },
    decrease: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find(item => item.id === itemId);
      cartItem.amount -= 1;

      if (cartItem.amount === 0) {
        state.cartItems = state.cartItems.filter(item => item.id !== itemId);
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0
      state.cartItems.forEach(item => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount;
      state.total = total;
    }
  }, extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action)
      });
  },
});
export const { clearCart, calculateTotals, removeItem, increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;
