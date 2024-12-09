const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
  },
});
const upload = multer({ storage });

router.get("/folders", (req, res) => {
  db.all("SELECT * FROM folders WHERE parent_id IS NULL", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get("/sub-directories/:folderId", (req, res) => {
  const { folderId } = req.params;
  db.all("SELECT * FROM files WHERE folder_id = ?", [folderId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create Folder API
router.post("/create-folder", (req, res) => {
  const { name, parent_id } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Folder name is required" });
  }

  const query = `
    INSERT INTO folders (name, parent_id)
    VALUES (?, ?)
  `;
  db.run(query, [name, parent_id || null], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, parent_id });
  });
});

// Upload File API
router.post("/upload-file", upload.single("file"), (req, res) => {
  const { folder_id } = req.body; // folder_id dikirimkan dari client
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const query = `INSERT INTO files (name, folder_id, path) VALUES (?, ?, ?)`;
  db.run(query, [file.filename, folder_id || null, file.path], function (err) {
    if (err) {
      console.error("Error uploading file:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res
      .status(201)
      .json({ id: this.lastID, filename: file.filename, folder_id });
  });
});

module.exports = router;
