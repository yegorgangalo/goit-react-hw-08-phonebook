import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk(
    'auth/register',
    async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

const logIn = createAsyncThunk('auth/login', async (credentials, {rejectWithValue}) => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const logOut = createAsyncThunk('auth/logout', async ({rejectWithValue}) => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, {rejectWithValue, getState}) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue(false);
    }

    token.set(persistedToken);
    try {
      const {data} = await axios.get('/users/current');
      return data;
    } catch (error) {
      error.response.status===401 && console.log('Unvalid Token. ',error);
      return rejectWithValue(error.response.status === 401 ? false : error.response);
    }
  },
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;