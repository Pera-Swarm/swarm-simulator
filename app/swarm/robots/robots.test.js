var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;

const { Robot } = require('../robot');
const { Robots, initRobots } = require('./robots');

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
            assert.typeOf(r.list, 'object');
            expect(r.list).to.deep.equal({});
        });
    });

    describe('#getSize()', function () {
        it('should return the size of the robot list', function () {
            var size = r.getSize();
            assert.typeOf(size, 'number');
            expect(size).to.equal(0);
            r.addRobot(1);
            r.addRobot(2);
            r.addRobot(1);
            size = r.getSize();
            assert.typeOf(size, 'number');
            expect(size).to.equal(2);
        });
    });

    describe('#addRobot()', function () {
        it('should add a robot', function () {
            expect(r.addRobot).to.throw(TypeError);
            r.addRobot(1);
            r.addRobot(1);
            expect(r.getSize()).to.equal(1);
        });
    });

    describe('#findRobotById()', function () {
        it('should return a robot by id or -1', function () {
            var robot = r.findRobotById(SAMPLE_ID_1);
            // empty
            assert.typeOf(robot, 'number');
            expect(robot).to.equal(-1);
            r.addRobot(SAMPLE_ID_1);
            r.addRobot(SAMPLE_ID_2);
            // populated
            robot = r.findRobotById(SAMPLE_ID_1);
            assert.typeOf(robot, 'object');
            expect(robot).to.haveOwnProperty('id');
            expect(robot.id).to.equal(SAMPLE_ID_1);
            robot = r.findRobotById(SAMPLE_ID_2);
            assert.typeOf(robot, 'object');
            expect(robot).to.haveOwnProperty('id');
            expect(robot.id).to.equal(SAMPLE_ID_2);
            // not existing
            robot = r.findRobotById(10);
            assert.typeOf(robot, 'number');
            expect(robot).to.equal(-1);
        });
    });
});
