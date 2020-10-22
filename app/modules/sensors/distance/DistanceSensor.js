class DistanceSensor {
    constructor(id, value) {
        this.id = id;
        this.value = value;
    }

    /**
     * method for getting sensor readings
     */
    getReading = () => {
        return {
            id: this.id,
            value: this.value
        };
    };
}

module.exports = { DistanceSensor };
