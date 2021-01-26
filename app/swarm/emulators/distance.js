const { abs, round, cos, sin } = require('mathjs');
const {
    VirtualDistanceSensorEmulator,
    ArenaType,
    AbstractObstacleBuilder
} = require('../../../dist/pera-swarm');

/* ------------------------------------------------------
Arena coordinate system (top view)

P1   L4  P2
┍━━━┑
L3 ┃   ┃ L1
┕━━━┛
P3  L2  P4

Axises: ↑ Y, → X
------------------------------------------------------ */

class DistanceSensorEmulator extends VirtualDistanceSensorEmulator {
    _obstacleController;

    /**
     * DistanceSensorEmulator
     * @param {ArenaType} arena arena config
     * @param {Function} mqttPublish mqtt publish function
     * @param {AbstractObstacleBuilder | undefined} obstacleController (optional) obstacle controller
     */
    constructor(robots, arena, mqttPublish, obstacleController = undefined) {
        super(robots, arena, mqttPublish);
        this._obstacleController = obstacleController;
    }

    /*
     getReadings = (robot: VRobot, suffix: string, callback: Function) => {
        const { x, y, heading } = robot.coordinates;
        robot.updateHeartbeat();
        let dist = round(this._getBorderDistance(x, y, heading) * 10) / 10;
        this.publish(dist, suffix);
        // this.setReading(dist);
        if (callback != undefined) callback(dist);
    };

    viewReading = (robot: { getData: (arg0: string) => any } | undefined) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        const dist = robot.getData('distance');
        return dist != undefined ? dist : NaN;
    };
     */

    getReading = (robot, callback) => {
        const { x, y, heading } = robot.getCoordinates();
        robot.updateHeartbeat();
        console.log(x, y, heading);
        // let dist = round(this._getBorderDistance(x, y, heading) * 10); // return in mm
        let obstacleDist = this._obstacleController.getDistance(heading, x, y);
        // TODO: @NuwanJ
        // let robotDist = this._robots

        this.publish(`sensor/distance/${robot.id}`, dist);
        this.setReading(robot, dist);

        if (callback != undefined) callback(dist);
    };

    setReading = (robot, value) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        return robot.setData('distance', Number(value));
    };

    defaultSubscriptions = () => {
        return [
            {
                topic: 'sensor/distance',
                type: 'JSON',
                allowRetained: true,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // Robot sends its own distance sensor readings to the simulator,
                    // as reply to the ‘{channal}/sensor/distance/{robotID}/?’ request
                    console.log('MQTT.Sensor: sensor/distance', msg);

                    let robot = swarm.robots.findRobotById(msg.id);
                    if (robot != -1) {
                        swarm.robots.distanceSensor.getReading(robot, (dist) => {
                            console.log('MQTT:Sensor:Distance_Handler', dist);
                        });
                    } else {
                        // No robot found. Just echo the message, because this is a blocking call for the robot

                        console.log('MQTT_Sensor:Distance_Handler', 'Robot not found');
                        //console.log(swarm.robots.robotList);
                    }
                }
            }
        ];
    };
}

module.exports = { DistanceSensorEmulator };
