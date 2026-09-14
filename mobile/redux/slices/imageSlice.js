import { createSlice, configureStore } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'Image Cache',
  initialState: {
    image: null
  },
  reducers: {
    storeImage: (state, action) => {
      state.image = action.payload;
    }
  }
})

export const { storeImage } = imageSlice.actions
export default imageSlice.reducer;