const SimpleLocalizationSystem = require('./simple');

var loc_system = new SimpleLocalizationSystem();

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

loc_system.update([SAMPLE_COORDINATE_1, SAMPLE_COORDINATE_2]);
console.log(loc_system.getIds());
console.log(loc_system.getCoordinates());
console.log(loc_system.idExists(1));
console.log(loc_system.size());
