// // Possibilities to use later
// "pouch-vue"
// "pouchdb-find"
// "pouchdb-live-find"

import PouchDB from "pouchdb-browser"
PouchDB.plugin(require('pouchdb-find'));

var db = new PouchDB('controller');

db.remote = new PouchDB('https://foranserentaysedisunceal:7cee35e9bbd81f8a031154f6919cc4dd27d43661@168b7c02-9bb1-44ba-aa11-73d03311c8d4-bluemix.cloudant.com/controller_1');

PouchDB.debug.enable('*');
PouchDB.debug.disable()

db.info().then(function (info) {
    console.log(info);
})

var timestamp_Labels = []; // For the graph axis
var actualTemps_Reactor = [];
var targetTemps_Reactor = [];

db.allDocs({
    include_docs: true
}).then(function (result) {
    //console.log(result);
    result.rows.forEach(function (row) { // Actual temps history
        actualTemps_Reactor.push(row.doc.heaterReactor.actualTemp)
    })
    console.log("actualTemps_Reactor", actualTemps_Reactor);

    result.rows.forEach(function (row) { // Target temps history
        targetTemps_Reactor.push(row.doc.heaterReactor.targetTemp)
    })
    console.log("targetTemps_Reactor", targetTemps_Reactor);

    result.rows.forEach(function (row) { // timestamps for above histories
        timestamp_Labels.push(row.doc._id)
    })
    console.log("timestamp_Labels", timestamp_Labels);


}).catch(function (err) {
    console.log(err);
});


export default db