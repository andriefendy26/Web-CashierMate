import {createSlice} from '@reduxjs/toolkit';

export const riwayatSlice = createSlice({
  name: 'riwayat',
  initialState: {
    data: [],
  },

  reducers: {
    addRiwayatRedux: (state, action) => {
      // state.data.push(action.payload);
      state.data.push(action.payload);
    },
    setRiwayatRedux: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addRiwayatRedux, setRiwayatRedux} = riwayatSlice.actions;

export default riwayatSlice.reducer;