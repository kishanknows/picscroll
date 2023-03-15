import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  uploadModalShown: false,
  profileModalShown: false,
  drawerShown: false,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    showUploadModal: (state, action) => {
      state.uploadModalShown = action.payload;
    },
    showProfileModal: (state, action) => {
      state.profileModalShown = action.payload;
    },
    showDrawer: (state, action) => {
      state.drawerShown = action.payload;
    },
  },
});

export const {showUploadModal, showDrawer, showProfileModal} =
  generalSlice.actions;
export default generalSlice.reducer;
