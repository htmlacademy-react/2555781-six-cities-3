import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { TypeOffer } from '../../types/offers';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppScreenProps = {
  offersNearby: TypeOffer[];
};

function App({ offersNearby }: AppScreenProps) {
  const offers = useAppSelector((state) => state.offers.offers);
  const authorizationStatus = useAppSelector((state) => state.auth.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.offers.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout authorizationStatus={authorizationStatus} />}>
            <Route index element={<MainScreen offers={offers} />} />
            <Route path={AppRoute.Login} element={<LoginScreen />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesScreen offers={offers} />
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Offer} element={<OfferScreen offersNearby={offersNearby} offers={offers} />} />
          </Route>
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
