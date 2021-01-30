
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';
import s from './LoginPage.module.css';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') return setEmail(value);
    if (name === 'password') return setPassword(value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authOperations.logIn({ email, password }));
    resetForm();

  };

  return (
    <div>
      <h1>Страница логина</h1>

      <form onSubmit={handleSubmit} className={s.form} autoComplete="on">
        <label className={s.label}>
          Почта
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label className={s.label}>
          Пароль
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}