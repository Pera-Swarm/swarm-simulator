# swarm-node

Virtual robot instance for the Swarm Simulator.

### Requirements

Please install node dependencies as follows:

```
npm install
```

### Environment Variables

Please copy the _sample.env_ file and rename into _.env_ and complete the configurations for http and mqtt

### Run the scripts

Development environment [TBD]

```
npm run dev
```

Production environment [TBD]

```
npm start
```

Run tests

```
npm run test
```

### To-Do
- [ ] Setup a logger(Winston or Loggly)
- [ ] ID registration [TBD]
- [ ] Controllers
    - ledstrip
    - motor
    - pattern
    - protocols
- [ ] Sensors
    - color
    - compass
    - distance
    - proximity
- [ ] Services
    - http
    - mqtt
    - ledstrip
    - motor
    - patterns
    - protocols

### Read More
- [NodeJS](https://nodejs.org/)
- [MQTT](https://github.com/mqttjs/MQTT.js)
- [Cron](https://github.com/merencia/node-cron)
- [Axios](https://github.com/axios/axios)
