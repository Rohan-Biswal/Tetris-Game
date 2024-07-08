const sqlite3 = require('sqlite3').verbose();

function getGameData() {
  const db = new sqlite3.Database('tetris_game.db');

  db.serialize(() => {
    db.all('SELECT * FROM game_data', (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      rows.forEach((row) => {
        console.log(row);
      });
    });
  });

  db.close();
}

// Example usage
getGameData();
