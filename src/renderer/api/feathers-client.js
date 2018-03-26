/** Because Feathers has been set up here, I try and implement all the feathers/database functionality here in the main store.
 * All app-state not requiring async actions to the feathers server is placed in seperate vuex modules.
 */


// Include and set up feathers client
import Feathers from '@feathersjs/client'
import auth from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io('http://localhost:3030/', { // TODO review how we got Production working in online chat example
  transports: ['websocket'],
  forceNew: true
})

// TODO Playtime: put pure non-db non-feathers system signals here and see what happens


const feathers = Feathers()
  .configure(socketio(socket))
  .configure(auth({
    storage: window.localStorage
  }))


export default feathers