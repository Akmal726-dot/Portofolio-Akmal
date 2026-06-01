# 🚀 Portfolio Website — Full Stack

Web portofolio profesional dengan backend Node.js + Express dan database PostgreSQL (pgAdmin).

---

## 📁 Struktur Folder

```
portfolio/
├── backend/
│   ├── db/
│   │   └── database.js       ← Koneksi & inisialisasi PostgreSQL
│   ├── routes/
│   │   └── api.js            ← Semua endpoint API
│   ├── server.js             ← Entry point Express
│   └── package.json
│
├── frontend/
│   ├── css/
│   │   └── style.css         ← Semua styling + animasi
│   ├── js/
│   │   └── main.js           ← Logic & API calls
│   └── index.html            ← Halaman utama
│
└── README.md
```

---

## ⚙️ Persiapan Database (pgAdmin)

### 1. Buka pgAdmin, buat database baru:
- Klik kanan pada **Databases** → **Create** → **Database**
- Nama: `portfolio_db`
- Klik **Save**

### 2. Edit konfigurasi di `backend/db/database.js`:
```js
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'portfolio_db',
  user: 'postgres',           // ← Sesuaikan username PostgreSQL kamu
  password: 'password123',    // ← Ganti dengan password kamu
});
```

> ✅ **Tidak perlu buat tabel manual!** Semua tabel & data awal dibuat otomatis saat server pertama kali dijalankan.

---

## 🚀 Cara Menjalankan

### 1. Install dependencies:
```bash
cd portfolio/backend
npm install
```

### 2. Jalankan server:
```bash
npm start
# atau untuk development:
npm run dev
```

### 3. Buka browser:
```
http://localhost:3000
```

---

## 🌐 API Endpoints

| Method | Endpoint            | Fungsi                    |
|--------|---------------------|---------------------------|
| GET    | /api/profile        | Ambil data profil         |
| PUT    | /api/profile        | Update profil             |
| GET    | /api/skills         | Daftar skills             |
| POST   | /api/skills         | Tambah skill              |
| DELETE | /api/skills/:id     | Hapus skill               |
| GET    | /api/projects       | Daftar projects           |
| POST   | /api/projects       | Tambah project            |
| DELETE | /api/projects/:id   | Hapus project             |
| GET    | /api/experiences    | Daftar pengalaman kerja   |
| POST   | /api/experiences    | Tambah pengalaman         |
| POST   | /api/contact        | Kirim pesan kontak        |
| GET    | /api/contacts       | Lihat semua pesan masuk   |

---

## ✏️ Kustomisasi Data

Edit data profil langsung lewat API (gunakan tools seperti Postman atau Insomnia):

```bash
# Update profil:
PUT http://localhost:3000/api/profile
Content-Type: application/json

{
  "name": "Nama Kamu",
  "title": "Full Stack Developer",
  "bio": "Deskripsi tentang kamu...",
  "email": "email@kamu.com",
  "phone": "+62 812 xxxx xxxx",
  "location": "Jombang, East Java",
  "github": "https://github.com/username",
  "linkedin": "https://linkedin.com/in/username",
  "avatar_url": "https://link-foto-kamu.com/foto.jpg"
}
```

---

## 🎨 Fitur Desain

- ✅ Dark luxury aesthetic dengan aksen emas
- ✅ Custom cursor dengan animasi
- ✅ Grid background + noise overlay
- ✅ Scroll reveal animations
- ✅ Floating avatar dengan rotating ring
- ✅ Animated skill progress bars
- ✅ Hero dengan loading screen
- ✅ Counter animasi statistik
- ✅ Timeline pengalaman kerja
- ✅ Form kontak terhubung ke database
- ✅ Responsive mobile-friendly

---

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (via pgAdmin)
- **Driver**: node-postgres (pg)
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Font**: Cormorant Garamond + DM Sans + Space Mono
