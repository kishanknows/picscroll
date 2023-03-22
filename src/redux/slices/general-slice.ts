import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  uploadModalShown: false,
  pickerModalShown: false,
  drawerShown: false,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    showUploadModal: (state, action) => {
      state.uploadModalShown = action.payload;
    },
    showPickerModal: (state, action) => {
      state.pickerModalShown = action.payload;
    },
    showDrawer: (state, action) => {
      state.drawerShown = action.payload;
    },
  },
});

export const {showUploadModal, showDrawer, showPickerModal} =
  generalSlice.actions;
export default generalSlice.reducer;
