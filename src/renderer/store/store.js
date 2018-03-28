import Vue from 'vue'
import Vuex from 'vuex'
import feathers from '@/api/feathers-client'

import HardwareController from './modules/HardwareController'
import SerialConnection from './modules/SerialConnection'
import userGuide from './modules/userGuide'
import ExecutiveOverride from './modules/ExecutiveOverride'
import DataAnalysis from './modules/DataAnalysis'
import db from '@/api/pouchDB'

// import ipcRenderer from 'electron'
const {
  ipcRenderer
} = require('electron')

db.remote.info().then(function (info) {
  console.log(info);
})

feathers.service('messages').on('created', value => {
  store.dispatch('pushHumanMessage', value.text)
})

feathers.service('slider').on('updated', value => {
  if (value.id === 1) {
    store.commit('heaterLeftTarget', value.payload);
  } else if (value.id === 2) {
    store.commit('heaterRightTarget', value.payload)
  } else if (value.id === 3) {
    store.commit('heaterReactorTarget', value.payload)
  } else if (value.id === 4) {
    store.commit('blowerSpeed', value.payload)
  }
})

feathers.service('switches').on('updated', value => {
  if (value.id === 1) {
    store.commit('fanLeftState', value.payload);
  } else if (value.id === 2) {
    store.commit('fanRightState', value.payload);
  }
})

ipcRenderer.on('got-port-confirmed', (event, arg) => {
  console.log("connection confirmed ", arg)
  store.dispatch('showConnectDialog', false)
})

ipcRenderer.on('handshakeComplete', (event, arg) => {
  store.dispatch("handshakeComplete", true)
  setInterval(function () {
    ipcRenderer.send('give-me-temps') // Every 3 seconds ask Main process to ask arduino for temps
  }, 3000); // 
  store.dispatch('timedStateSnapshot') // Trigger the setInterval based action for 30 second updates of Machine State to DB for future analysis
})

ipcRenderer.on('tempsArrayReady', (event, arg) => {
  store.dispatch('populateTemps', arg)
})

ipcRenderer.on('serialPortError', (event, error) => {
  console.log('Dee we have an SP problem: ', error)
})

ipcRenderer.on('arduinoSays', (event, arg) => {
  store.dispatch('pushArduinoMessage', arg)
  console.log('Arduino says: ', arg)
})

// Keeping Authentication here front and center. The rest in modules
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    isConnecting: false,
    users: null,
    messages: null,
    hasMoreMessages: false,
    sliderOne: 0,
    //skip = 0,
  },
  getters: {
    user: state => {
      return state.user;
      console.log('Get User: ', state.user)
    },
    users: state => {
      return state.users;
      console.log('Get User: ', state.users)
    },
    messages: state => {
      return state.messages
    },
    isAuthenticated: state => {
      return state.isAuthenticated
    }
    //getDialogueBool: state => state.dialogue,
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    },
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload
      console.log('setIsAuthenticated', state.isAuthenticated)
    },
    setMessages: (state, payload) => {
      state.messages = payload
    },
    setUsers: (state, payload) => {
      state.users = payload
    }

  },
  actions: {
    // 
    async signUp({
      commit
    }, payload) {
      try {
        const newUser = await feathers.service('users').create(payload)
        const authNewUser = await feathers.authenticate({
          strategy: 'local',
          email: payload.email,
          password: payload.password
        })
        const verifyNewUser = await feathers.passport.verifyJWT(authNewUser.accessToken)
        //const fetchUserId = await feathers.service('users').get(verifyNewUser.id)
        console.log('New User: ', newUser)
        commit('setUser', newUser);

      } catch (error) {
        console.log(error)
      }
    },
    async signInManually({
      commit
    }, payload) {
      try {
        const authExistingUser = await feathers.authenticate({
          strategy: 'local',
          email: payload.email,
          password: payload.password
        })
        const verifyExistingUser = await feathers.passport.verifyJWT(authExistingUser.accessToken)
        const fetchUser = await feathers.service('users').get(verifyExistingUser.userId)
        console.log('verifyExistingUser: ', fetchUser)
        commit('setUser', fetchUser);
        commit('setIsAuthenticated', true)
      } catch (error) {
        console.log(error)
      }
    },
    async signInAuto({
      commit,
      actions
    }) {
      try {
        const authExistingUser = await feathers.authenticate()
        const verifyExistingUser = await feathers.passport.verifyJWT(authExistingUser.accessToken)
        const fetchUser = await feathers.service('users').get(verifyExistingUser.userId)
        console.log('verifyExistingUser: ', verifyExistingUser.userId)
        console.log('signInAuto user: ', fetchUser)
        commit('setUser', fetchUser)
        commit('setIsAuthenticated', true)
      } catch (error) {
        console.log(error)
        commit('showLoginGuide', true)

      }
    },
    async logOut({
      commit
    }) {
      try {
        const logout = await feathers.logout()
        console.log('logout ', logout)
        commit('setUser', null)
        commit('setIsAuthenticated', false)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchMessages({
      commit
    }) {
      //	Find	the	latest	25	messages.	They	will	come	with	the	newest	first
      //	which	is	why	we	have	to	reverse	before	adding	them
      const messages = await feathers.service('messages').find({
        query: {
          $sort: {
            createdAt: -1
          },
          $limit: 25
        }
      });
      //	We	want	to	show	the	newest	message	last
      const orderedMessages = messages.data.reverse()
      commit('setMessages', orderedMessages)
      console.log('orderedMessages', orderedMessages)

    },
    async fetchUsers({
      commit
    }) {
      //	Find	the	10	newest user accounts
      const users = await feathers.service('users').find({
        query: {
          $limit: 25,
          $sort: {
            name: -1
          },
        }
      });
      commit('setUsers', users.data)
      console.log('setUsers', users.data)
      // TODO: play with this sorting so that able to clean users of all but 1st created user: ie. Yourself
    },
    cleanUsers({
      commit
    }) {
      feathers.service('users').remove(null, { // DANGEROUS ACTION: Deletes users from db
        query: {
          $limit: 50,
          $sort: {
            createdAt: -1
          },
          name: { // want to delete all users except myself
            $nin: ['dylan']
          }
        }
      })
    },
    async sendMessage({
      commit,
    }, payload) {
      const sendMessage = await feathers.service('messages').create({
        text: payload
      });
    },
    pushArduinoMessage({
      commit,
      dispatch,
      state
    }, payload) {
      console.log(payload);
      let _messageObj = {
        text: payload,
        user: {
          name: "Arduino"
        }
      }
      state.messages.push(_messageObj)
      dispatch('sendMessage', _messageObj.text)

    },
    pushHumanMessage({
      commit,
      state
    }, payload) {

      let _messageObj = {
        text: payload,
        user: state.user
      }
      state.messages.push(_messageObj)
    }
  },
  modules: {
    // Place to add modularized store items
    userGuide,
    HardwareController,
    ExecutiveOverride,
    SerialConnection,
    DataAnalysis
  }
})