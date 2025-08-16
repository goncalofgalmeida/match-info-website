import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  confirmed: { type: Boolean, default: false }
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  kitColor: { type: String },
  players: [playerSchema]
});

const matchSchema = new mongoose.Schema({
  matchId: { type: String, required: true, unique: true, index: true },
  matchTitle: { type: String, required: true },
  date: { type: Date },
  location: {
    name: { type: String },
    mapsUrl: { mapsUrl: String }
  },
  playersPerTeam: { type: Number },
  pricePerPlayer: { type: Number },
  teamA: teamSchema,
  teamB: teamSchema
});

const Match = mongoose.model('Match', matchSchema);

export default Match;