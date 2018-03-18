import Vue from 'vue'
import Vuex from 'vuex'

import HardwareController from './modules/HardwareController'
import SerialConnection from './modules/SerialConnection'
// import ipcRenderer from 'electron'
const {
  ipcRenderer
} = require('electron')

ipcRenderer.send('asynchronous-message', 'ping')

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.on('got-port-confirmed', (event, arg) => {
  console.log("connection confirmed ", arg)
  store.dispatch('showConnectDialog', false)
})

ipcRenderer.on('handshakeComplete', (event, arg) => {
  store.dispatch("handshakeComplete", true)
  setInterval(function () {
    //console.log("5 second interval");
    ipcRenderer.send('give-me-temps')
  }, 3000);

})

ipcRenderer.on('tempsArrayReady', (event, arg) => {
  store.dispatch('populateTemps', arg)
})

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {

  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    HardwareController,
    SerialConnection
  }
})