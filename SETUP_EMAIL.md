
Memperbaiki fitur pengiriman email sehingga pesan dari formulir kontak dapat diterima di Gmail.

---

## 📋 STEP-BY-STEP SETUP

### **STEP 1️⃣ - Install Dependencies**

Di terminal, jalankan perintah:
```bash
npm install
```

Ini akan menginstall:
- `nodemailer` - untuk mengirim email
- `dotenv` - untuk membaca file `.env`

---

### **STEP 2️⃣ - Setup SMTP Provider**

Anda bisa menggunakan **Gmail SMTP** atau **Mailtrap** sebagai alternatif jika jaringan memblokir Gmail.

#### Opsi A: Gmail dengan App Password

1. **Buka akun Google Anda**
   - Pergi ke https://myaccount.google.com/

2. **Aktifkan 2-Step Verification (jika belum)**
   - Di sidebar kiri, klik "Security" (Keamanan)
   - Scroll ke bawah, cari "2-Step Verification"
   - Klik "Get Started" dan ikuti prosesnya

3. **Dapatkan App Password**
   - Kembali ke Security page
   - Scroll ke bawah, cari "App passwords"
   - Klik "App passwords" (hanya muncul jika 2FA sudah aktif)
   - Pilih dropdown: "Mail" dan "Windows Computer"
   - Google akan memberikan 16-karakter password
   - **COPY password ini**

#### Opsi B: Mailtrap (direkomendasikan untuk testing lokal)

1. Daftar akun gratis di https://mailtrap.io/
2. Buat inbox baru
3. Salin kredensial SMTP dari Mailtrap
4. Gunakan nilai berikut di file `.env`:
   - `EMAIL_HOST=smtp.mailtrap.io`
   - `EMAIL_PORT=2525`
   - `EMAIL_SECURE=false`
   - `EMAIL_USER=<username dari Mailtrap>`
   - `EMAIL_PASSWORD=<password dari Mailtrap>`
   - `EMAIL_FROM=jadidakmal0gmail.com`

---

### **STEP 3️⃣ - Buat File `.env`**

1. **Di folder project**, buat file bernama `.env` (hanya ".env", tanpa extension lain)

