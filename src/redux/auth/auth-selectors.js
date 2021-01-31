const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUsername = state => state.auth.user.name;
const getNotRefreshed = state => state.auth.notRefreshed;
const getError = state => state.auth.error;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getNotRefreshed,
  getError,
};
export default authSelectors;