export default {
  // Communicate with Devtools
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user
  },
  SET_ACCESS_TOKEN(state, token) {
    state.googleOAuthToken = token
  }
}
