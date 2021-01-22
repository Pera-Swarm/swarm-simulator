# FYP-swarm-robotics

![Node.js CI](https://github.com/Pera-Swarm/e15-fyp-swarm-server/workflows/Node.js%20CI/badge.svg)

Repository for Web UI / Central Server / Virtual nodes of Swarm Robots

### Requirements

Please install node dependencies as follows:

```
npm install
```

### Environment Variables

Please copy the _sample.env_ file and rename into _.env_ and complete the configurations for http, mysql and mqtt

### Database

Start a MySQL database server with a database named 'swarm-robotics'.

### Run the scripts

Development environment [TBD]

```
npm run dev
```

Production environment [TBD]

```
npm start
```

### Setup Staging environment

You need to install typescript as a global npm package in order to use the staging versions of pera-swarm typescript libraries.

```js
npm install -g typescript
```

After that, you can use either one of following command line instructions to build the *./dist* folder

```
npm run dev:staging
npm run compile:staging
```

### Read More
- [Sequelize](https://sequelize.org/master/index.html)
- [Express](https://expressjs.com/)
- [NodeJS](https://nodejs.org/)
- [MQTT](https://github.com/mqttjs/MQTT.js)
- [Cron](https://github.com/merencia/node-cron)
- [React](https://reactjs.org/)
