// import { createSlice } from '@reduxjs/toolkit';
import { combineReducers, createReducer } from '@reduxjs/toolkit';
import authOperations from './auth-operations';
const { register, logIn, logOut, fetchCurrentUser } = authOperations;

const initialUserState = { name: null, email: null };

/* ---------------USER_REDUCER---------------------- */
const user = createReducer(initialUserState, {
  [register.fulfilled]: (_, {payload}) => payload.user,
  [logIn.fulfilled]: (_, {payload}) =>payload.user,
  [logOut.fulfilled]: () =>initialUserState,
  [fetchCurrentUser.fulfilled]: (_, {payload}) =>payload,
});

/* ---------------TOKEN_REDUCER---------------------- */
const token = createReducer(null, {
  [register.fulfilled]: (_, {payload}) => payload.token,
  [logIn.fulfilled]: (_, {payload}) =>payload.token,
  [logOut.fulfilled]: () => null,
});

/* ---------------ISLOGGEDIN_REDUCER---------------------- */
const toggleIsLoggedIn = (state) => !state;

const reducerIsLoggedInObj = Object.values(authOperations)
    .reduce((accObj, operation) =>
      ({ ...accObj, [operation.fulfilled]: toggleIsLoggedIn }), {});

const isLoggedIn = createReducer(false, reducerIsLoggedInObj);

/* ---------------LOAD_REDUCER---------------------- */
const toggleLoading = (state) => !state;

const reducerLoadingObj = Object.values(authOperations)
    .reduce((accObj, operation) =>
        ({ ...accObj, [operation.fulfilled]: toggleLoading, [operation.rejected]: toggleLoading, [operation.pending]: toggleLoading }), {});

const loading = createReducer(false, reducerLoadingObj);

/* ---------------ERROR_REDUCER---------------------- */
const setError = (_, { payload }) => {
    if (payload) {
        const { status, config, request, statusText } = payload;
        return `Error ${status}. Can't ${config?.method} by ${request?.responseURL}. ${statusText}`;
    }
  if (!payload) {
    return false;
  }
  return 'Error. No connection with Server';
};
const resetError = () => null;

const reducerErrorObj = Object.values(authOperations)
    .reduce((accObj, operation) => {
        return ({ ...accObj, [operation.rejected]: setError, [operation.pending]: resetError });
    }, {});

const error = createReducer(null, reducerErrorObj);

/* ---------------REFRESH_REDUCER---------------------- */
const toggleRefresh = (state) => !state;

const reducerRefreshObj = Object.values(authOperations.fetchCurrentUser)
  .reduce((accObj, operation) => {
        return typeof operation==='function' ? ({ ...accObj, [operation]: toggleRefresh}) : accObj;
  }, {});

const notRefreshed = createReducer(true, reducerRefreshObj);

/* ---------------------------------------------------- */
export default combineReducers({
  user,
  token,
  isLoggedIn,
  loading,
  error,
  notRefreshed,
});