import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  fileName: null,
  fileSize: null,
  height: null,
  type: null,
  uri: null,
  width: null,
};

export const imageSlice = createSlice({
  name: 'selectedImg',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.fileName = action.payload.fileName;
      state.fileSize = action.payload.fileSize;
      state.height = action.payload.height;
      state.type = action.payload.type;
      state.uri = action.payload.uri;
      state.width = action.payload.width;
    },
    unsetImage: state => {
      state.fileName = null;
      state.fileSize = null;
      state.height = null;
      state.type = null;
      state.uri = null;
      state.width = null;
    },
  },
});
export const {setImage, unsetImage} = imageSlice.actions;
export default imageSlice.reducer;
