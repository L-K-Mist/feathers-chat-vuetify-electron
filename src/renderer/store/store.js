import Vue from 'vue'
import Vuex from 'vuex'

import HardwareController from './modules/HardwareController'
import SerialConnection from './modules/SerialConnection'
// import ipcRenderer from 'electron'
const {
  ipcRenderer
} = require('electron')

console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "ping" to main console. If I remove the console log it looses the second pong
ipcRenderer.send('asynchronous-message', 'ping')

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
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