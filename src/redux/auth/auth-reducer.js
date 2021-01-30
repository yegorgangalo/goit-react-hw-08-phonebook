// import { createSlice } from '@reduxjs/toolkit';
import { combineReducers, createReducer } from '@reduxjs/toolkit';
import authOperations from './auth-operations';
const { register, logIn, logOut, fetchCurrentUser } = authOperations;

const initialUserState = { name: null, email: null };
  // token: null,
  // isLoggedIn: false,
  // error: null,

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
  // [fetchCurrentUser.fulfilled]: (_, {payload}) =>,
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
        return `Error ${status}. Can't ${config.method} by ${request.responseURL}. ${statusText}`;
    }
    return 'Error. No connection with Server';
};
const resetError = () => null;

const reducerErrorObj = Object.values(authOperations)
    .reduce((accObj, operation) => {
        return ({ ...accObj, [operation.rejected]: setError, [operation.pending]: resetError });
    }, {});

const error = createReducer(null, reducerErrorObj);
/* ---------------------------------------------------- */

export default combineReducers({
  user,
  token,
  isLoggedIn,
  loading,
  error,
});

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   extraReducers: {
//     [authOperations.register.fulfilled](state, action) {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isLoggedIn = true;
//     },
//     [authOperations.logIn.fulfilled](state, action) {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isLoggedIn = true;
//     },
//     [authOperations.logOut.fulfilled](state, action) {
//       state.user = { name: null, email: null };
//       state.token = null;
//       state.isLoggedIn = false;
//     },
//     [authOperations.fetchCurrentUser.fulfilled](state, action) {
//       state.user = action.payload;
//       state.isLoggedIn = true;
//     },
//   },
// });

// export default authSlice.reducer;