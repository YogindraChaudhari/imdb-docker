import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isSearchOpen: false,
    isImageLoading: true,
  },
  reducers: {
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setImageLoading: (state, action) => {
      state.isImageLoading = action.payload;
    },
  },
});

export const { toggleSearch, setImageLoading } = uiSlice.actions;
export default uiSlice.reducer;
