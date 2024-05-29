import {createSlice} from '@reduxjs/toolkit';

export const kategoriSlice = createSlice({
  name: 'kategori',
  initialState: {
    data: [],
  },

  reducers: {
    addKategoriRedux: (state, action) => {
      // state.data.push(action.payload);
      state.data.push(action.payload);
    },
    setKategoriRedux: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addKategoriRedux, setKategoriRedux} = kategoriSlice.actions;

export default kategoriSlice.reducer;
