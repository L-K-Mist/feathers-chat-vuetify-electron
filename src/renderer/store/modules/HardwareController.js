const state = {
  showConnectDialog: false,
  heaterLeft: {
    name: "Left Inlet",
    targetTemp: 0,
    actualTemp: 25
  },
  heaterRight: {
    name: "Right Inlet",
    targetTemp: 0,
    actualTemp: 25
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
}

const mutations = {
  showConnectDialog(state, payload) {
    state.showConnectDialog = payload
  },
  // Explicitly sets the state of isAuthenticated to true or false
  heaterLeftTarget: (state, payload) => {
    state.heaterLeft.targetTemp = payload
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
  }

}

export default {
  state,
  getters,
  mutations,
  actions,

}