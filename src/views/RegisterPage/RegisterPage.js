import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';
import IconButton from 'components/IconButton';
import s from './RegisterPage.module.css';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'name') return setName(value);
    if (name === 'email') return setEmail(value);
    if (name === 'password') return setPassword(value);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authOperations.register({ name, email, password }));
    resetForm();
  };

  return (
    <div>
      <h1 className={s.title}>Registration</h1>

      <form onSubmit={handleSubmit} className={s.form} autoComplete="on">
        <label className={s.label}>
          Name
          <input type="text" name="name" value={name} onChange={handleChange} />
        </label>

        <label className={s.label}>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label className={s.label}>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <IconButton type="submit" classNames={s.registerBtn}> Register </IconButton>
        {/* <button type="submit">Register</button> */}
      </form>
    </div>
  );
}