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

// Call only update for adding or updating the coordinates list
// supports for both single objects adn arrays
loc_system.update([SAMPLE_COORDINATE_1, SAMPLE_COORDINATE_2]);
loc_system.update({ ...SAMPLE_COORDINATE_2, y: 10 });
console.log(loc_system.getIds());
console.log(loc_system.getCoordinates());
console.log(loc_system.idExists(1));
console.log(loc_system.size());
