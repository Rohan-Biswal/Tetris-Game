const sqlite3 = require('sqlite3').verbose();

function saveGameData(playerName, score, level) {
  const db = new sqlite3.Database('tetris_game.db');

  db.serialize(() => {
    const stmt = db.prepare('INSERT INTO game_data (player_name, score, level) VALUES (?, ?, ?)');
    stmt.run(playerName, score, level, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('A new game data has been inserted');
    });
    stmt.finalize();
  });

  db.close();
}

// Example usage
saveGameData('Alice', 1500, 5);
