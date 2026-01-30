import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./db.js";
import pasteRoutes from "./routes/pastes.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/pastes", pasteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
