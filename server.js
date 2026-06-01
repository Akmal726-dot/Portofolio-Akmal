const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// ─── MIDDLEWARE ─────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── STATIC FRONTEND ────────────────────────────────
// index.html berada di root project (selevel dengan server.js)
app.use(express.static(__dirname));


// ─── API ROUTES ─────────────────────────────────────
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// ─── FALLBACK KE FRONTEND ───────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// ─── START SERVER ───────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📡 API tersedia di http://localhost:${PORT}/api\n`);
});
