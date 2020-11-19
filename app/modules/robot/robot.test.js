var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;

const { Robot, sensorTypes } = require('./robot');
const { Coordinate } = require('../../common/coordinate');
// const sensors = require('../../modules/sensors');

var r;
var updated;
var created;
var timestamp;

const SAMPLE_ID_1 = 1;
const SAMPLE_ID_2 = 2;

const INITIAL_HEADING = 0;
const INITIAL_X = 0;
const INITIAL_Y = 0;
const INITIAL_Z = undefined;

const SAMPLE_HEADING_1 = 5;
const SAMPLE_X_1 = 6;
const SAMPLE_Y_1 = 7;
const SAMPLE_Z_1 = 8;

const SAMPLE_HEADING_2 = 10;
const SAMPLE_X_2 = 11;
const SAMPLE_Y_2 = 12;
const SAMPLE_Z_2 = 13;

beforeEach(function () {
    r = new Robot(SAMPLE_ID_1);
    updated = r.updated;
    created = r.created;
    timestamp = r.timestamp;
});

describe('Robot', function () {
    describe('#Robot()', function () {
        it('should create a robot instance', function () {
            // id
            expect(r).to.haveOwnProperty('id');
            assert.typeOf(r.id, 'number');
            // coordinate
            expect(r).to.haveOwnProperty('coordinate');
            assert.typeOf(r.coordinate, 'object');
            expect(r.coordinate).to.be.instanceOf(Coordinate);
            // sensors
            expect(r).to.haveOwnProperty('sensors');
            assert.typeOf(r.sensors, 'object');
            // created
            expect(r).to.haveOwnProperty('created');
            assert.typeOf(r.created, 'date');
            expect(r.created).to.equal(created);
            // updated
            expect(r).to.haveOwnProperty('updated');
            assert.typeOf(r.updated, 'number');
            expect(r.updated).to.equal(updated);
            // timestamp
            expect(r).to.haveOwnProperty('timestamp');
            assert.typeOf(r.timestamp, 'number');
            expect(r.timestamp).to.equal(timestamp);
        });
    });

    describe('#getCoordinates()', function () {
        it('should return the coordinates of the robot instance', function () {
            const coordinates = r.getCoordinates();
            assert.typeOf(coordinates, 'object');
            // id
            expect(coordinates).to.haveOwnProperty('id');
            assert.typeOf(coordinates.id, 'number');
            expect(coordinates.id).to.be.equal(SAMPLE_ID_1);
            // heading
            expect(coordinates).to.haveOwnProperty('heading');
            assert.typeOf(coordinates.heading, 'number');
            expect(coordinates.heading).to.be.equal(INITIAL_HEADING);
            // x
            expect(coordinates).to.haveOwnProperty('x');
            assert.typeOf(coordinates.x, 'number');
            expect(coordinates.x).to.be.equal(INITIAL_X);
            // y
            expect(coordinates).to.haveOwnProperty('y');
            assert.typeOf(coordinates.y, 'number');
            expect(coordinates.y).to.be.equal(INITIAL_Y);
            // z
            expect(coordinates).to.not.haveOwnProperty('z');
            assert.typeOf(coordinates.z, 'undefined');
            expect(coordinates.z).to.be.equal(INITIAL_Z);
        });
    });

    describe('#setCoordinates()', function () {
        it('should set the coordinates of the robot instance', function () {
            r.setCoordinates(SAMPLE_HEADING_1, SAMPLE_X_1, SAMPLE_Y_1);
            expect(r.updated).gte(updated);
            const coordinates = r.getCoordinates();
            assert.typeOf(coordinates, 'object');
            // id
            expect(coordinates).to.haveOwnProperty('id');
            assert.typeOf(coordinates.id, 'number');
            expect(coordinates.id).to.be.equal(SAMPLE_ID_1);
            // heading
            expect(coordinates).to.haveOwnProperty('heading');
            assert.typeOf(coordinates.heading, 'number');
            expect(coordinates.heading).to.be.equal(SAMPLE_HEADING_1);
            // x
            expect(coordinates).to.haveOwnProperty('x');
            assert.typeOf(coordinates.x, 'number');
            expect(coordinates.x).to.be.equal(SAMPLE_X_1);
            // y
            expect(coordinates).to.haveOwnProperty('y');
            assert.typeOf(coordinates.y, 'number');
            expect(coordinates.y).to.be.equal(SAMPLE_Y_1);
            // z
            expect(coordinates).to.not.haveOwnProperty('z');
            assert.typeOf(coordinates.z, 'undefined');
            expect(coordinates.z).to.be.equal(INITIAL_Z);
        });
    });

    describe('#getSensorReadings()', function () {
        it('should return the sensor readings of the robot instance', function () {
            const sensorReadings = r.getSensorReadings();
            assert.typeOf(sensorReadings, 'object');
            sensorTypes.map((type) => {
                expect(sensorReadings).to.haveOwnProperty(type);
            });
        });
    });

    describe('#getReadingsBySensor()', function () {
        it('should return the sensor readings of the robot instance by the sensor type', function () {
            expect(r.getReadingsBySensor).to.throw(TypeError);
            sensorTypes.map((type) => {
                const sensorReading = r.getReadingsBySensor(type);
                expect(sensorReading).to.haveOwnProperty('id');
                assert.typeOf(sensorReading, 'object');
            });
        });
    });

    describe('#updateHeartbeat()', function () {
        it('should update and return the updated timestamp of the robot instance', function () {
            const heartbeat = r.updateHeartbeat();
            assert.typeOf(heartbeat, 'number');
            expect(heartbeat).gte(timestamp);
            expect(r.updated).gte(updated);
        });
    });

    describe('#isAlive()', function (done) {
        this.timeout(3000);
        it('should return whether the robot instance is \'alive\' or \'dead\'', function () {
            setTimeout(() => {
                expect(r.isAlive).to.throw(TypeError);
                const state = r.isAlive(3);
                assert.typeOf(state, 'boolean');
                expect(state).equal(true);
            }, 3000);
        });
    });
});
