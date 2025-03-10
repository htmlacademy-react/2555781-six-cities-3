import { combineReducers } from '@reduxjs/toolkit';
import offersReducer from './offers-slice/offers-slice';
import cityReducer from './city-slice/city-slice';
import authReducer from './auth-slice/auth-slice';
import errorReducer from './error-slice/error-slice';
import userReduser from './user-slice/user-slice';

const rootReducer = combineReducers({
  offers: offersReducer,
  city: cityReducer,
  auth: authReducer,
  error: errorReducer,
  user: userReduser,
});

export default rootReducer;
