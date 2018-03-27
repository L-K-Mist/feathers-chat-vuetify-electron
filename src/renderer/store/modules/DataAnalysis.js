import db from '@/api/pouchDB'
import moment from "moment";


/***
 allDocs({ startkey: 'album_bowie_', endkey: 'album_bowie_\uffff' });
 * 
 */


const state = {
    timestamp_Labels: null,
    actualTemps_Reactor: null,
    targetTemps_Reactor: null,
    startDate: "",
    endkey: null, // there's no startkey needed, because that is the same as start-date. It's endkey that needs the extra "\uffff" tacked on to the end
    endDate: ""
};

const getters = {
    historyState: state => {
        return state;
    },
};

const mutations = {
    newStartDate: (state, payload) => {
        state.startDate = payload;
        console.log('mutated', state.startDate);

    },
    newEndDate: (state, payload) => {
        state.endDate = payload;
        console.log('mutated', state.endDate);
        var _endkey = state.endDate + "\uffff"
        //console.log(_endkey);
        //console.log('26-03-2018\uffff');
        state.endkey = _endkey
    },
};

const actions = {
    // Dialogue actions
    fetchData: ({
        commit,
        rootState, // This is how you can access the state from other modules. Not totally necessary here as I'm aiming for a local state object, but sticking with it, because I wish I knew this earlier. see: https://forum.vuejs.org/t/get-state-from-another-module-does-any-one-have-the-same-problem/4380/3
    }, payload) => {
        var _timestamp_Labels = []; // For the graph axis
        var _actualTemps_Reactor = [];
        var _targetTemps_Reactor = [];
        console.log(rootState.DataAnalysis.startDate);
        console.log(rootState.DataAnalysis.endkey);
        db.allDocs({
            include_docs: true,
            // startkey: rootState.startDate,
            // endkey: rootState.endkey,

            startkey: rootState.DataAnalysis.startDate,
            endkey: rootState.DataAnalysis.endkey
        }).then(function (result) {
            console.log(result);
            result.rows.forEach(function (row) { // Actual temps history
                _actualTemps_Reactor.push(row.doc.heaterReactor.actualTemp)
            })
            //console.log("actualTemps_Reactor", actualTemps_Reactor);

            result.rows.forEach(function (row) { // Target temps history
                _targetTemps_Reactor.push(row.doc.heaterReactor.targetTemp)
            })
            //console.log("targetTemps_Reactor", targetTemps_Reactor);

            result.rows.forEach(function (row) { // timestamps for above histories
                _timestamp_Labels.push(row.doc._id)
            })
            //console.log("timestamp_Labels", timestamp_Labels);

        }).catch(function (err) {
            console.log(err);
        });
        //commit('someMutation', payload);
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