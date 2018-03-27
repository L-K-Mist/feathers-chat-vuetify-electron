import db from '@/api/pouchDB'
import moment from "moment";


const state = {
    timestamp_Labels: null,
    actualTemps_Reactor: null,
    targetTemps_Reactor: null,
    startDate: "",
    endkey: null, // there's no startkey needed here, because that is the same as start-date. It's endkey that needs the extra "\uffff" tacked on to the end
    endDate: ""
};

const getters = {
    historyState: state => {
        return state;
    },
    timestamp_Labels: state => {
        return state.timestamp_Labels;
    },
    actualTemps_Reactor: state => {
        return state.actualTemps_Reactor;
    },
    targetTemps_Reactor: state => {
        return state.targetTemps_Reactor;
    },
};

const mutations = {
    newStartDate: (state, payload) => {
        state.startDate = payload;
        //console.log('mutated', state.startDate);

    },
    newEndDate: (state, payload) => {
        state.endDate = payload;
        //console.log('mutated', state.endDate);
        var _endkey = state.endDate + "\uffff"
        //console.log(_endkey);
        //console.log('26-03-2018\uffff');
        state.endkey = _endkey
    },
    timestamp_Labels: (state, payload) => {
        state.timestamp_Labels = payload;
        // console.log("mutated timestamp_Labels", state.timestamp_Labels);
    },
    actualTemps_Reactor: (state, payload) => {
        state.actualTemps_Reactor = payload;
        // console.log("mutated actualTemps_Reactor", state.actualTemps_Reactor);
    },
    targetTemps_Reactor: (state, payload) => {
        state.targetTemps_Reactor = payload;
        // console.log("mutated targetTemps_Reactor", state.targetTemps_Reactor);
    },
    newDataReady: (state, payload) => {
        console.log('newData Ready mutation triggered');
        state.newDataReady = payload;

    },
};

const actions = {
    // Dialogue actions
    fetchData: ({
        commit,
        rootState, // This is how you can access the state from other modules. Not totally necessary here as I'm aiming for a local state object, but sticking with it, because I wish I knew this earlier. see: https://forum.vuejs.org/t/get-state-from-another-module-does-any-one-have-the-same-problem/4380/3
    }, payload) => {
        // could have skipped these temporary, private variables but needed to test this function bit by bit, isolated from the commits.
        var _timestamp_Labels = []; // For the graph axis
        var _actualTemps_Reactor = [];
        var _targetTemps_Reactor = [];
        // console.log(rootState.DataAnalysis.startDate);
        // console.log(rootState.DataAnalysis.endkey);
        db.allDocs({
            include_docs: true,
            // startkey: rootState.startDate,
            // endkey: rootState.endkey,

            startkey: rootState.DataAnalysis.startDate,
            endkey: rootState.DataAnalysis.endkey
        }).then(function (result) {
            // console.log(result);
            result.rows.forEach(function (row) { // Actual temps history
                _actualTemps_Reactor.push(row.doc.heaterReactor.actualTemp)
            })
            //console.log("actualTemps_Reactor", _actualTemps_Reactor);

            result.rows.forEach(function (row) { // Target temps history
                _targetTemps_Reactor.push(row.doc.heaterReactor.targetTemp)
            })
            //console.log("targetTemps_Reactor", _targetTemps_Reactor);

            result.rows.forEach(function (row) { // timestamps for above histories
                _timestamp_Labels.push(row.doc._id)
            })
            //console.log("timestamp_Labels", _timestamp_Labels);

        }).catch(function (err) {
            console.log(err);
        });
        commit('timestamp_Labels', _timestamp_Labels);
        commit('actualTemps_Reactor', _actualTemps_Reactor);
        commit('targetTemps_Reactor', _targetTemps_Reactor);
        commit('newDataReady', true);
    },
    newStartDate: ({
        commit
    }, payload) => {
        commit("newStartDate", moment(payload).format("DD-MM-YYYY").toString()) // change the format of the date to match the PouchDB index for pagination and sorting
    },
    newEndDate: ({
        commit
    }, payload) => {
        commit("newEndDate", moment(payload).format("DD-MM-YYYY").toString())
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}