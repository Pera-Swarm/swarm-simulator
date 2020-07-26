
const process = require("../services/process.js");
const db = require("../services/database.js");

const SystemLog = db.log;
const Op = db.Sequelize.Op;

// -----------------------------------------------------------------------------
// Creates  a new SystemLog
// -----------------------------------------------------------------------------
exports.create = (req, res) => {

   const systemlog = {
      type: req.body.type,
      priority: req.body.priority,
      message: req.body.message
   };
   SystemLog.create(systemlog)

   .then(data => {
      res.send(data);
   })
   .catch(err => {
      res.status(500).send({
         message:
         err.message || "Some error occurred while creating the System Log."
      });
   });
};

// -----------------------------------------------------------------------------
// Retrieve all SystemLogs on the database.
// -----------------------------------------------------------------------------
exports.findAll = (req, res) => {
   const id = req.query.id;
   var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

   SystemLog.findAll({ where: condition })
   .then(data => {
      res.send(data);
   })
   .catch(err => {
      res.status(500).send({
         message: err.message || "Some error occurred while retrieving data."
      });
   });

};

// -----------------------------------------------------------------------------
// Retrieve all Sensors logs from the database.
// -----------------------------------------------------------------------------
exports.findAllByType = (req, res) => {
   const type = req.params.type;
   var condition = type ? { type: { [Op.like]: `${type}%` } } : null;

   SystemLog.findAll({ where: condition })
   .then(data => {
      res.send(data);
   })
   .catch(err => {
      res.status(500).send({
         message:
         err.message || "Some error occurred while retrieving data."
      });
   });
};

// -----------------------------------------------------------------------------
// Find a single SystemLog entry using the id
// -----------------------------------------------------------------------------
exports.findOne = (req, res) => {
   const id = req.params.id;

   SystemLog.findByPk(id)
   .then(data => {
      res.send(data);
   })
   .catch(err => {
      res.status(500).send({
         message: "Error retrieving SystemLog with id=" + id
      });
   });

};

// Delete a System Log with the specified id in the request
/*
exports.delete = (req, res) => {
   const id = req.params.id;

   SystemLog.destroy({
      where: { id: id }
   })
   .then(num => {
      if (num == 1) {
         res.send({
            message: "System Log was deleted successfully!"
         });
      } else {
         res.send({
            message: `Cannot delete System Log with id=${id}. Maybe System Log was not found!`
         });
      }
   })
   .catch(err => {
      res.status(500).send({
         message: "Could not delete System Log with id=" + id
      });
   });
};
*/


// Delete all System Logs from the database.
/*
exports.deleteAll = (req, res) => {
   SystemLog.destroy({
      where: {},
      truncate: false
   })
   .then(nums => {
      res.send({ message: `${nums} System Logs were deleted successfully!` });
   })
   .catch(err => {
      res.status(500).send({
         message:
         err.message || "Some error occurred while removing all System Logs."
      });
   });
};
*/
