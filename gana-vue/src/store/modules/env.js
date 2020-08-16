export default {
  namespaced: true,
  state: {
    env: '',
    envId: 0
  },
  mutations: {
    updateEnv (state, env) {
      state.env = env
    },
    updateEnvId (state, envId) {
      state.envId = envId
    }
  }
}
