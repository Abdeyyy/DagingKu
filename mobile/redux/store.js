import imageSlice from './slices/imageSlice.js';
import { createSlice, configureStore } from '@reduxjs/toolkit';


const store = configureStore({
  reducer: {
  	"image": imageSlice
  }
})

export default store;
