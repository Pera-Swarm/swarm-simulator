class Id {
    constructor(id, timestamp) {
        this.id = id;
        if (timestamp) {
            this.timestamp = timestamp;
        } else {
            this.timestamp = Date.now();
        }
    }

    /**
     * method for getting id
     */
    getId = () => {
        return this.id;
    };

    /**
     * method for getting timestamp
     */
    getTimestamp = () => {
        return this.timestamp;
    };

    /**
     * method for getting id and timestamp
     */
    getIdTimestamp = () => {
        return {
            id: this.id,
            timestamp: this.timestamp
        };
    };
}

module.exports = Id;
