let assert = require('chai').assert;
let chai = require('chai');
let expect = chai.expect;

const { Robot } = require('./robot');
const { sensorModuleTypes } = require('pera-swarm');

let r;
let updated;
let created;
let timestamp;

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
        it('should create a Robot instance', function () {
            // id
            expect(r).to.have.property('id');
            assert.typeOf(r.id, 'number');
            // coordinates
            expect(r).to.have.property('coordinates');
            assert.typeOf(r.coordinates, 'object');
            // created
            expect(r).to.have.property('created');
            assert.typeOf(r.created, 'date');
            expect(r.created).to.equal(created);
            // updated
            expect(r).to.have.property('updated');
            assert.typeOf(r.updated, 'number');
            expect(r.updated).to.equal(updated);
            // timestamp
            expect(r).to.have.property('timestamp');
            assert.typeOf(r.timestamp, 'number');
            expect(r.timestamp).to.equal(timestamp);
        });
    });

    describe('#coordinates', function () {
        it('should return the coordinates of the robot instance', function () {
            const coordinates = r.coordinates;
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
            r.setCoordinates({
                heading: SAMPLE_HEADING_1,
                x: SAMPLE_X_1,
                y: SAMPLE_Y_1
            });
            expect(r.updated).gte(updated);
            const coordinates = r.coordinates;
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

    describe('#created', function () {
        it('should return the created value of the robot instance', function () {
            const createdValue = r.created;
            assert.typeOf(createdValue, 'date');
            expect(createdValue).to.equal(created);
        });
    });

    describe('#timestamp', function () {
        it('should return the timestamp value of the robot instance', function () {
            const timestampValue = r.timestamp;
            assert.typeOf(timestampValue, 'number');
            expect(timestampValue).to.equal(timestamp);
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
});
