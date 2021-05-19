var assert = require('assert'),
    patient = require('../models/Patient'),
    sinon = require('sinon'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../server'),
    prepare = require('mocha-prepare'),
    testData = require('./data.json'),
    mongoUnit = require('mongo-unit'),
    mongoUrl = process.env.MONGO_URL,
    db = require("../database/DatabaseService"),
    util = require('../utils/Utilities');

prepare(done => mongoUnit.start()
    .then(testMongoUrl => {
        console.log('fake mongo is started: ', testMongoUrl)
        process.env.MONGO_URL = testMongoUrl
        done()
    }))

describe('Get Illnesses Test', () => {
    let mock_util;
    var expected = {"_embedded":{"illnesses":[{"illness":{"name":"Mortal Cold","id":1},"_links":{"illnesses":{"href":"http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses"},"self":{"href":"http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses/1"}}}]}};
    beforeEach(function() {
        chai.use(chaiHttp);
        mongoUnit.initDb(mongoUrl, testData);
        mock_util = sinon.stub(util, 'get_illnesses');
    });
    afterEach(function() {
        mongoUnit.drop();
        mock_util.restore();
    });

    it('should get correct illnesses', function(done) {
        mock_util.resolves({data: expected});
        chai.request(server)
            .get('/illnesses')
            .end((err, res) => {
                assert(res.status, 200);
                assert(res.body, expected);
                done();
            });
    });

    it('should get no illnesses', function(done) {
        mock_util.rejects({err: "connection error"});
        chai.request(server)
            .get('/illnesses')
            .end((err, res) => {
                assert(res.status, 200);
                assert(res.body,{ err: 'connection error' });
                done();
            });
    });
});

describe('Get Wait Time Test', () => {
    let mock_util;
    let mock_db;
    var expectedDBCorrect = {"name": "David", "illness": 2, "pain": 4, "created": Date.now};
    var expectedDBWrong = {"name": "David", "illness": 2, "pain": 5, "created": Date.now};
    var expectedUtil = {2:[{"name": "Hospital1", "waitTime": 325, "patientCount": 13, "averageProcessTime": 25}]}
    beforeEach(function() {
        chai.use(chaiHttp);
        mongoUnit.initDb(mongoUrl, testData);
        mock_db = sinon.stub(db, 'save_patient');
        mock_util = sinon.stub(util, 'get_average_wait_time');
    });
    afterEach(function() {
        mongoUnit.drop();
        mock_util.restore();
        mock_db.restore();
    });

    it('should get correct list', function(done) {
        mock_db.resolves({data: expectedDBCorrect});
        mock_util.resolves({data: expectedUtil});
        chai.request(server)
            .get('/illnesses')
            .end((err, res) => {
                assert(res.status, 200);
                assert(res.body, [{"name": "Hospital1", "waitTime": 325, "patientCount": 13, "averageProcessTime": 25}]);
                done();
            });
    });

    it('should save no patient', function(done) {
        mock_db.resolves({data: expectedDBWrong});
        chai.request(server)
            .get('/illnesses')
            .end((err, res) => {
                assert(res.status, 200);
                assert(res.body,{ err: "Pain level is not correct: 5"});
                done();
            });
    });

    it('should get no list', function(done) {
        mock_db.resolves({data: expectedDBWrong});
        mock_util.rejects({err: "connection error"});
        chai.request(server)
            .get('/illnesses')
            .end((err, res) => {
                assert(res.status, 200);
                assert(res.body,{ err: "connection error"});
                done();
            });
    });
});
