const express = require("express");
const http = require("http");
const cors = require("cors");
const WebSocket = require("ws");
const connectDB = require("./config/db");
const busRoutes = require("./routes/busRoutes");
const authRoutes = require("./routes/authRoutes");
const BusData = require("./models/BusData");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/busdata", busRoutes);
app.use("/api/auth", authRoutes);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("📡 ESP32/Client connected via WebSocket");

  ws.on("message", async (message) => {
    try {
      console.log("📥 Incoming raw message:", message.toString());

      const data = JSON.parse(message.toString());

      const busData = new BusData({
        busNumber: data.busNumber || "Unknown",
        latitude: data.latitude,
        longitude: data.longitude,
        seatStatus: data.seatStatus || {},
        timestamp: data.timestamp || Date.now(),
      });

      await busData.save();
      console.log("✅ Data saved to DB:", busData);

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(busData));
        }
      });
    } catch (err) {
      console.error("❌ Invalid data received:", err.message);
    }
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));