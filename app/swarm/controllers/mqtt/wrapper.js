// add 'swarm' property to the handler function in each route
const wrapper = (routes, swarm) => {
    let wrappedRoutes = [];

    routes.map((item) => {
        wrappedRoutes.push({
            ...item, 
            handler: (msg) => item.handler(msg, swarm)
        });
    });

    return wrappedRoutes;
};

module.exports = wrapper;
