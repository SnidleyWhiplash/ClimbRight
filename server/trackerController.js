const express = require("express");
const trackerEntry = require("./trackerEntryObject");

const router = express.Router();

router
    .get("/exercises", (req, res) => res.send(trackerEntry.exercises))
    .get("/myEntry", (req, res) => res.send(trackerEntry.myEntry))

module.exports.router = router;