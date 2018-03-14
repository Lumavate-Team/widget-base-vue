export const state = () => ({
  instanceData: null
})

export const mutations = {
  SET_INSTANCE_DATA (state, instanceData) {
    state.instanceData = instanceData
  }
}

export const actions = {
  async loadInstanceData ({ commit, rootState }) {
    const res = await this.$axios.get(
      `${rootState.baseUrl}${rootState.widgetPath}/instances/${rootState.instanceId}/data`)

    if (res.data) {
      commit('SET_INSTANCE_DATA', res.data)
    }
  }
}
