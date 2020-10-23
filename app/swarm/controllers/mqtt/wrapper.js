const wrapper = (routes, robots) => {
    const wrappedRoutes = routes.forEach((item) => {
        console.log(item, robots);
        return item;
    });
    // console.log(routes, robots);
};

module.exports = wrapper;
