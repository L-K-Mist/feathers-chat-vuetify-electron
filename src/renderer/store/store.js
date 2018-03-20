import Vue from 'vue'
import Vuex from 'vuex'

import HardwareController from './modules/HardwareController'
import SerialConnection from './modules/SerialConnection'
import db from '@/api/pouchDB'

db.remote.info().then(function (info) {
  console.log(info);
})

// var doc = {
//   "_id": "mittens2",
//   "name": "Mittens",
//   "occupation": "kitten",
//   "age": 3,
//   "hobbies": [
//     "playing with balls of yarn",
//     "chasing laser pointers",
//     "lookin' hella cute"
//   ]
// };

// db.put(doc);
db.get('mittens2').then(function (mit2) {
  console.log(mit2);
});


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