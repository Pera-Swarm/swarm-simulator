var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

const { Coordinate } = require('../../../common/coordinate');
const Localization = require('../Localization');
const LocalizationSystem = require('../simple');

var l;

const SAMPLE_COORDINATE_1 = {
    id: 1,
    heading: 1,
    x: -1,
    y: 2
};

const SAMPLE_COORDINATE_2 = {
    id: 2,
    heading: 2,
    x: -3,
    y: 9
};

const SAMPLE_INVALID_COORDINATE_1 = {
    heading: 2,
    x: -3,
    y: 9
};

const SAMPLE_INVALID_COORDINATE_2 = {
    id: 2,
    x: -3,
    y: 9
};

const SAMPLE_COORDINATES_LIST_1 = [SAMPLE_COORDINATE_1];

const SAMPLE_COORDINATES_LIST_2 = [SAMPLE_COORDINATE_1, SAMPLE_COORDINATE_2];

const SAMPLE_COORDINATES_LIST_3 = [
    SAMPLE_COORDINATE_1,
    SAMPLE_COORDINATE_2,
    SAMPLE_INVALID_COORDINATE_1
];

beforeEach(function () {
    l = new LocalizationSystem();
});

describe('Simple Localization System', function () {
    describe('#getCoordinates()', function () {
        it('should return the coordinates list', function () {
            l.add(new Coordinate(1, 0, 0, -1));
            l.add(new Coordinate(2, 1, 1, -1));
            l.add(new Coordinate(3, -1, 0, -1));
            expect(l.getCoordinates()).to.be.a('array');
            assert.equal(l.size(), 3);
        });
    });

    describe('#getIds()', function () {
        it('should return the ids list', function () {
            l.add(new Coordinate(1, 0, 0, -1));
            l.add(new Coordinate(2, 1, 1, -1));
            l.add(new Coordinate(3, -1, 0, -1));
            expect(l.getIds()).to.be.a('array');
            assert.equal(l.size(), 3);
        });
    });

    describe('#idExists()', function () {
        it('should return whether an id exists in the list or not', function () {
            l.add(new Coordinate(1, 1, 0, 0));
            l.add(new Coordinate(2, 1, 0, 0));
            l.add(new Coordinate(3, 1, 0, 0));
            expect(l.idExists(1)).to.be.a('boolean').to.equal(true);
            expect(l.idExists(2)).to.be.a('boolean').to.equal(true);
            expect(l.idExists(3)).to.be.a('boolean').to.equal(true);
            expect(l.idExists(4)).to.be.a('boolean').to.equal(false);
            expect(l.idExists('3')).to.be.a('boolean').to.equal(false);
        });
    });

    describe('#size()', function () {
        it('should return the size of the list', function () {
            expect(l.size()).to.be.a('number').to.equal(0);
            l.add(new Coordinate(1, 1, 0, 0));
            expect(l.size()).to.be.a('number').to.equal(1);
        });
    });

    describe('#add()', function () {
        it('should add a coordinate to the list', function () {
            l.add(new Coordinate(1, 1, 0, 0));
            expect(l.size()).to.be.a('number');
            l.add(SAMPLE_COORDINATE_1);
            l.add(SAMPLE_COORDINATE_2);
            assert.equal(l.size(), 2);
        });
    });

    describe('#update()', function () {
        it('should update a coordinate already in the list or add to the list', function () {
            l.add(SAMPLE_COORDINATE_1);
            expect(l.update(new Coordinate(1, 1, 0, 0)))
                .to.be.a('boolean')
                .to.equal(true);
            expect(l.update(SAMPLE_COORDINATE_1)).to.be.a('boolean').to.equal(true);
            expect(l.update(SAMPLE_COORDINATES_LIST_1)).to.be.a('boolean').to.equal(true);
            expect(l.update(SAMPLE_COORDINATES_LIST_2)).to.be.a('boolean').to.equal(true);
            expect(l.update(SAMPLE_COORDINATES_LIST_3)).to.be.a('number').to.equal(-1);
            expect(l.update(SAMPLE_INVALID_COORDINATE_1)).to.be.a('number').to.equal(-1);
        });
    });
});
