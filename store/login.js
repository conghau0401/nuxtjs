
export const state = () => {
  return ({
  username: null,
  email: null,
})};


export const mutations = {
  setUser (state, user) {
    if (user) {
      state.username = user.username;
      state.email = user.email;
    } else {
      state.username = null;
      state.email = null;
    }
  }
}
