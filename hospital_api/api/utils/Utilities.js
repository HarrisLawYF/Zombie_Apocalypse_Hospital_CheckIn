'use strict';


var axios = require('axios'),
    lodash = require('lodash');


exports.get_illnesses = function() {
    console.log("Calling get illnesses function");
    return axios.get('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses');
};

exports.get_hospitals = function() {
    console.log("Calling get hospitals function");
    return axios.get('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals');
};

exports.check_is_valid_illness = function(illness_id) {
    console.log("Calling check illness function");
    return new Promise(function(resolve, reject) {
        module.exports.get_illnesses().then(function(result) {
            let illness = lodash.filter(result.data._embedded.illnesses, x => x.illness.id === illness_id);
            if(illness){
                resolve(true)
            } else{
                reject(false)
            }
        }, function(err) {
            reject(false)
        });
    });
};

exports.get_average_wait_time = function() {
    console.log("Calling get wait time function");
    return new Promise(function(resolve, reject) {
        let pain_level_dict = {};
        pain_level_dict[0] = new Array();
        pain_level_dict[1] = new Array();
        pain_level_dict[2] = new Array();
        pain_level_dict[3] = new Array();
        pain_level_dict[4] = new Array();
        //Wait time = number of P * average process time
        module.exports.get_hospitals().then(function(result) {
            result.data._embedded.hospitals.forEach(function(hospital) {
                /*
                TODO
                (Improvement) Note: we can futher improve the computing time if we can confirm the waiting list is always in ascending order,
                 we can just use waitingList[0] etc instead of performing a filter here
                 */
                let pain_level_0 = lodash.find(hospital.waitingList, x => x.levelOfPain === 0);
                let pain_level_1 = lodash.find(hospital.waitingList, x => x.levelOfPain === 1);
                let pain_level_2 = lodash.find(hospital.waitingList, x => x.levelOfPain === 2);
                let pain_level_3 = lodash.find(hospital.waitingList, x => x.levelOfPain === 3);
                let pain_level_4 = lodash.find(hospital.waitingList, x => x.levelOfPain === 4);
                pain_level_0["name"] = hospital.name;
                pain_level_1["name"] = hospital.name;
                pain_level_2["name"] = hospital.name;
                pain_level_3["name"] = hospital.name;
                pain_level_4["name"] = hospital.name;

                pain_level_0["id"] = hospital.id;
                pain_level_1["id"] = hospital.id;
                pain_level_2["id"] = hospital.id;
                pain_level_3["id"] = hospital.id;
                pain_level_4["id"] = hospital.id;

                pain_level_0["waitTime"] = pain_level_0["patientCount"] * pain_level_0["averageProcessTime"];
                pain_level_1["waitTime"] = pain_level_1["patientCount"] * pain_level_1["averageProcessTime"];
                pain_level_2["waitTime"] = pain_level_2["patientCount"] * pain_level_2["averageProcessTime"];
                pain_level_3["waitTime"] = pain_level_3["patientCount"] * pain_level_3["averageProcessTime"];
                pain_level_4["waitTime"] = pain_level_4["patientCount"] * pain_level_4["averageProcessTime"];

                pain_level_dict[0].push(pain_level_0);
                pain_level_dict[1].push(pain_level_1);
                pain_level_dict[2].push(pain_level_2);
                pain_level_dict[3].push(pain_level_3);
                pain_level_dict[4].push(pain_level_4);
            });
            pain_level_dict[0].sort((a, b) => (a.waitTime > b.waitTime) ? 1 : -1);
            pain_level_dict[1].sort((a, b) => (a.waitTime > b.waitTime) ? 1 : -1);
            pain_level_dict[2].sort((a, b) => (a.waitTime > b.waitTime) ? 1 : -1);
            pain_level_dict[3].sort((a, b) => (a.waitTime > b.waitTime) ? 1 : -1);
            pain_level_dict[4].sort((a, b) => (a.waitTime > b.waitTime) ? 1 : -1);

            resolve(pain_level_dict)
        }, function(err) {
            reject(err)
        });
    });
};
