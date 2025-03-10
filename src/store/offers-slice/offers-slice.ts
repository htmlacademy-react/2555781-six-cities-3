import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeOffer } from '../../types/offers';

type OffersState = {
  offers: TypeOffer[];
  listOffers: TypeOffer[];
  isOffersDataLoading: boolean;
  redirectToRoute: string;
};

const initialState: OffersState = {
  offers: [],
  listOffers: [],
  isOffersDataLoading: false,
  redirectToRoute: '',
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<TypeOffer[]>) => {
      state.offers = action.payload;
    },
    offersAction: (state, action: PayloadAction<TypeOffer[]>) => {
      state.listOffers = action.payload;
    },
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
    redirectToRoute: (state, action: PayloadAction<string>) => {
      state.redirectToRoute = action.payload;
    },
  },
});

export const { loadOffers, offersAction, setOffersDataLoadingStatus,redirectToRoute } = offersSlice.actions;
export default offersSlice.reducer;
