'use strict';
module.exports = function(app) {
    var scheduler = require('../controllers/HospitalsController');

    // Routes
    app.route('/illnesses')
        .get(scheduler.get_illnesses);

    //Note: temporarily disable these 3 routes because they are not in use at the moment
    // app.route('/hospitals')
    //     .get(scheduler.get_hospitals);
    //
    // app.route('/patients')
    //     .get(scheduler.get_patients);
    //
    // app.route('/patients/:patient_id')
    //     .get(scheduler.get_patient);

    app.route('/waitlist')
        .post(scheduler.get_wait_list)
};
