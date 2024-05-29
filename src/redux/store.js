import {configureStore} from '@reduxjs/toolkit';
import kategoriReducer from './kategoriSlice';
import produkReducer from './produkSlice';
import cartReducer from './cartSlice';
import riwayatReduce from './riwayatSlice';

const store = configureStore({
  reducer: {
    kategori: kategoriReducer,
    produk: produkReducer,
    cart: cartReducer,
    riwayat : riwayatReduce
  },
});

export default store;
