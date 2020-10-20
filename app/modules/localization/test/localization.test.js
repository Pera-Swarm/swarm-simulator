var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

const Coordinate = require('../../../common/coordinate');
const Localization = require('../Localization');

var l;

beforeEach(function() {
    l = new Localization();
});

describe('Localization', function() {

    describe('#size()', function() {
        it('should return the size of the list', function() {
            expect(l.size()).to.be.a('number');
            expect(l.size()).to.equal(0);
            l.add(new Coordinate(1, 0, 0));
            expect(l.size()).to.be.a('number');
            expect(l.size()).to.equal(1);
        });
    });

    describe('#add()', function() {
        it('should add a coordinate to the list', function() {
            l.add(new Coordinate(1, 0, 0));
            expect(l.size()).to.be.a('number');
            l.add(new Coordinate(1, 0, 0, 1));
            assert.equal(l.size(), 2);
        });
    });

    describe('#getCoordinates()', function() {
        it('should return the coordinates list', function() {
            l.add(new Coordinate(1, 0, 0));
            l.add(new Coordinate(2, 0, 1));
            l.add(new Coordinate(3, -1, 0));
            assert.equal(l.size(), 3);
        });
    });

});
