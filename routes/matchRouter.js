import express from "express";
import Match from "../models/Match.js";

const matchRouter = express.Router();

matchRouter.get('/:matchId', async (req, res) => {
  try {
    const { matchId } = req.params;

    const match = await Match.findOne({ matchId: matchId });
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.json(match);
  } catch (error) {
    console.error('Error fetching match:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default matchRouter;