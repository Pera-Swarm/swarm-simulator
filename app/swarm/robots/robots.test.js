var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;

const { Robot } = require('../../modules/robot/');
const { Robots, initRobots } = require('./robots');

var r = initRobots();
var updated;

const SAMPLE_ID_1 = 1;
const SAMPLE_ID_2 = 2;
const SAMPLE_ID_3 = 3;

const INITIAL_HEADING = 0;
const INITIAL_X = 0;
const INITIAL_Y = 0;
// const INITIAL_Z = undefined;

const SAMPLE_HEADING_1 = 5;
const SAMPLE_X_1 = 6;
const SAMPLE_Y_1 = 7;
// const SAMPLE_Z_1 = 8;

const SAMPLE_HEADING_2 = 10;
const SAMPLE_X_2 = 11;
const SAMPLE_Y_2 = 12;
// const SAMPLE_Z_2 = 13;

const SAMPLE_COORDINATE_STRING_1 = '0 0 0';
const SAMPLE_COORDINATE_STRING_2 = `${SAMPLE_X_2} ${SAMPLE_Y_2} ${SAMPLE_HEADING_2}`;

beforeEach(function () {
    r.removeRobot(SAMPLE_ID_1);
    r.removeRobot(SAMPLE_ID_2);
    r.removeRobot(SAMPLE_ID_3);
    r.addRobot(SAMPLE_ID_1);
    updated = r.updated;
});