2. **Isi dengan contoh Gmail:**
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
RECIPIENT_EMAIL=your-email@gmail.com
```

3. **Atau isi dengan contoh Mailtrap:**
```
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_SECURE=false
EMAIL_USER=your-mailtrap-username
EMAIL_PASSWORD=your-mailtrap-password
EMAIL_FROM=your-email@example.com
RECIPIENT_EMAIL=your-email@example.com
```

**Keterangan:**
- `EMAIL_HOST` = SMTP server
- `EMAIL_PORT` = port SMTP (Gmail 587, Mailtrap 2525)
- `EMAIL_SECURE` = `false` untuk port 587/2525, `true` untuk 465
- `EMAIL_USER` = login SMTP
- `EMAIL_PASSWORD` = password SMTP atau App Password Gmail
- `EMAIL_FROM` = alamat pengirim yang muncul di email
- `RECIPIENT_EMAIL` = email tujuan untuk menerima pesan

---

### **STEP 4️⃣ - Update `.gitignore` (Jika Ada Repository)**

**PENTING:** Agar `.env` tidak ter-upload ke GitHub, tambahkan ke `.gitignore`:
```
.env
node_modules/
```

---

### **STEP 5️⃣ - Test Email**

1. **Start server:**
```bash
npm start
```

2. **Buka browser:**
```
http://localhost:3000
```

3. **Isi formulir kontak dan submit**
   - Nama: akmal
   - Email: jadidakmal0@gmail.com
   - Pesan: halo

4. **Cek inbox tujuan**
   - Jika menggunakan Mailtrap, cek inbox Mailtrap Anda
   - Jika menggunakan Gmail, cek inbox Gmail Anda

---

## 🔧 Fitur yang Sudah Diperbaiki

✅ **Email yang dikirim sekarang:**
1. **Pesan ke Penerima (Admin)**
   - Berisi nama, email, dan pesan dari formulir
   - Format email yang cantik dengan HTML
   - Subject: "Pesan Baru dari [nama]"

2. **Email Konfirmasi ke Pengirim**
   - Notifikasi bahwa pesan telah diterima
   - Menunjukkan bahwa Anda akan merespons

3. **Tetap Simpan ke Database**
   - Pesan juga tersimpan di database
   - Bisa dilihat di endpoint `/api/contacts`

---

## ⚠️ TROUBLESHOOTING

### ❌ Email tidak terkirim?

**Cek console server untuk error:**
```
❌ Email konfigurasi gagal: Invalid login
```

**Solusi:**
1. Pastikan 2FA sudah aktif (jika pakai Gmail)
2. Pastikan app password benar (bukan password biasa)
3. Pastikan email format benar di `.env`
4. Jika pakai Gmail dan tetap timeout, coba Mailtrap

### ❌ Error: "Cannot find module 'dotenv'"

**Solusi:**
```bash
npm install
```

### ❌ Email timeout?

**Solusi:**
- Ubah ke Mailtrap untuk testing lokal
- Cek firewall dan antivirus
- Coba jaringan lain (hotspot smartphone)

### ❌ Email masuk ke Spam?

**Solusi:**
- Gmail mungkin menganggap otomatis sebagai spam
- Klik "Not Spam" di Gmail untuk training filter
- Atau setup DKIM/SPF jika ingin production-ready

---

## 📝 File yang Dibuat/Diubah

Sudah dibuat:
- ✅ `email-config.js` - Konfigurasi Nodemailer
- ✅ `.env.example` - Template file .env
- ✅ `routes/api.js` - Updated dengan email sending

Harus dibuat Anda:
- 📝 `.env` - File config aktual (copykan dari .env.example dan isi nilai)

---

## 🚀 Selesai!

Setelah mengikuti semua step di atas, email Anda akan berhasil terkirim.

Jika masih ada kendala, cek:
1. SMTP provider sudah diisi benar?
2. File `.env` sudah dibuat?
3. `npm install` sudah dijalankan?
4. Coba Mailtrap jika Gmail timeout?

Happy sending! 📧✨

---

### **STEP 4️⃣ - Update `.gitignore` (Jika Ada Repository)**

**PENTING:** Agar `.env` tidak ter-upload ke GitHub, tambahkan ke `.gitignore`:
```
.env
node_modules/
```

---

### **STEP 5️⃣ - Test Email**

1. **Start server:**
```bash
npm start
```

2. **Buka browser:**
```
http://localhost:3000
```

3. **Isi formulir kontak dan submit**
   - Nama: akmal
   - Email: jadidakmal0@gmail.com
   - Pesan: halo

4. **Cek inbox Gmail**
   - Pesan Anda akan sampai di inbox
   - Ada 2 email:
     - Email dari formulir ke `RECIPIENT_EMAIL`
     - Email konfirmasi ke pengirim

---

## 🔧 Fitur yang Sudah Diperbaiki

✅ **Email yang dikirim sekarang:**
1. **Pesan ke Penerima (Admin)**
   - Berisi nama, email, dan pesan dari formulir
   - Format email yang cantik dengan HTML
   - Subject: "Pesan Baru dari [nama]"

2. **Email Konfirmasi ke Pengirim**
   - Notifikasi bahwa pesan telah diterima
   - Menunjukkan bahwa Anda akan merespons

3. **Tetap Simpan ke Database**
   - Pesan juga tersimpan di database
   - Bisa dilihat di endpoint `/api/contacts`

---

## ⚠️ TROUBLESHOOTING

### ❌ Email tidak terkirim?

**Cek console server untuk error:**
```
❌ Email konfigurasi gagal: Invalid login
```

**Solusi:**
1. Pastikan 2FA sudah aktif
2. Pastikan app password benar (bukan password biasa)
3. Pastikan email format benar di `.env`
4. Tunggu beberapa menit setelah membuat app password

### ❌ Error: "Cannot find module 'dotenv'"

**Solusi:**
```bash
npm install
```

### ❌ Email masuk ke Spam?

**Solusi:**
- Gmail mungkin menganggap otomatis sebagai spam
- Klik "Not Spam" di Gmail untuk training filter
- Atau setup DKIM/SPF jika ingin production-ready

---

## 📝 File yang Dibuat/Diubah

Sudah dibuat:
- ✅ `email-config.js` - Konfigurasi Nodemailer
- ✅ `.env.example` - Template file .env
- ✅ `routes/api.js` - Updated dengan email sending

Harus dibuat Anda:
- 📝 `.env` - File config aktual (copykan dari .env.example dan isi nilai)

---

## 🚀 Selesai!

Setelah mengikuti semua step di atas, email Anda akan berhasil terkirim ke Gmail! 

Jika masih ada kendala, cek:
1. 2FA Gmail sudah aktif?
2. App password sudah benar di `.env`?
3. File `.env` sudah dibuat?
4. `npm install` sudah dijalankan?

Happy sending! 📧✨
