import { Helmet } from 'react-helmet-async';
import { TypeOffer } from '../../types/offers';
import OffersList from '../../components/offers-list/offers-list';
import { useCallback, useEffect, useState } from 'react';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { CITIES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterOffersByCity, sortOffers } from '../../utils/utils';
import { TypeCity } from '../../types/offers';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import { SortType } from '../../const';
import { offersAction } from '../../store/offers-slice/offers-slice';
import { cityAction } from '../../store/city-slice/city-slice';

type MainScreenProps = {
  offers: TypeOffer[];
};

function MainScreen({ offers }: MainScreenProps): JSX.Element {

  const [selectedSort, setSelectedSort] = useState<string>(SortType.POPULAR);
  const [selectedCard, setSelectedCard] = useState<TypeOffer | undefined>(undefined);
  const [selectedCity, setSelectedCity] = useState<TypeCity>(CITIES[0]);


  const dispatch = useAppDispatch();
  const listOffers = useAppSelector((state) => state.offers.listOffers);

  useEffect(() => {
    const filteredOffers: TypeOffer[] = filterOffersByCity(offers, selectedCity.name);
    const sortedOffers: TypeOffer[] = sortOffers(selectedSort, filteredOffers);
    dispatch(offersAction(sortedOffers));
  }, [selectedCity, offers, dispatch, selectedCity.name, selectedSort]);

  const handleMouseOver = useCallback((id: string) => {
    setSelectedCard(offers.find((offer) => offer.id === id));
  }, [offers]);

  const handleMouseLeave = useCallback(() => {
    setSelectedCard(undefined);
  }, []);

  const handleCityChange = (cityName: string) => {
    const newSelectesCity = CITIES.find((newCity) => newCity.name === cityName);
    if (newSelectesCity) {
      setSelectedCity(newSelectesCity);
      dispatch(cityAction(cityName));
      setSelectedSort(SortType.POPULAR);
    }
  };

  const handleClickSort = useCallback((sort: string) => {
    setSelectedSort(sort);
  }, []);

  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesList selectedCity={selectedCity.name} handleCityChange={handleCityChange} />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {listOffers.length} places to stay in {selectedCity.name}
            </b>
            <PlacesSorting sort={handleClickSort} selectedSort={selectedSort} />
            <OffersList
              offers={listOffers}
              cardClassName="cities"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            />
          </section>
          <div className="cities__right-section">
            <Map selectedCard={selectedCard} offers={listOffers} city={selectedCity} className='cities' />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
