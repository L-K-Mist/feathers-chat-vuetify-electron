import db from '@/api/pouchDB'
import feathers from '@/api/feathers-client'
import moment from "moment";
import boolArrayCompression from '@/helpers/boolArrayCompression';

const {
  ipcRenderer
} = require('electron')

const state = {
  showConnectDialog: false,
  heaterLeft: {
    name: "Left Inlet",
    targetTemp: 60,
    actualTemp: 25,
    fanOn: false
  },
  heaterRight: {
    name: "Right Inlet",
    targetTemp: 60,
    actualTemp: 25,
    fanOn: false
  },
  heaterReactor: {
    name: "Reactor",
    targetTemp: 150,
    actualTemp: 15,
    blowerSpeed: 50,
    blowerFlash: {
      on: 5000,
      off: 5000
    }
  },
  condensorOne: {
    name: "Condensor One",
    targetTemp: 60,
    actualTemp: 25,
    preFanOn: false,
    fanOn: false
  },
  condensorTwo: {
    name: "Condensor Two",
    targetTemp: 60,
    actualTemp: 25,
    fanOn: false
  },
  rawActualTemps: [],
  rawTargetTemps: [], // TODO flesh out below
  rawSwitchStates: [] // TODO flesh out below
};


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
  actualTemps(state) {
    return {
      leftInlet: state.heaterLeft.actualTemp,
      rightInlet: state.heaterRight.actualTemp,
      reactor: state.heaterReactor.actualTemp,
      condensorOne: state.condensorOne.actualTemp,
      condensorTwo: state.condensorTwo.actualTemp
    }
  },
  blowerSpeed(state) {
    return state.heaterReactor.blowerSpeed
  },
  rawActualTemps: state => {
    return state.rawActualTemps
  },
  rawTargetTemps: state => {
    return [
      state.heaterLeft.targetTemp,
      state.heaterRight.targetTemp,
      state.heaterReactor.targetTemp
    ]
  },
  rawSwitchStates: state => { // This translates machine-wide on/off (ie. non-flasher) states to a boolean array for further crunching into a single integer between 0 and 255
    return state.rawSwitchStates
  },
  condensorOne: state => { // Attempt to simplify the getter (sometimes vuejs Reactivity doesn't like this way)
    return state.condensorOne;
  },
  condensorTwo: state => {
    return state.condensorTwo;
  },
}

const mutations = {
  showConnectDialog(state, payload) {
    state.showConnectDialog = payload
  },
  rawSwitchStates(state) {
    state.rawSwitchStates = [ // The hard-coded zeros are placeholders for future on/of switches <-- arduino firmware is ready for these placeholders to be executed
      state.heaterLeft.fanOn, // arduino pin 53
      state.heaterRight.fanOn, // arduino pin 51
      state.condensorOne.fanOn, // arduino pin 49
      0, // arduino pin 47 // Attention: Leave out it is not attached to diy breakout board.
      state.condensorTwo.fanOn, // arduino pin 45
      0, // arduino pin 43 // ATTENTION: Keep it like that <-- using it as spare GND 
      state.condensorOne.preFanOn, // arduino pin 41    
      0, // arduino pin 14 
    ] // 
  },
  rawActualTemps(state, payload) {
    state.rawActualTemps = payload
    //console.log('mutation ', state.rawActualTemps)
  },

  // Heater Left of Waste Inlet
  //=====================================
  heaterLeftTarget: (state, payload) => {
    state.heaterLeft.targetTemp = payload
  },
  heaterLeftActual: (state, payload) => {
    state.heaterLeft.actualTemp = payload
  },
  fanLeftState: (state, payload) => {
    state.heaterLeft.fanOn = payload
    //console.log('fan left mutation: ', payload)
  },

  // Heater Right of Waste Inlet
  //======================================
  heaterRightTarget: (state, payload) => {
    state.heaterRight.targetTemp = payload
  },
  heaterRightActual: (state, payload) => {
    state.heaterRight.actualTemp = payload
  },
  fanRightState: (state, payload) => {
    state.heaterRight.fanOn = payload
  },


  // Reactor
  //========================================
  heaterReactorTarget: (state, payload) => {
    state.heaterReactor.targetTemp = payload
  },
  heaterReactorActual: (state, payload) => {
    state.heaterReactor.actualTemp = payload
  },
  blowerSpeed: (state, payload) => {
    state.heaterReactor.blowerSpeed = payload
  },

  // Condensors
  //=======================================

  condensorOneTarget: (state, payload) => {
    state.condensorOne.targetTemp = payload
  },
  condensorTwoTarget: (state, payload) => {
    state.condensorTwo.targetTemp = payload
  },
  condensorOneActual: (state, payload) => {
    state.condensorOne.actualTemp = payload
  },
  condensorTwoActual: (state, payload) => {
    state.condensorTwo.actualTemp = payload
  },
  condensorOneFanOn: (state, payload) => {
    state.condensorOne.fanOn = payload
  },
  condensorTwoFanOn: (state, payload) => {
    state.condensorTwo.fanOn = payload
  },
  condensorPreFanOn: (state, payload) => {
    state.condensorOne.preFanOn = payload
  },
}

