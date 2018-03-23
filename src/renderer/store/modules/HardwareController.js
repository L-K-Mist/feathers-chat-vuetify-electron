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
    actualTemp: 15,
    blowerSpeed: 60
  }
}

const getters = {
  showConnectDialog(state) {
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
  blowerSpeed(state) {
    return state.heaterReactor.blowerSpeed
  }
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
  fanLeftState: (state, payload) => {
    state.heaterLeft.fanOn = payload
    console.log('fan left mutation: ', payload)
  },
  fanRightState: (state, payload) => {
    state.heaterRight.fanOn = payload
  },
  blowerSpeed: (state, payload) => {
    state.heaterReactor.blowerSpeed = payload
  }
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
    commit('heaterLeftTarget', payload)
    await feathers.service('slider').update(1, {
      payload
    })
  },
  async heaterRightTarget({
    commit
  }, payload) {
    commit('heaterRightTarget', payload)
    await feathers.service('slider').update(2, {
      payload
    })
  },
  async heaterReactorTarget({
    commit
  }, payload) {
    commit('heaterReactorTarget', payload)
    await feathers.service('slider').update(3, {
      payload
    })
  },
  async fanLeftState({
    commit
  }, payload) {
    commit('fanLeftState', payload)
    let response = await feathers.service('switches').update(1, {
      payload
    })
    console.log('action response ', response)
  },
  async fanRightState({
    commit
  }, payload) {
    commit('fanRightState', payload)
    await feathers.service('switches').update(2, {
      payload
    })
  },
  async blowerSpeed({
    commit
  }, payload) {
    commit("blowerSpeed", payload)
    await feathers.service('slider').update(4, {
      payload
    })
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
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}