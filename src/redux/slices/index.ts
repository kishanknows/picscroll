import {combineReducers} from '@reduxjs/toolkit';

import authReducer from './auth-slice';
import imageReducer from './image-slice';
import generalReducer from './general-slice';

const rootReducer = combineReducers({
  userConfig: authReducer,
  selectedImg: imageReducer,
  general: generalReducer,
});

export default rootReducer;
