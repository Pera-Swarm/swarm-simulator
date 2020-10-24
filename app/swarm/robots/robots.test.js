var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;

const { Robot } = require('../robot');
const { Robots, initRobots } = require('./robots');

console.log(Robot);

var r;
var updated;

const SAMPLE_ID_1 = 1;
const SAMPLE_ID_2 = 2;

beforeEach(function () {
    r = initRobots();
    updated = r.updated;
});

describe('Robots', function () {
    describe('#initRobots()', function () {
        it('should initialize robots', function () {
            // addRobot
            expect(r).to.haveOwnProperty('addRobot');
            assert.typeOf(r.addRobot, 'function');

            // updated
            expect(r).to.haveOwnProperty('updated');
            assert.typeOf(r.updated, 'number');
            expect(r.updated).to.equal(updated);

            // list
            expect(r).to.haveOwnProperty('list');
            assert.typeOf(r.list, 'array');
            expect(r.list).to.deep.equal([]);
        });
    });
});
