'use strict';


var db = require("../database/DatabaseService"),
    util = require('../utils/Utilities');

exports.get_illnesses = function(req, res) {
    console.log("Getting illnesses");
    util.get_illnesses().then(function(result) {
        let illnesses = result.data._embedded.illnesses;
        res.json(illnesses);
    }, function(err) {
        console.log("Get illnesses error: " + err.err);
        res.send(err);
    });
};

exports.get_hospitals = function(req, res) {
    console.log("Getting hospitals");
    util.get_hospitals().then(function(result) {
        let hospitals = result.data._embedded.hospitals;
        res.json(hospitals);
    }, function(err) {
        console.log("Get hospitals error: " + err.err);
        res.send(err);
    });
};

exports.get_patients = function(req, res) {
    console.log("Getting patients");
    db.query_patients().then(function(patients) {
        res.json(patients);
    }, function(err) {
        console.log("Get patients error: " + err.err);
        res.send(err);
    });
};

exports.get_patient = function(req, res) {
    console.log("Getting a patient");
    db.query_patient(req.params.patient_id).then(function(patient) {
        res.json(patient);
    }, function(err) {
        console.log("Get a patient error: " + err.err);
        res.send(err);
    });
};

exports.get_wait_list = function(req, res) {
    console.log("Getting wait list");
    db.save_patient(req.body).then(function(patient) {
        util.get_average_wait_time().then(function(result) {
            res.json(result[patient.pain])
        }, function(err) {
            console.log("Get illnesses error: " + err.err);
            res.send(err);
        });
    }, function(err) {
        console.log("Save a patient error: " + err.err);
        res.send(err);
    });
};
