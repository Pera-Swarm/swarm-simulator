class DistanceSensor {
    /**
     * DistanceSensor constructor
     * @param {number} id robot id
     * @param {number} value distance sensor reading
     */
    constructor(id, value) {
        this.id = id;
        if (value !== undefined) {
            this.value = value;
        } else {
            this.value = 0;
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
     * method for setting the distance sensor data
     * @param {number} value distance sensor value
     */
    setReading = (value) => {
        this.value = value;
        this.updated = new Date();
    };

    /**
     * method for setting the distance sensor data and get back the updated data
     * @param {number} value distance sensor value
     */
    syncReading = (value) => {
        this.value = value;
        this.updated = new Date();

        // TODO: did some process to sync the value with virtual robots
        // Currently just echo back the readings
        return value;
    };
}

module.exports = { DistanceSensor };
