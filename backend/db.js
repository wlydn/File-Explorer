const sqlite3 = require('sqlite3').verbose();

// Membuka koneksi ke database SQLite
const db = new sqlite3.Database('./db/database.db', (err) => {
  if (err) {
    console.error("Error opening database: ", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

module.exports = db;