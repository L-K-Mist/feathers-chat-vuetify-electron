import db from '@/api/pouchDB'
import feathers from '@/api/feathers-client'

const state = {
  showConnectDialog: false,
  heaterLeft: {
    name: "Left Inlet",
    targetTemp: 0,
    actualTemp: 10,
    fanOn: false
  },
  heaterRight: {
    name: "Right Inlet",
    targetTemp: 0,
    actualTemp: 10,
    fanOn: false
  },
  heaterReactor: {
    name: "Reactor",
    targetTemp: 0,
    actualTemp: 15
  }
}
const getters = {
  showConnectDialog() {
    return state.showConnectDialog
  },
  heaterLeft: state => {
    return state.heaterLeft;
  },
  heaterRight: state => {
    return state.heaterRight;
  },
  heaterReactor: state => {
    return state.heaterReactor
  },
  actualTemps() {
    return {
      leftInlet: state.heaterLeft.actualTemp,
      rightInlet: state.heaterRight.actualTemp,
      reactor: state.heaterReactor.actualTemp
    }
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
  heaterReactorTarget: (state, payload) => {
    state.heaterReactor.targetTemp = payload
  },
  heaterLeftActual: (state, payload) => {
    state.heaterLeft.actualTemp = payload
  },
  heaterRightActual: (state, payload) => {
    state.heaterRight.actualTemp = payload
  },
  heaterReactorActual: (state, payload) => {
    state.heaterReactor.actualTemp = payload
  },

}


const actions = {
  showConnectDialog({
    commit
  }, payload) {
    // do something async
    commit('showConnectDialog', payload)
  },
  async heaterLeftTarget({
    commit
  }, payload) {
    //disables desktop from changing web
    // await feathers.service('slider').update(1, {
    //   payload
    // })
    commit('heaterLeftTarget', payload)
  },
  heaterRightTarget({
    commit
  }, payload) {
    commit('heaterRightTarget', payload)
  },
  heaterReactorTarget({
    commit
  }, payload) {
    commit('heaterReactorTarget', payload)
  },
  populateTemps({ // This action is triggered by ipc not the GUI/Vue
    commit
  }, payload) {
    commit('heaterReactorActual', payload[0])
    commit('heaterLeftActual', payload[1])
    commit('heaterRightActual', payload[2])

    //  //  Switching off for now
    //   let actuals = {
    //     _id: Date.now().toString(),
    //     temps: payload
    //   }
    //   db.put(actuals)
    //   // db.remote.put(actuals)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}