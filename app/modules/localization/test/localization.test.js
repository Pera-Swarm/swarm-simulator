var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

const { Coordinate } = require('../../../common/coordinate');
const Localization = require('../Localization');

var l;

const SAMPLE_COORDINATE = {
    id: 1,
    heading: 1,
    x: -1,
    y: 2
};

const SAMPLE_UPDATE_COORDINATE_1 = {
    id: 1,
    heading: 1,
    x: -1,
    y: 2
};

const SAMPLE_UPDATE_COORDINATE_2 = {
    id: 5,
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

beforeEach(function() {
    l = new Localization();
});

describe('Localization', function() {

    describe('#findIndexById()', function() {
        it('should find the coordinate in the list if exist or return -1', function() {
            l.add(new Coordinate(1, 0, 0, -1));
            l.add(new Coordinate(2, 1, 1, -1));
            l.add(new Coordinate(3, -1, 0, -1));
            expect(l.findIndexById(1)).to.be.a('number').to.equal(0);
            assert.equal(l.findIndexById(2), 1);
            assert.equal(l.findIndexById(4), -1);
        });
    });

    describe('#getCoordinates()', function() {
        it('should return the coordinates list', function() {
            l.add(new Coordinate(1, 0, 0, -1));
            l.add(new Coordinate(2, 1, 1, -1));
            l.add(new Coordinate(3, -1, 0, -1));
            expect(l.getCoordinates()).to.be.a('array');
            assert.equal(l.size(), 3);
        });
    });

    describe('#size()', function() {
        it('should return the size of the list', function() {
            expect(l.size()).to.be.a('number').to.equal(0);
            l.add(new Coordinate(1, 1, 0, 0));
            expect(l.size()).to.be.a('number').to.equal(1);
        });
    });

    describe('#validate()', function() {
        it('should validate a coordinate', function() {
            expect(l.validate(SAMPLE_COORDINATE)).to.be.a('boolean').to.equal(true);
            expect(l.validate(SAMPLE_INVALID_COORDINATE_1)).to.be.a('number').to.equal(-1);
            expect(l.validate(SAMPLE_INVALID_COORDINATE_2)).to.be.a('number').to.equal(-1);
        });
    });

    describe('#add()', function() {
        it('should add a coordinate to the list', function() {
            l.add(new Coordinate(1, 1, 0, 0));
            expect(l.size()).to.be.a('number');
            l.add(SAMPLE_UPDATE_COORDINATE_1);
            l.add(SAMPLE_UPDATE_COORDINATE_2);
            assert.equal(l.size(), 2);
        });
    });

    describe('#updateOne()', function() {
        it('should update a coordinate in the list', function() {
            l.add(new Coordinate(1, 0, 0, -1));
            l.add(new Coordinate(2, 1, 1, -1));
            l.add(new Coordinate(3, -1, 0, -1));
            expect(l.updateOne(SAMPLE_UPDATE_COORDINATE_1)).to.be.a('boolean').to.equal(true);
            expect(l.updateOne(SAMPLE_UPDATE_COORDINATE_2)).to.be.a('number').to.equal(-1);
        });
    });

    describe('#updateMany()', function() {
        it('should update a coordinate in the list', function() {
            l.add(new Coordinate(1, 0, 0, -1));
            l.add(new Coordinate(2, 1, 1, -1));
            l.add(new Coordinate(3, -1, 0, -1));
            expect(l.updateMany([SAMPLE_UPDATE_COORDINATE_1, SAMPLE_UPDATE_COORDINATE_2])).to.be.a('boolean').to.equal(true);
            expect(l.updateMany(SAMPLE_UPDATE_COORDINATE_2)).to.be.a('number').to.equal(-1);
        });
    });

    describe('#updateByIndex()', function() {
        it('should update a coordinate in the list by index', function() {
            l.add(new Coordinate(1, 0, 0, -1));
            l.add(new Coordinate(2, 1, 1, -1));
            l.add(new Coordinate(3, -1, 0, -1));
            expect(l.updateByIndex(0, SAMPLE_UPDATE_COORDINATE_1)).to.be.a('boolean').to.equal(true);
            expect(l.updateByIndex(0, SAMPLE_INVALID_COORDINATE_1)).to.be.a('number').to.equal(-1);
            expect(l.updateByIndex(2, SAMPLE_UPDATE_COORDINATE_1)).to.be.a('number').to.equal(-1);
            expect(l.updateByIndex(5, SAMPLE_UPDATE_COORDINATE_1)).to.be.a('number').to.equal(-1);
        });
    });

});
