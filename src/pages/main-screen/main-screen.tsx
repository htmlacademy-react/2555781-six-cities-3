import { Helmet } from 'react-helmet-async';
import { TypeOffer } from '../../types/offers';
import OffersList from '../../components/offers-list/offers-list';
import { useState } from 'react';
import Map from '../../components/map/map';

type MainScreenProps = {
  offersCount: number;
  offers: TypeOffer[];
};

const city = {
  'name': 'Amsterdam',
  'location': {
    'latitude': 52.37454,
    'longitude': 4.897976,
    'zoom': 13
  }
}

function MainScreen({ offersCount, offers }: MainScreenProps): JSX.Element {
  const [card, setCard] = useState('');

  const handleMouseOver = (id: string) => {
    setCard(id);
  };

  const handleMouseLeave = () => {
    setCard('');
  };

  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {offersCount} places to stay in Amsterdam
            </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li
                  className="places__option places__option--active"
                  tabIndex={0}
                >
                  Popular
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                  Top rated first
                </li>
              </ul>
            </form>
            <OffersList
              offers={offers}
              cardClassName="cities"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            />
          </section>
          <div className="cities__right-section">
            <Map card={card} offers={offers} city={city}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
