export const state = () => ({
  debug: 0
})

export const mutations = {
  increment (state) {
    state.debug++
  }
}
