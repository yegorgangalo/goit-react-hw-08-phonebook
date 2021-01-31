import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com'; //already exists in auth-operations.js

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const {data} = await axios.get('/contacts');
        return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
)

export const addContact = createAsyncThunk(
    'contacts/add',
  async (contact, { rejectWithValue }) => {
    try {
      const {data} = await axios.post('/contacts', contact);
        return data;
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const deleteContact = createAsyncThunk(
    'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${id}`);
        return id;
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const patchContact = createAsyncThunk(
    'contacts/patch',
  async (contact, { rejectWithValue }) => {
    const { id, name, number } = contact;
    try {
      const {data} = await axios.patch(`/contacts/${id}`, {name, number});
        return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
)