import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
  providerId: null,
  photoURL: null,
  phoneNumber: null,
  displayName: null,
  uid: null,
};

const authSlice = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.phoneNumber = action.payload.phoneNumber;
      state.photoURL = action.payload.photoURL;
      state.providerId = action.payload.providerId;
      state.uid = action.payload.uid;
    },
    unsetUser: state => {
      state.email = null;
      state.displayName = null;
      state.phoneNumber = null;
      state.photoURL = null;
      state.providerId = null;
      state.uid = null;
    },
  },
});
export const {setUser, unsetUser} = authSlice.actions;
export default authSlice.reducer;
