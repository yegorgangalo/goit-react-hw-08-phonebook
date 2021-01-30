import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from 'redux/auth';
import s from './UserMenu.module.css';
// import defaultAvatar from './default-avatar.png';

export default function UserMenu() {
    const name = useSelector(authSelectors.getUsername);
    const dispatch = useDispatch();
    const onLogOut = () => dispatch(authOperations.logOut());
//   const avatar = defaultAvatar;

  return (
    <div className={s.container}>
      {/* <img src={avatar} alt="" width="32" className={s.avatar} /> */}
      <span className={s.name}>Welcome, {name}</span>
      <button type="button" onClick={onLogOut}>
        Выйти
      </button>
    </div>
  );
}