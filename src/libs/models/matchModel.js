const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({

  battingTeam: { type: String, default: null },
  bowlingTeam: { type: String, default: null },
  battingOrder: { type: [String], default: [] },
  bowlers: { type: [String], default: [] },
  currentBatsman: { type: String, default: null },
  currentBowler: { type: String, default: null },
  lastBowler: { type: String, default: null },
  tossWinner: { type: String, default: null },
  tossDecision: { type: String, default: null },
  team1: { type: String, default: null },
  team2: { type: String, default: null },
  
  // run: { type: Number, default: 0 },
  run: { type: mongoose.Schema.Types.Mixed, default: 0 },
  score: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  curOver: { type: Number, default: 0 },

  selectedBatsmen: { type: [String], default: [] },
  selectedOvers: { type: Number, default: null },
  
  switchTeamFlag: { type: Boolean, default: null },
  target: { type: Number, default: null },
  matchStarted: { type: Boolean, default: null },
  end: { type: Boolean, default: null },
  switchTeamDone: { type: Boolean, default: null },

  batsmen: [{
    name: { type: String, default: null },
    runs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },
    six: { type: Number, default: 0 },
    four: { type: Number, default: 0 },
    out: { type: String, default: null },
  }],
  bowlerArray: [{
    name: { type: String, default: null },
    balls: { type: Number, default: 0 },
    over: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wicket: { type: Number, default: 0 },
  }],
  overHistory: { type: [{ type: mongoose.Schema.Types.Mixed }], default: [] },
});

const Match =mongoose.models?.Match || mongoose.model('Match', matchSchema);

module.exports = Match;
