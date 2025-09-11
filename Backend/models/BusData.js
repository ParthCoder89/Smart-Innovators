/*const mongoose = require("mongoose");

const busDataSchema = new mongoose.Schema({
  busNumber: String,
  latitude: Number,
  longitude: Number,
  seatStatus: {
    seat1: String,
    seat2: String,
    seat3: String,
  },
  timestamp: { type: Number, default: Date.now },
});

// 👇 third argument forces collection name to "busdatas"
module.exports = mongoose.model("BusData", busDataSchema, "busdatas");
*/


const mongoose = require("mongoose");

const busDataSchema = new mongoose.Schema({
  busNumber: String,
  latitude: Number,
  longitude: Number,
  seatStatus: {
    seat1: String,
    seat2: String,
    seat3: String,
  },
  timestamp: { type: Number, default: Date.now },
});

module.exports = mongoose.model("BusData", busDataSchema, "busdatas");