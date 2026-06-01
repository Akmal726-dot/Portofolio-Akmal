const { Pool } = require('pg');

// =============================================
// KONFIGURASI DATABASE - UBAH SESUAI PGADMIN
// =============================================
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'pertofolio2',
  user: 'postgres',
  password: 'akmal12345', // Ganti dengan password PostgreSQL kamu
});

// Test koneksi
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Gagal koneksi ke PostgreSQL:', err.message);
    return;
  }
  console.log('✅ Berhasil terhubung ke PostgreSQL!');
  release();
});

// Inisialisasi tabel otomatis
const initDB = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      title VARCHAR(100),
      bio TEXT,
      email VARCHAR(100),
      phone VARCHAR(20),
      location VARCHAR(100),
      github VARCHAR(200),
      linkedin VARCHAR(200),
      avatar_url VARCHAR(300),
      created_at TIMESTAMP DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS skills (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      category VARCHAR(50),
      level INTEGER CHECK (level BETWEEN 1 AND 100),
      icon VARCHAR(10),
      created_at TIMESTAMP DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      description TEXT,
      tech_stack TEXT[],
      image_url VARCHAR(300),
      github_url VARCHAR(300),
      live_url VARCHAR(300),
      featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS experiences (
      id SERIAL PRIMARY KEY,
      company VARCHAR(100) NOT NULL,
      role VARCHAR(100) NOT NULL,
      period VARCHAR(50),
      description TEXT,
      current BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    )`
  ];

  for (const query of queries) {
    await pool.query(query);
  }

  // Seed data awal jika profile kosong
  const profileCheck = await pool.query('SELECT COUNT(*) FROM profiles');
  if (parseInt(profileCheck.rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO profiles (name, title, bio, email, phone, location, github, linkedin, avatar_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `, [
      'Nama Kamu',
      'Full Stack Developer',
      'Saya adalah seorang developer yang passionate dalam membangun aplikasi web modern dengan teknologi terkini. Saya suka belajar hal baru dan menciptakan solusi kreatif.',
      'email@example.com',
      '+62 812 3456 7890',
      'Jombang, East Java, Indonesia',
      'https://github.com/usernamekamu',
      'https://linkedin.com/in/usernamekamu',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio'
    ]);

    await pool.query(`
      INSERT INTO skills (name, category, level, icon) VALUES
      ('JavaScript', 'Frontend', 90, '⚡'),
      ('React.js', 'Frontend', 85, '⚛️'),
      ('Node.js', 'Backend', 80, '🟩'),
      ('Express.js', 'Backend', 80, '🚀'),
      ('PostgreSQL', 'Database', 75, '🐘'),
      ('HTML & CSS', 'Frontend', 95, '🎨'),
      ('Git & GitHub', 'Tools', 85, '🐙'),
      ('Tailwind CSS', 'Frontend', 80, '💨')
    `);

    await pool.query(`
      INSERT INTO projects (title, description, tech_stack, github_url, live_url, featured) VALUES
      ('E-Commerce Platform', 'Platform belanja online lengkap dengan fitur cart, payment gateway, dan dashboard admin.', ARRAY['React','Node.js','PostgreSQL','Midtrans'], 'https://github.com', 'https://example.com', true),
      ('Task Management App', 'Aplikasi manajemen tugas real-time dengan fitur kolaborasi tim dan notifikasi.', ARRAY['Vue.js','Express','Socket.io','MongoDB'], 'https://github.com', 'https://example.com', true),
      ('Portfolio Website', 'Website portofolio personal dengan backend dinamis dan desain modern.', ARRAY['Node.js','Express','PostgreSQL','Vanilla JS'], 'https://github.com', 'https://example.com', false)
    `);

    await pool.query(`
      INSERT INTO experiences (company, role, period, description, current) VALUES
      ('PT. Tech Indonesia', 'Full Stack Developer', '2023 - Sekarang', 'Mengembangkan aplikasi web skala enterprise menggunakan React dan Node.js. Memimpin tim 5 developer dalam proyek e-commerce.', true),
      ('Startup Digital', 'Frontend Developer', '2022 - 2023', 'Membangun UI/UX modern menggunakan Vue.js dan mengoptimasi performa website hingga 60% lebih cepat.', false),
      ('Freelance', 'Web Developer', '2020 - 2022', 'Mengerjakan berbagai proyek web untuk klien lokal dan internasional, mulai dari landing page hingga sistem manajemen.', false)
    `);

    console.log('✅ Data seed berhasil dimasukkan!');
  }

  console.log('✅ Semua tabel siap!');
};

initDB().catch(console.error);

module.exports = pool;
