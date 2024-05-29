import {createSlice} from '@reduxjs/toolkit';

export const produkSlice = createSlice({
  name: 'produk',
  initialState: {
    data: [],
  },

  reducers: {
    addProdukRedux: (state, action) => {
      // state.data.push(action.payload);
      state.data.push(action.payload);
    },
    setProdukRedux: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addProdukRedux, setProdukRedux} = produkSlice.actions;

export default produkSlice.reducer;
