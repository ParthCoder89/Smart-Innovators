/*const express = require("express");
const BusData = require("../models/BusData");

const router = express.Router();

// Get latest data of a bus
router.get("/:busNumber", async (req, res) => {
  try {
    const data = await BusData.findOne({ busNumber: req.params.busNumber })
      .sort({ timestamp: -1 });
    res.json(data || { message: "No data found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all recent buses
router.get("/", async (req, res) => {
  try {
    const data = await BusData.find().sort({ timestamp: -1 }).limit(20);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
*/



const express = require("express");
const BusData = require("../models/BusData");

const router = express.Router();

router.get("/:busNumber", async (req, res) => {
  try {
    const data = await BusData.findOne({ busNumber: req.params.busNumber }).sort({ timestamp: -1 });
    res.json(data || { message: "No data found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await BusData.find().sort({ timestamp: -1 }).limit(20);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;