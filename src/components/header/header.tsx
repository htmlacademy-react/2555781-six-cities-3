import { useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api.actions';
import { useAppDispatch, useAppSelector } from '../../hooks';

type HeaderProps = {
  authorizationStatus: AuthorizationStatus;
}

function Header(props: HeaderProps): JSX.Element {
  const { authorizationStatus } = props;
  const { pathname } = useLocation();
  const userLogin = useAppSelector((state) => state.user.userLogin);
  const userAvatar = useAppSelector((state) => state.user.userAvatar);
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to='/' className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          {pathname !== AppRoute.Login && authorizationStatus === AuthorizationStatus.Auth && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" style={{
                      backgroundImage: `url(${userAvatar})`,
                      borderRadius: '50%'
                    }}
                    >
                    </div>
                    <span className="header__user-name user__name">
                      {userLogin}
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(logoutAction());
                    }}
                    to='/'
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
          {authorizationStatus === AuthorizationStatus.NoAuth && pathname !== AppRoute.Login && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