const actions = {


  // General Or Combined Actions
  //=====================================
  showConnectDialog({
    commit
  }, payload) {
    commit('showConnectDialog', payload)
  },

  populateTemps({ // This action is triggered by ipc not the GUI/Vue
    commit
  }, payload) {
    commit('heaterReactorActual', payload[0])
    commit('heaterLeftActual', payload[1])
    commit('heaterRightActual', payload[2])
    commit('rawActualTemps', payload)
  },

  timedStateSnapshot({ // Only start the updating process when this action is triggered (by the serial connection event)
    state
  }) {
    setInterval(() => { // Once every 30 seconds save system state for future analysis
      let now = moment().format("DD-MM-YYYY hh:mm:ss").toString()
      let actuals = { // actuals is: The object to save in each document. The unique id is the timestamp and the rest is the machine state at that moment
        _id: now,
        ...state
      }
      console.log(actuals);
      db.put(actuals)
      // db.remote.put(actuals)
    }, 30 * 1000);
  },
  binarySwitches({ // prepares the signal for ipc to send to arduino
    commit,
    state
  }) {
    var _binInt = boolArrayCompression(state.rawSwitchStates)
    let _arduinoSignal = `A${_binInt}` // Prefix signal with A so arduino will know it's a compressed boolean array.
    ipcRenderer.send('signalArduino', _arduinoSignal) // If I was aiming DRY I could put this line into mutation called ipcArduino and call that mutation with different payloads. Not sure that's right though
  },

  // Heater Left of Waste Inlet
  //=====================================
  async heaterLeftTarget({
    commit
  }, payload) {
    commit('heaterLeftTarget', payload)
    await feathers.service('slider').update(1, {
      payload
    })
  },
  async fanLeftState({
    commit,
    dispatch
  }, payload) {
    await commit('fanLeftState', payload)
    await commit('rawSwitchStates')
    dispatch('binarySwitches')
    let response = await feathers.service('switches').update(1, {
      payload
    })
    //console.log('action response ', response)
  },


  // Heater Right of Waste Inlet
  //======================================
  async heaterRightTarget({
    commit
  }, payload) {
    commit('heaterRightTarget', payload)
    await feathers.service('slider').update(2, {
      payload
    })
  },
  async fanRightState({
    commit,
    dispatch
  }, payload) {
    await commit('fanRightState', payload)
    await commit('rawSwitchStates')
    dispatch('binarySwitches')
    await feathers.service('switches').update(2, {
      payload
    })
  },


  // Reactor
  //========================================
  async heaterReactorTarget({
    commit
  }, payload) {
    commit('heaterReactorTarget', payload)
    await feathers.service('slider').update(3, {
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
  flashrateFurnaceBlower({ // prepares the signal for ipc to send to arduino
    commit
  }, payload) {
    let _arduinoSignal = `R33,${payload.onTime},${payload.offTime}` // this should come out as for example "R33,5000,5000" if slider was at 50%
    // console.log(_arduinoSignal); // Yes, seems to be working
    ipcRenderer.send('signalArduino', _arduinoSignal)
  },


  // Condensors
  //=====================================
  async condensorOneTarget({
    commit
  }, payload) {
    commit('condensorOneTarget', payload)
    await feathers.service('slider').update(5, { // TODO populate service events for condensor updates
      payload
    })
  },
  async condensorTwoTarget({
    commit
  }, payload) {
    commit('condensorTwoTarget', payload)
    await feathers.service('slider').update(6, {
      payload
    })
  },
  async condensorOneFanOn({
    commit,
    dispatch
  }, payload) {
    await commit('condensorOneFanOn', payload)
    await commit('rawSwitchStates')
    dispatch('binarySwitches')
    let response = await feathers.service('switches').update(1, {
      payload
    })
    //console.log('action response ', response)
  },

  async condensorTwoFanOn({
    commit,
    dispatch
  }, payload) {
    await commit('condensorTwoFanOn', payload)
    await commit('rawSwitchStates')
    dispatch('binarySwitches')
    await feathers.service('switches').update(2, {
      payload
    })
  },
  async condensorPreFanOn({
    commit,
    dispatch
  }, payload) {
    await commit('condensorPreFanOn', payload)
    await commit('rawSwitchStates')
    dispatch('binarySwitches')
    await feathers.service('switches').update(2, { // Also here gotta tie up all the feathers bits for all condensor actions
      payload
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}