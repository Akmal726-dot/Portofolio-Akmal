const express = require('express');
const router = express.Router();
const db = require('../db/database');

// ─── PROFILE ───────────────────────────────────────
router.get('/profile', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM profiles LIMIT 1');
    res.json({ success: true, data: result.rows[0] || {} });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/profile', async (req, res) => {
  const { name, title, bio, email, phone, location, github, linkedin, avatar_url } = req.body;
  try {
    const check = await db.query('SELECT id FROM profiles LIMIT 1');
    let result;
    if (check.rows.length === 0) {
      result = await db.query(
        `INSERT INTO profiles (name,title,bio,email,phone,location,github,linkedin,avatar_url)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
        [name, title, bio, email, phone, location, github, linkedin, avatar_url]
      );
    } else {
      result = await db.query(
        `UPDATE profiles SET name=$1,title=$2,bio=$3,email=$4,phone=$5,location=$6,github=$7,linkedin=$8,avatar_url=$9
         WHERE id=$10 RETURNING *`,
        [name, title, bio, email, phone, location, github, linkedin, avatar_url, check.rows[0].id]
      );
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── SKILLS ────────────────────────────────────────
router.get('/skills', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM skills ORDER BY level DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/skills', async (req, res) => {
  const { name, category, level, icon } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO skills (name, category, level, icon) VALUES ($1,$2,$3,$4) RETURNING *',
      [name, category, level, icon]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/skills/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM skills WHERE id=$1', [req.params.id]);
    res.json({ success: true, message: 'Skill dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── PROJECTS ──────────────────────────────────────
router.get('/projects', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM projects ORDER BY featured DESC, created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/projects', async (req, res) => {
  const { title, description, tech_stack, image_url, github_url, live_url, featured } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO projects (title,description,tech_stack,image_url,github_url,live_url,featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [title, description, tech_stack, image_url, github_url, live_url, featured || false]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM projects WHERE id=$1', [req.params.id]);
    res.json({ success: true, message: 'Project dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── EXPERIENCES ────────────────────────────────────
router.get('/experiences', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM experiences ORDER BY current DESC, created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/experiences', async (req, res) => {
  const { company, role, period, description, current } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO experiences (company,role,period,description,current) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [company, role, period, description, current || false]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── CONTACT ────────────────────────────────────────
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
  }
  try {
    const result = await db.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1,$2,$3) RETURNING *',
      [name, email, message]
    );
    res.json({ success: true, message: 'Pesan berhasil dikirim!', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/contacts', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
