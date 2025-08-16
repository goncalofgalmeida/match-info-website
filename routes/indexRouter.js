import express from "express";
import path from "path";

const indexRouter = express.Router();

indexRouter.get('/matches/:matchId', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'public', 'match.html'));
});

export default indexRouter;