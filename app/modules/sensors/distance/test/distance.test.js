var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;

const { DistanceSensor } = require('../DistanceSensor');

var s;
var updated;

const SAMPLE_ID = 1;
const SAMPLE_VALUE_1 = 123;
const SAMPLE_VALUE_2 = 126;

const SAMPLE_SENSOR_READING = {
    id: 1,
    value: 122
};

const EXPECTED_SENSOR_READING_1 = {
    id: 1,
    value: 122
};

beforeEach(function () {
    s = new DistanceSensor(SAMPLE_ID, SAMPLE_VALUE_1);
    updated = s.getReading().updated;
});

describe('Distance Sensor', function () {
    describe('#getReading()', function () {
        it('should get the sensor reading', function () {
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('id');
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('value');
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('updated');
            expect(s.getReading()).to.not.null;
            expect(s.getReading()).to.not.be.empty;
            expect(s.getReading()).to.not.undefined;
            assert.typeOf(s.getReading(), 'object');
            assert.typeOf(s.getReading().id, 'number');
            assert.typeOf(s.getReading().value, 'number');
            assert.typeOf(s.getReading().updated, 'date');
        });
    });

    describe('#setReading()', function () {
        it('should set the sensor value', function () {
            s.setReading(SAMPLE_VALUE_1 + 3);
            assert.notEqual(s.getReading().value, SAMPLE_VALUE_1);
            assert.equal(s.getReading().value, SAMPLE_VALUE_2);
            assert.notEqual(s.getReading().updated, updated);
        });
    });
});
