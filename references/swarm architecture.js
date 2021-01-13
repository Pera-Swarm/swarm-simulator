/*
NOTE: This is not according to any specific schema. Just only for pitorical view of the whole architecture.
*/

swarm(setup){
    // configurations
    mqttConfig
    arenaConfig

    // objects
    mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.options);

    // @luk3Sky
    cron.begin(interval, callback)
    cron.secondsInterval(freq)
    cron.minutesInterval(freq)

    // SimpleLocalizationSystem // deprecated

    robots(this){
        // configurations
        arenaConfig

        // objects
        robotList = {}

        DistanceSensor(arenaConfig, mqttClient, isObstacleThere, this.obstadistanceCheck){
            // module isn't finalized
	        +getReading(robot, callback)
	        +setReading(robot, value)
	        +viewReading(robot)
            +defaultSubscriptions()

	        _normalizedAngle(a)
	        _getBorderDistance(x, y, heading)  		// deprecated
	        _getLineDistance(x, y, heading, line)  	// deprecated
        }

        SimpleCommunication(this,mqttClient,maxDistance,debug){
            +broadcast(robotId, message, callback)
            +defaultSubscriptions()

            _normalizeAngle(a)
            _distanceCheck(dist)

        }

        DirectedCommunication(this,mqttClient,maxDistance,angleThreshold,debug){
            +broadcast(robotId, message, callback)
            +defaultSubscriptions()

            _angleCheck(heading, angle)
            _normalizeAngle(a)
            _distanceCheck(dist)
        }

        // methods
        +robotBuilder(id, heading, x, y)
        +addRobot(id, heading, x, y, z)
        +removeRobot(id, callback)
        +getSize()
        +createIfNotExists(id, callback)
        +isExistsRobot(id)
        +isAliveRobot(id, interval)
        +findRobotById(id)
        +getCoordinatesById(id)
        +getCoordinateStringById(id)
        +getCoordinatesAll()
        +updateCoordinates(coordinates)
        +prune(interval, callback)
        +broadcast(instType, value, options)
        +changeMode(mode, options)

        initRobots()
    }


    // objects
    Queue(mqttConnection, options){
        // methods
        begin()
        add(topic, data)
        remove(topic)
        findByTopic(topic)
    }

    mqttRouter(mqttConnection, wrapper(routes), mqttConfig, setup, onError){

    	// object
    	-_publishQueue(mqttConnection, mqttConfig)

        +start()
        +addRoute(route)
        +removeRoute(topic)

        +discard(topic, message)
        +pushToPublishQueue(topic, data)

        _publish(message)
        _routineCheck()

        _handleRouteSubscriptions()
        _callHandler(topic, message, route)
        _callFallback(topic, message, route)

        // topics.ts
        +subscribeToTopic(mqttConnection, topic, options)
        +publishToTopic(mqttConnection, topic, message, options, callback)

        // helper.ts
        +wrapper(routes, property)
        +secondsInterval(interval)
        +minutesInterval(interval)
    }

    obstacleController(arenaConfig){

    	obstacleList=[]

        obstacleBuilder(arenaConfig){
            +createWall(width,height,orientation,originX,originY,depth,debug)
            +createCylinder(radius,height,originX,originY,debug )
            +changeMaterial(obstacle,materialType)
        }

        // Need to add following
        +defaultSubscriptions()

        +findObstacleById(id: string)
        +findObstaclesByType(type: string)
        +isObstacleThere(heading: number, x: number, y: number)
        +getDistance(heading: number, x: number, y: number)
        +removeObstacleById(id: string)
        +setMaterialById(id: string, materialType: string)
        +setColorById(id: string, color: string)
        +visualizeObstacles()
    }

    // methods
    +prune()
    +broadcastCheckALive()
    +mqttPublish(topic, message, options = mqttConfig.mqttOptions, callback)  // deprecated

}
