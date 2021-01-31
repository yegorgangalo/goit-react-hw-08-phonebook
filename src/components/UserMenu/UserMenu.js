import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from 'redux/auth';
import s from './UserMenu.module.css';
import { IoLogOut } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';
import IconButton from 'components/IconButton';
// import defaultAvatar from './default-avatar.png';

export default function UserMenu() {
    const name = useSelector(authSelectors.getUsername);
    const dispatch = useDispatch();
    const onLogOut = () => dispatch(authOperations.logOut());
//   const avatar = defaultAvatar;

  return (
    <div className={s.container}>
      <VscAccount className={s.avatar}/>
      {/* <img src={avatar} alt="" width="32" className={s.avatar} /> */}
      <span className={s.name}>{name}</span>
      <IconButton onClick={onLogOut} classNames={s.logOutBtn} aria-label="log out">
        <IoLogOut/>
      </IconButton>
    </div>
  );
}