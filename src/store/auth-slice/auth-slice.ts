import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
};

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const { requireAuthorization } = authSlice.actions;
export default authSlice.reducer;
