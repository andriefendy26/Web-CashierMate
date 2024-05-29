import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },

  reducers: {
    addToCartRedux: (state, action) => {
      // state.data.push(action.payload);
      const cekItemInCart = state.data.find(
        item => item.id == action.payload.id,
      );
      if (cekItemInCart) cekItemInCart.qty++;
      else {
        state.data.push(action.payload);
      }
    },
    setCartRedux: (state, action) => {
      state.data = action.payload;
    },
    deleteItemCartRedux: (state, action) => {
      const filter = state.data.filter(item => item.id != action.payload);
      state.data = filter;
      //   console.log(filter)
    },

    updateItemInCart: (state, action) => {
      const cekItemInCart = state.data.find(
        item => item.id == action.payload.id,
      );
      if (cekItemInCart) cekItemInCart.qty = action.payload.qtyVal;

    },
  },
});

// Action creators are generated for each case reducer function
export const {addToCartRedux, setCartRedux, deleteItemCartRedux, updateItemInCart} =
  cartSlice.actions;

export default cartSlice.reducer;
