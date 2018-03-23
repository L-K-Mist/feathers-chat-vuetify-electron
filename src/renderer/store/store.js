import Vue from 'vue'
import Vuex from 'vuex'
import feathers from '@/api/feathers-client'

import HardwareController from './modules/HardwareController'
import SerialConnection from './modules/SerialConnection'
import userGuide from './modules/userGuide'
import db from '@/api/pouchDB'

db.remote.info().then(function (info) {
  console.log(info);
})

feathers.service('slider').on('updated', value => {
  //console.log('value is: ', value)
  if (value.id === 1) {
    store.commit('heaterLeftTarget', value.payload);
  } else if (value.id === 2) {
    store.commit('heaterRightTarget', value.payload)
  } else if (value.id === 3) {
    store.commit('heaterReactorTarget', value.payload)
  }
})

feathers.service('switches').on('updated', value => {
  if (value.id === 1) {
    store.commit('fanLeftState', value.payload);
    console.log('switch service on updated: ', value.payload)
  } else if (value.id === 2) {
    store.commit('fanRightState', value.payload);
  }
})
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
    // To just console log our users for now
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
    // TODO add messages actions
    async sendMessage({
      commit,
    }, payload) {
      const sendMessage = await feathers.service('messages').create({
        text: payload
      });
    }
  },
  modules: {
    userGuide,
    HardwareController,
    SerialConnection
  }
})