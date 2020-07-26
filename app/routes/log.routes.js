
const system_log = require("../controllers/log.controller.js");

var router = require("express").Router();

// Create
router.post("/", system_log.create);

// Select
router.get("/", system_log.findAll);
router.get("/:id", system_log.findOne);
router.get("/type/:type", system_log.findAllByType);

// router.put("/:id", system_log.update);
// router.delete("/:id", system_log.delete);
// router.delete("/", system_log.deleteAll);

module.exports = router;
