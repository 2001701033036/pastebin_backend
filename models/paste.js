import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  expiresAt: { type: Date, default: null },
  remainingViews: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now }
});

const Paste = mongoose.model("Paste", pasteSchema);

export default Paste;   // 🔴 THIS IS IMPORTANT