describe('Robots', function () {
    describe('#initRobots()', function () {
        it('should initialize robots', function () {
            // robotList
            expect(r).to.haveOwnProperty('robotList');
            assert.typeOf(r.robotList, 'object');
            expect(r.robotList).to.not.deep.equal({});
            // updated
            expect(r).to.haveOwnProperty('updated');
            assert.typeOf(r.updated, 'number');
            // size
            expect(r).to.haveOwnProperty('size');
            assert.typeOf(r.updated, 'number');
            // addRobot
            expect(r).to.haveOwnProperty('addRobot');
            assert.typeOf(r.addRobot, 'function');
            // getSize
            expect(r).to.haveOwnProperty('getSize');
            assert.typeOf(r.getSize, 'function');
            // existsRobot
            expect(r).to.haveOwnProperty('existsRobot');
            assert.typeOf(r.existsRobot, 'function');
            // findRobotById
            expect(r).to.haveOwnProperty('findRobotById');
            assert.typeOf(r.findRobotById, 'function');
            // removeRobot
            expect(r).to.haveOwnProperty('removeRobot');
            assert.typeOf(r.removeRobot, 'function');
            // getCoordinatesAll
            expect(r).to.haveOwnProperty('getCoordinatesAll');
            assert.typeOf(r.getCoordinatesAll, 'function');
            // getCoordinatesById
            expect(r).to.haveOwnProperty('getCoordinatesById');
            assert.typeOf(r.getCoordinatesById, 'function');
        });
    });

    describe('#addRobot()', function () {
        it('should add a robot', function () {
            expect(r.addRobot).to.throw(TypeError);
            expect(r.getSize()).to.equal(1);
            r.addRobot(SAMPLE_ID_2);
            expect(r.getSize()).to.equal(2);
            expect(r.updated).gte(updated);
        });
    });

    describe('#getSize()', function () {
        it('should return the size of the robot robotList', function () {
            var size = r.getSize();
            assert.typeOf(size, 'number');
            expect(size).to.equal(1);
            r.addRobot(SAMPLE_ID_1);
            r.addRobot(SAMPLE_ID_2);
            r.addRobot(SAMPLE_ID_1);
            size = r.getSize();
            assert.typeOf(size, 'number');
            expect(size).to.equal(2);
        });
    });

    describe('#existsRobot()', function () {
        it('should return whether a robot exists or not', function () {
            r.addRobot(SAMPLE_ID_1);
            r.addRobot(SAMPLE_ID_2);
            expect(r.existsRobot).to.throw(TypeError);
            expect(r.existsRobot(SAMPLE_ID_1)).to.equal(true);
            expect(r.existsRobot(SAMPLE_ID_2)).to.equal(true);
            expect(r.existsRobot(3)).to.equal(false);
        });
    });

    describe('#isAliveRobot()', function (done) {
        this.timeout(3000);
        it('should check each and every robot instances and remove them if ', function () {
            setTimeout(() => {
                expect(r.isAliveRobot).to.throw(TypeError);
                const state = r.isAliveRobot(SAMPLE_ID_1, 3);
                assert.typeOf(state, 'boolean');
                expect(state).equal(true);
            }, 3000);
        });
    });

    describe('#findRobotById()', function () {
        it('should return a robot by id or -1', function () {
            expect(r.findRobotById).to.throw(TypeError);
            var robot = r.findRobotById(SAMPLE_ID_1);
            // empty
            expect(robot).not.to.equal(-1);
            assert.typeOf(robot, 'object');
            r.addRobot(SAMPLE_ID_1);
            r.addRobot(SAMPLE_ID_2);
            // populated
            robot = r.findRobotById(SAMPLE_ID_1);
            assert.typeOf(robot, 'object');
            expect(robot).to.haveOwnProperty('id').and.equal(SAMPLE_ID_1);
            robot = r.findRobotById(SAMPLE_ID_2);
            assert.typeOf(robot, 'object');
            expect(robot).to.haveOwnProperty('id').and.equal(SAMPLE_ID_2);
            // not existing
            robot = r.findRobotById(10);
            assert.typeOf(robot, 'number');
            expect(robot).to.equal(-1);
        });
    });

    describe('#removeRobot()', function () {
        it('should remove a robot', function () {
            expect(r.removeRobot).to.throw(TypeError);
            r.addRobot(SAMPLE_ID_2);
            r.removeRobot(SAMPLE_ID_1);
            r.removeRobot(SAMPLE_ID_2);
            expect(r.getSize()).to.equal(0);
            expect(r.robotList).to.deep.equal({});
            expect(r.updated).gte(updated);
        });
    });

    describe('#getCoordinatesById()', function () {
        it('should return coordinates of a robot by id if exists', function () {
            expect(r.getCoordinatesById).to.throw(TypeError);
            // ROBOT 1
            var coordinates = r.getCoordinatesById(SAMPLE_ID_1);
            assert.typeOf(coordinates, 'object');
            expect(coordinates).to.haveOwnProperty('id').and.equal(SAMPLE_ID_1);
            expect(coordinates).to.haveOwnProperty('heading').and.equal(INITIAL_HEADING);
            expect(coordinates).to.haveOwnProperty('x').and.equal(INITIAL_X);
            expect(coordinates).to.haveOwnProperty('y').and.equal(INITIAL_Y);
            // ROBOT 2
            r.addRobot(SAMPLE_ID_2, SAMPLE_HEADING_2, SAMPLE_X_2, SAMPLE_Y_2);
            coordinates = r.getCoordinatesById(SAMPLE_ID_2);
            expect(coordinates).to.haveOwnProperty('id').and.equal(SAMPLE_ID_2);
            expect(coordinates).to.haveOwnProperty('heading').and.equal(SAMPLE_HEADING_2);
            expect(coordinates).to.haveOwnProperty('x').and.equal(SAMPLE_X_2);
            expect(coordinates).to.haveOwnProperty('y').and.equal(SAMPLE_Y_2);
        });
    });

    describe('#getCoordinateStringById()', function () {
        it('should return coordinates of a robot by id if exists', function () {
            expect(r.getCoordinateStringById).to.throw(TypeError);
            // ROBOT 0
            expect(r.getCoordinateStringById(0)).to.equal(-1);
            // ROBOT 1
            var coordinateString = r.getCoordinateStringById(SAMPLE_ID_1);
            assert.typeOf(coordinateString, 'string');
            expect(coordinateString).to.equal(SAMPLE_COORDINATE_STRING_1);
            // ROBOT 2
            r.addRobot(SAMPLE_ID_2, SAMPLE_HEADING_2, SAMPLE_X_2, SAMPLE_Y_2);
            coordinateString = r.getCoordinateStringById(SAMPLE_ID_2);
            assert.typeOf(coordinateString, 'string');
            expect(coordinateString).to.equal(SAMPLE_COORDINATE_STRING_2);
        });
    });

    describe('#getCoordinatesAll()', function () {
        it('should return coordinates of all the existing robots', function () {
            // 1 item
            var coordinates = r.getCoordinatesAll();
            assert.typeOf(coordinates, 'array');
            expect(coordinates.length).to.equal(1);
            expect(coordinates[0]).to.haveOwnProperty('id').and.equal(SAMPLE_ID_1);
            expect(coordinates[0])
                .to.haveOwnProperty('heading')
                .and.equal(INITIAL_HEADING);
            expect(coordinates[0]).to.haveOwnProperty('x').and.equal(INITIAL_X);
            expect(coordinates[0]).to.haveOwnProperty('y').and.equal(INITIAL_Y);
            r.addRobot(SAMPLE_ID_2, SAMPLE_HEADING_2, SAMPLE_X_2, SAMPLE_Y_2);

            // 2 items
            coordinates = r.getCoordinatesAll();
            assert.typeOf(coordinates, 'array');
            expect(coordinates.length).to.equal(2);
            expect(coordinates[1]).to.haveOwnProperty('id').and.equal(SAMPLE_ID_2);
            expect(coordinates[1])
                .to.haveOwnProperty('heading')
                .and.equal(SAMPLE_HEADING_2);
            expect(coordinates[1]).to.haveOwnProperty('x').and.equal(SAMPLE_X_2);
            expect(coordinates[1]).to.haveOwnProperty('y').and.equal(SAMPLE_Y_2);
        });
    });

    describe('#updateCoordinates()', function () {
        it('should update the coordinates of all the existing robots', function () {
            expect(r.getCoordinatesById).to.throw(TypeError);
            expect(r.getSize()).to.equal(1);
            expect(r.updated).equal(updated);
            const sampleCoordinateArray = [
                {
                    id: SAMPLE_ID_1,
                    heading: SAMPLE_HEADING_1,
                    x: SAMPLE_X_1,
                    y: SAMPLE_Y_1
                },
                {
                    id: SAMPLE_ID_2,
                    heading: SAMPLE_HEADING_2,
                    x: SAMPLE_X_2,
                    y: SAMPLE_Y_2
                }
            ];
            r.updateCoordinates(sampleCoordinateArray);
            expect(r.getSize()).to.equal(2);
            expect(r.getCoordinatesAll()).to.deep.equal(sampleCoordinateArray);
            expect(r.updated).gte(updated);
        });
    });

    describe('#prune()', function () {
        it('should check each and every robot instances and remove inactive instances', function () {
            expect(r.prune).to.throw(TypeError);
            expect(r.getSize()).to.equal(1);
            expect(r.updated).equal(updated);
            const sampleCoordinateArray = [
                {
                    id: SAMPLE_ID_1,
                    heading: SAMPLE_HEADING_1,
                    x: SAMPLE_X_1,
                    y: SAMPLE_Y_1
                },
                {
                    id: SAMPLE_ID_2,
                    heading: SAMPLE_HEADING_2,
                    x: SAMPLE_X_2,
                    y: SAMPLE_Y_2
                }
            ];
            r.updateCoordinates(sampleCoordinateArray);
            expect(r.getSize()).to.equal(2);
            expect(r.getCoordinatesAll()).to.deep.equal(sampleCoordinateArray);
            expect(r.updated).gte(updated);
        });
    });
});
