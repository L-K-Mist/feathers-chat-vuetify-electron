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
    endDate: ""
};

const getters = {
    historyState: state => {
        return state;
    },
};

const mutations = {
    // Explicitly sets the state of isAuthenticated to true or false
    newStartDate: (state, payload) => {
        state.startDate = payload;
        console.log('mutated', state.startDate);
    },
    newEndDate: (state, payload) => {
        state.endDate = payload;
        console.log('mutated', state.endDate);
    },
};

const actions = {
    // Dialogue actions
    fetchData: ({
        commit
    }, payload) => {
        var _timestamp_Labels = []; // For the graph axis
        var _actualTemps_Reactor = [];
        var _targetTemps_Reactor = [];

        db.allDocs({
            include_docs: true,
            startkey: '26-03-2018',
            endkey: '26-03-2018\uffff'
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
        commit('someMutation', payload);
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