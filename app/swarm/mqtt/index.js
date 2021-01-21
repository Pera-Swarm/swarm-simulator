const communicationRoutes = require('./route.communication');
const localizationRoutes = require('./route.localization');
const obstacleRoutes = require('./route.obstacles');
const { initialPublishers: obstacleInitialPublishers } = require('./route.obstacles');
const robotRoutes = require('./route.robots');
const sensorRoutes = require('./route.sensors');

module.exports = {
    communicationRoutes,
    localizationRoutes,
    obstacleRoutes,
    obstacleInitialPublishers,
    robotRoutes,
    sensorRoutes
};
