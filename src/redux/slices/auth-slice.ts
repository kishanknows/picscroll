import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
  photoURL: null,
  phoneNumber: null,
  displayName: null,
  uid: null,
  emailVerified: null,
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
      state.uid = action.payload.uid;
      state.emailVerified = action.payload.emailVerified;
    },
    unsetUser: state => {
      state.email = null;
      state.displayName = null;
      state.phoneNumber = null;
      state.photoURL = null;
      state.uid = null;
      state.emailVerified = null;
    },
  },
});
export const {setUser, unsetUser} = authSlice.actions;
export default authSlice.reducer;
