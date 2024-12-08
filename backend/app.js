const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const folderRoutes = require('./routes/folders');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/api', folderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});