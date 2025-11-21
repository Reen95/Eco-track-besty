// server/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Schema + Model
const FootprintSchema = new mongoose.Schema({
  transport: Number,
  electricity: Number,
  diet: Number,
  total: Number,
  date: { type: Date, default: Date.now },
});

const Footprint = mongoose.model("Footprint", FootprintSchema);

// API Routes
app.get("/", (req, res) => res.send("EcoTrack API is running..."));

app.post("/api/footprints", async (req, res) => {
  try {
    const data = new Footprint(req.body);
    await data.save();
    res.status(201).json({ message: "Saved successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/footprints", async (req, res) => {
  try {
    const items = await Footprint.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Serve client when built
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.join(__dirname, "../client/dist");

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  // Serve index.html for any other route (client-side routing)
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  console.log("⚠️ client/dist not found — make sure you build the client before starting in production.");
}

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
