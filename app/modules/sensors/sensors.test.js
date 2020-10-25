var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;

const sensors = require('.');
const DistanceSensor = require('./distance/DistanceSensor');
const ColorSensor = require('./color/ColorSensor');

var s;
var updated;

const SAMPLE_ID = 1;

const INITIAL_COLOR_SENSOR_VALUES = [0, 0, 0];
const SAMPLE_COLOR_SENSOR_VALUES_1 = [123, 231, 19];
const SAMPLE_COLOR_SENSOR_VALUES_2 = [1, 150, 121];

const INITIAL_DISTANCE_SENSOR_VALUE = 0;
const SAMPLE_DISTANCE_SENSOR_VALUE_1 = 123;
const SAMPLE_DISTANCE_SENSOR_VALUE_2 = 150;

beforeEach(function () {
    s = sensors(SAMPLE_ID);
    updated = s.updated;
});

describe('Sensors', function () {
    describe('#sensors()', function () {
        it('should create a sensor instance', function () {
            s = sensors(SAMPLE_ID);
            // updated
            expect(s).to.haveOwnProperty('updated');
            assert.typeOf(s.updated, 'date');
            expect(s.updated.toString()).to.equal(updated.toString());

            // color
            expect(s).to.haveOwnProperty('color');
            expect(s.color).to.be.instanceOf(ColorSensor.ColorSensor);
            assert.typeOf(s.color, 'object');
            expect(s.color.id).to.equal(SAMPLE_ID);
            expect(s.color.values).to.deep.equal(INITIAL_COLOR_SENSOR_VALUES);

            // distance
            expect(s).to.haveOwnProperty('distance');
            expect(s.distance).to.be.instanceOf(DistanceSensor.DistanceSensor);
            assert.typeOf(s.distance, 'object');
            expect(s.distance.id).to.equal(SAMPLE_ID);
            expect(s.distance.value).to.deep.equal(INITIAL_DISTANCE_SENSOR_VALUE);

            // console.log(s);
        });
    });
});
