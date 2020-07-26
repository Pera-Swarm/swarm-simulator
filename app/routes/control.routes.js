
const controller = require("../controllers/control.controller.js");
var router = require("express").Router();

// Create
router.post("/", controller.createLog);

// Select
router.get("/", controller.findAllLogs);
router.get("/:id", controller.findOneLog);

router.get("/device/:deviceId", controller.findById);

// Update via MQTT
router.post("/mqtt/", controller.mqtt);


// router.put("/:id", controller.update);
// router.delete("/:id", controller.delete);
// router.delete("/", controller.deleteAll);

module.exports = router;
