![Node.js CI](https://github.com/Pera-Swarm/e15-fyp-swarm-server/workflows/Node.js%20CI/badge.svg) 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Mixed Reality Simulator

### Requirements

Please install node dependencies as follows:

```
npm install
```

### Environment Variables

Please copy the _sample.env_ file and rename into _.env_ and complete the configurations for http and mqtt

### Run the scripts

Development environment

```
npm run dev
```

Production environment

```
npm start
```

### Setup Staging environment

You need to install typescript as a global npm package in order to use the staging versions of pera-swarm typescript libraries.

```js
npm install -g typescript tcs
```

After that, you can use either one of following command line instructions to build the *./dist* folder

```
npm run dev:staging
npm run compile:staging
```

### Read More
- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [MQTT](https://github.com/mqttjs/MQTT.js)
- [Node Cron](https://github.com/merencia/node-cron)
