var SerialPort = require("serialport-builds-electron");

// var portName = store.state.activePortName
// var myPort = new SerialPort(portName, 9600);

// myPort.on('open', () => {
//     console.log('port is open!!')
// })

const state = {
    activePorts: [],
    arduinoPorts: [],
    activePortName: "",
    hasPortName: false
}

const getters = {
    activePorts(state) {
        return state.activePorts
    },
    hasPortName(state) {
        return state.hasPortName
    },
    activePortName(state) {
        return state.activePortName
    }
}
const mutations = {
    setActivePortsApp(state, payload) {
        payload.forEach(function (port) {
            if (port.manufacturer !== undefined) {
                state.activePorts = [] // Otherwise if we click the button several times we get several copies of the same info in the array
                state.activePorts.push(port)
            }
        });
    },
    setActivePortName(state, payload) {
        state.activePortName = payload
    },
    hasPortName(state, payload) {
        state.hasPortName = payload
        console.log("hasPortName is ", state.hasPortName)
    }
}

const actions = {
    getActivePortsPC({
        commit
    }) {
        SerialPort.list(function (err, ports) {
            commit('setActivePortsApp', ports)
        });
    },
    connectSerial({
        commit
    }, payload) {
        console.log('I want to connect')
        // portname = payload
        commit('setActivePortName', payload)
        commit('hasPortName', true)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}