const sqlite3 = require('sqlite3').verbose();

// Membuka koneksi ke database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Membuat tabel dan data awal
db.serialize(() => {
  // Tabel folders untuk struktur folder
  db.run(`
    CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      parent_id INTEGER,
      FOREIGN KEY (parent_id) REFERENCES folders (id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating folders table:', err.message);
    } else {
      console.log('Folders table created or already exists.');
    }
  });

  // Tabel files untuk menyimpan metadata file yang diupload
  db.run(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      folder_id INTEGER,
      path TEXT NOT NULL,
      FOREIGN KEY (folder_id) REFERENCES folders (id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating files table:', err.message);
    } else {
      console.log('Files table created or already exists.');
    }
  });

  // Menambahkan data awal ke tabel folders
  const insertFolders = db.prepare(`
    INSERT INTO folders (name, parent_id)
    VALUES (?, ?)
  `);

  insertFolders.run('Documents', null);
  insertFolders.run('Downloads', null);
  insertFolders.run('Images', 1); // Sub-folder dari Documents
  insertFolders.run('Videos', 1); // Sub-folder dari Documents
  insertFolders.run('Music', null);

  insertFolders.finalize((err) => {
    if (err) {
      console.error('Error inserting initial data into folders:', err.message);
    } else {
      console.log('Initial data added to folders.');
    }
  });
});

// Menutup koneksi setelah selesai
db.close((err) => {
  if (err) {
    console.error('Error closing database connection:', err.message);
  } else {
    console.log('Database setup completed.');
  }
});