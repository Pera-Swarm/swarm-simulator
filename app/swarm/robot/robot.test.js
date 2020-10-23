var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;

const { Robot } = require('./');
const { Coordinate } = require('../../common/coordinate');
// const sensors = require('../../modules/sensors');

var r;
var updated;
var created;
var timestamp;

const SAMPLE_ID_1 = 1;
const SAMPLE_ID_2 = 2;

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
});
