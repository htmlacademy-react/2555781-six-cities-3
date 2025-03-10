import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  userLogin: string;
  userAvatar: string;
};

const initialState: UserState = {
  userLogin: '',
  userAvatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<string>) => {
      state.userLogin = action.payload;
    },
    setUserAvatar: (state, action: PayloadAction<string>) => {
      state.userAvatar = action.payload;
    },
  },
});

export const { setUserLogin, setUserAvatar } = userSlice.actions;
export default userSlice.reducer;
