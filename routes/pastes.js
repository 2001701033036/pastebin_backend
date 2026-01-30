import express from "express";
import Paste from "../models/paste.js";

const router = express.Router();

// CREATE PASTE
router.post("/", async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ error: "Invalid content" });
  }

  const expiresAt = ttl_seconds
    ? new Date(Date.now() + ttl_seconds * 1000)
    : null;

  const paste = await Paste.create({
    content,
    expiresAt,
    remainingViews: max_views ?? null,
  });

  const baseUrl = process.env.BASE_URL || "http://localhost:5000";

  res.json({
    id: paste._id,
    url: `${baseUrl}/pastes/${paste._id}`,
  });
});

// GET PASTE
router.get("/:id", async (req, res) => {
  const paste = await Paste.findById(req.params.id);

  if (!paste) return res.status(404).json({ error: "Not found" });

  if (paste.remainingViews !== null) {
    if (paste.remainingViews <= 0) {
      return res.status(404).json({ error: "View limit exceeded" });
    }
    paste.remainingViews -= 1;
    await paste.save();
  }

  res.json({ content: paste.content });
});

export default router;
