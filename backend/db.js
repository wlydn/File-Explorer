const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Path ke database
const DB_PATH = path.join(__dirname, "database.db");

// Membuka koneksi ke database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error connecting to SQLite:", err.message);
    process.exit(1); // Keluar jika koneksi gagal
  }
  console.log("Connected to SQLite database.");
});

module.exports = db;
