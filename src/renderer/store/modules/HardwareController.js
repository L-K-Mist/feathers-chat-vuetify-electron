const state = {
  showConnectDialog: false,
  heaterLeft: {
    name: "Left Inlet",
    targetTemp: 0,
    actualTemp: 10
  },
  heaterRight: {
    name: "Right Inlet",
    targetTemp: 0,
    actualTemp: 10
  },
  heaterReactor: {
    name: "Reactor",
    targetTemp: 0,
    actualTemp: 25
  }
}
const getters = {
  showConnectDialog() {
    return state.showConnectDialog
    console.log(state.showConnectDialog)
  },
  heaterLeft: state => {
    return state.heaterLeft;
  },
  heaterRight: state => {
    return state.heaterRight;
  },
}

const mutations = {
  showConnectDialog(state, payload) {
    state.showConnectDialog = payload
  },
  // Explicitly sets the state of isAuthenticated to true or false
  heaterLeftTarget: (state, payload) => {
    state.heaterLeft.targetTemp = payload
  },
  heaterRightTarget: (state, payload) => {
    state.heaterRight.targetTemp = payload
  },
  heaterLeftActual: (state, payload) => {
    state.heaterLeft.actualTemp = payload
  },
  heaterRightActual: (state, payload) => {
    state.heaterRight.actualTemp = payload
  },
}

const actions = {
  showConnectDialog({
    commit
  }, payload) {
    // do something async
    commit('showConnectDialog', payload)
  },
  heaterLeftTarget({
    commit
  }, payload) {
    commit('heaterLeftTarget', payload)
  },
  heaterRightTarget({
    commit
  }, payload) {
    commit('heaterRightTarget', payload)
  },
  heaterLeftActual({
    commit
  }, payload) {
    commit('heaterLeftActual', payload)
  },
  heaterRightActual({
    commit
  }, payload) {
    commit('heaterRightActual', payload)
  },

}

export default {
  state,
  getters,
  mutations,
  actions,

}