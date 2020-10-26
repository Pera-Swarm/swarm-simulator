var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;

const { ColorSensor } = require('../ColorSensor');

var s;
var updated;

const SAMPLE_ID = 1;
const INITIAL_VALUES = [0, 0, 0];
const SAMPLE_VALUES_1 = [123, 231, 19];
const SAMPLE_VALUES_2 = [1, 150, 121];

beforeEach(function () {
    s = new ColorSensor(SAMPLE_ID);
    updated = s.getReading().updated;
});

describe('Color Sensor', function () {
    describe('#getReading()', function () {
        it('should get the sensor readings', function () {
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('id');
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('values');
            expect(s.getReading()).to.be.a('object').to.haveOwnProperty('updated');
            expect(s.getReading()).to.not.null;
            expect(s.getReading()).to.not.be.empty;
            expect(s.getReading()).to.not.undefined;
            assert.typeOf(s.getReading(), 'object');
            assert.typeOf(s.getReading().id, 'number');
            assert.typeOf(s.getReading().values, 'array');
            assert.typeOf(s.getReading().updated, 'date');
        });
    });

    describe('#setReading()', function () {
        it('should set the sensor values', function () {
            assert.deepEqual(s.getReading().values, INITIAL_VALUES);
            s.setReading(SAMPLE_VALUES_1);
            assert.notEqual(s.getReading().values, INITIAL_VALUES);
            assert.deepEqual(s.getReading().values, SAMPLE_VALUES_1);
            assert.notEqual(s.getReading().updated, updated);
            s.setReading(SAMPLE_VALUES_2);
            assert.notEqual(s.getReading().values, INITIAL_VALUES);
            assert.deepEqual(s.getReading().values, SAMPLE_VALUES_2);
            assert.notEqual(s.getReading().updated, updated);
        });
    });
});
