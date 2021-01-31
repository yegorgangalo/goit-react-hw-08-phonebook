import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import UserMenu from 'components/UserMenu';
import s from './Navigation.module.css';

export default function Navigation() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <header className={s.header}>
      <nav>
        {isLoggedIn ?
            <NavLink to="/contacts" className={s.link} activeClassName={s.activeLink}>Contacts</NavLink> :
          <>
            <NavLink to="/login" className={s.link} activeClassName={s.activeLink}>Log In</NavLink>
            <NavLink to="/register" className={s.link} activeClassName={s.activeLink}>Register</NavLink>
          </>
        }
      </nav>
      {isLoggedIn && <UserMenu/>}
    </header>
  );
}