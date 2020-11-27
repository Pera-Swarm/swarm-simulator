const { abs, sec } = require('mathjs');

class DistanceSensor {

    constructor(swarm) {
        this.arena = swarm.arena;
        this.publish = swarm.mqttPublish;
    }

    getReading = (robot, callback)=>{
        const {x,y, heading} = robot.getCoordinates();

        console.log(x,y,heading);
        var dist = this.getBorderDistance(x,y,heading);

        this.publish(`v1/sensor/distance/${robot.id}`, dist);
        if(callback!=undefined) callback(dist);
    }

    normalizedAngle = (a)=>{
        let b = (a + 180) % 360;
        if (b <= 0) b += 360;
        b = b - 180;
        return b;
    }

    compAngle = (a, b, c)=>{
        return (a<b && b<= c);
    }

    getBorderDistance = (x, y, heading)=>{
        //console.log( this.arena);
        
        const {xMin,xMax,yMin,yMax} = this.arena;
        var heading = this.normalizedAngle(heading);

        var p1 = {x: xMax,y: yMin}; // upper left
        var p2 = {x: xMax,y: yMax}; // upper right
        var p3 = {x: xMin,y: yMin}; // lower left
        var p4 = {x: xMin,y: yMax}; // lower right

        // x and y interchanged due to coordinate system transform ???
        var angle1 = -1*Math.atan2(p1.y - y, p1.x - x) * 180 / Math.PI;
        var angle2 = -1*Math.atan2(p2.y - y, p2.x - x) * 180 / Math.PI;
        var angle3 = -1*Math.atan2(p3.y - y, p3.x - x) * 180 / Math.PI;
        var angle4 = -1*Math.atan2(p4.y - y, p4.x - x) * 180 / Math.PI;

        //console.log('Heading', heading);
        //console.log('Ang:',angle1, angle2, angle3, angle4);

        if(heading >=0){
            // Positive angles, Counter Clockwise

            if(heading <= angle1){
                return this.getLineDistance(x,y,heading, 1);
            }else if(heading <= angle3){
                return this.getLineDistance(x,y,heading, 4);
            }else{
                return this.getLineDistance(x,y,heading, 3);
            }

        }else{
            // Minus angles, Clockwise

            if(heading>=angle2){
                return this.getLineDistance(x,y,heading, 1);
            }else if(heading>=angle4){
                return this.getLineDistance(x,y,heading, 2);
            }else{
                return this.getLineDistance(x,y,heading, 3);
            }
        }

        return 0;
    }

    getLineDistance = (x, y, heading, line)=>{
        const {xMin,xMax,yMin,yMax} = this.arena;

        if (line == 1) return  (abs(x - xMax)) * sec(heading);
        else if (line == 2) return (abs(y - yMin)) * sec(heading);
        else if (line == 3) return (abs(x - xMin)) * sec(heading);
        else if (line == 4)return (abs(y - yMax)) * sec(heading);

        return NaN;
    }

}
module.exports = { DistanceSensor };
