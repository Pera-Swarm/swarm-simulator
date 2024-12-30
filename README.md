![Node.js CI](https://github.com/Pera-Swarm/e15-fyp-swarm-server/workflows/Node.js%20CI/badge.svg) 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Mixed Reality Simulator

### Requirements

Please install node dependencies as follows:

```
npm install
```

(The recommended node version is Node 18)

### Environment Variables

Please copy the _sample.env_ file and rename into _.env_ and complete the configurations for http and mqtt

```bash
MQTT_HOST=mqtt://localhost
MQTT_USER=user
MQTT_PASS=password
MQTT_CLIENT=mqtt_server
MQTT_CHANNEL=v1

ARENA_CONFIG="./app/config/arena/{arena_config}.json"

LOG_LEVEL='info'
```

### Run the scripts

Development environment

```
npm run dev
```

Production environment

```
npm start
```

### Documentation

You can find more information about pera-swarm on the [Official Documentation Page](https://pera-swarm.ce.pdn.ac.lk/docs/).

### Read More
- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [MQTT](https://github.com/mqttjs/MQTT.js)
- [Node Cron](https://github.com/merencia/node-cron)
