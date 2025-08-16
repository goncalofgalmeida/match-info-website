import 'dotenv/config';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';

import indexRouter from './routes/indexRouter.js';
import matchRouter from './routes/matchRouter.js';

const app = express();

app.use(express.static(path.join(path.resolve(), 'public')));
app.use('/', indexRouter);
app.use('/api/matches', matchRouter);

const PORT = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log('Sucessfully connected to MongoDB!');

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
} catch (error) {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1);
}