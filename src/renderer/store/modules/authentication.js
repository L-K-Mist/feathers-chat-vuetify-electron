import feathers from '@/api/feathers-client'

const state = {
  user: null,
  isAuthenticated: false,
  isConnecting: false,
  users: null,
  messages: null,
  hasMoreMessages: false,
  sliderOne: 0,
};

const getters = {
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
};

const mutations = {
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

};

const actions = {
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
};

export default {
  state,
  mutations,
  actions,
  getters
}