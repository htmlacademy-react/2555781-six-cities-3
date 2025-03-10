import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CityState = {
  city: string;
};

const initialState: CityState = {
  city: '',
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    cityAction: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { cityAction } = citySlice.actions;
export default citySlice.reducer;
