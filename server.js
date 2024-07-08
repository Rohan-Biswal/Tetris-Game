const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('tetris_game.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS game_data (id INTEGER PRIMARY KEY, player_name TEXT, score INTEGER, level INTEGER)');
});

app.post('/saveGameData', (req, res) => {
  const { playerName, score, level } = req.body;
  const stmt = db.prepare('INSERT INTO game_data (player_name, score, level) VALUES (?, ?, ?)');
  stmt.run(playerName, score, level, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Failed to save game data');
    }
    res.send('Game data saved successfully');
  });
  stmt.finalize();
});

app.get('/maxScore', (req, res) => {
    db.get('SELECT MAX(score) AS max_score FROM game_data', (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Failed to retrieve maximum score');
      }
      res.json({ max_score: row.max_score });
    });
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
