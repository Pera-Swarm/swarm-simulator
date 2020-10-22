var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

const { DistanceSensor } = require('../DistanceSensor');

var s;

const SAMPLE_ID = 1;
const SAMPLE_VALUE = 123;

const SAMPLE_SENSOR_READING = {
    id: 1,
    value: 122
};

const EXPECTED_SENSOR_READING_1 = {
    id: 1,
    value: 122
};

beforeEach(function () {
    s = new DistanceSensor(SAMPLE_ID, SAMPLE_VALUE);
    s.getReading();
});

describe('Distance Sensor', function () {
    describe('#getReading()', function () {
        it('should get the sensor readings', function () {
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('id');
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('value');
            expect(s.getReading()).to.not.be.empty;
            expect(s.getReading()).to.not.undefined;
            expect(s.getReading()).to.not.null;
        });
    });
});
