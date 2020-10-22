'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors({origin: "*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.json({ message: "Welcome to Swarm Backend" });
});

//app.use('/v1/controllers', apiControl);

exports.start = () => {
   const PORT = process.env.PORT || 8080;

   app.listen(PORT, () => {
      console.log(`HTTP Server is running on port ${PORT}.`);
   });
}

exports.app = app;
