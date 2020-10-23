class ColorSensor {
    constructor(id, value) {
        this.id = id;
        if (value !== undefined) {
            this.value = value;
        } else {
            this.value = [0, 0, 0];
        }
        this.updated = new Date();
    }

    /**
     * method for getting sensor readings
     */
    getReading = () => {
        return {
            id: this.id,
            value: this.value,
            updated: this.updated
        };
    };

    /**
     * method for setting the sensor data
     * @param {value} sensor_value
     */
    setReading = (value) => {
        this.value = value;
        this.updated = new Date();
    };
}

module.exports = { ColorSensor };
