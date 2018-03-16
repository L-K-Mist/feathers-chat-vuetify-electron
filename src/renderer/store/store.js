import Vue from 'vue'
import Vuex from 'vuex'

import HardwareController from './modules/HardwareController'
import SerialConnection from './modules/SerialConnection'

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