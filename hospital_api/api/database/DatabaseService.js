'use strict';


var mongoose = require('mongoose'),
    util = require('../utils/Utilities'),
    Patient = mongoose.model('Patient');

exports.query_patients = function() {
    return new Promise(function(resolve, reject) {
        Patient.find({}, function(err, patients) {
            if (err){
                reject(err);
            }
            resolve(patients);
        });
    });
};

exports.query_patient = function(patient_id){
    return new Promise(function(resolve, reject) {
        Patient.findById(patient_id, function(err, patient) {
            if (err){
                reject(err);
            }
            resolve(patient);
        });
    });
};

exports.save_patient = function(patient){
    var new_patient = new Patient(patient);
    return new Promise(function(resolve, reject) {
        if(new_patient.pain < 0 || new_patient.pain > 4){
            reject(new Error("Pain level is not correct: "+new_patient.pain));
        }
        if(!util.check_is_valid_illness(new_patient.illness)){
            reject(new Error("Illness is not correct: "+new_patient.illness));
        }
        new_patient.save(function(err, patient) {
            if (err){
                reject(err);
            }
            resolve(patient);
        });
    });
};
