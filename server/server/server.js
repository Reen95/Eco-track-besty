import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

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

// Routes
app.get("/", (req, res) => res.send("EcoTrack API is running..."));

// Save data
app.post("/api/footprints", async (req, res) => {
  try {
    const data = new Footprint(req.body);
    await data.save();
    res.status(201).json({ message: "Saved successfully", data });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all records
app.get("/api/footprints", async (req, res) => {
  try {
    const items = await Footprint.find().sort({ date: -1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
