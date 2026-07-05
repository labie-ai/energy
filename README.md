# Energy Mission: Selamatkan Kota dengan Energi Bijak

Game edukasi IPAS Kelas VI SD — HTML5, CSS3, Vanilla JavaScript (tanpa framework).

## Cara menjalankan
Buka `index.html` langsung di browser (Chrome/Edge/Firefox). Tidak perlu server maupun instalasi apa pun — 100% offline.

## Struktur folder
```
energy-mission/
├── index.html          → struktur & seluruh layar (menu, 5 misi, popup)
├── style.css            → seluruh gaya visual, animasi, dan responsive layout
├── script.js             → seluruh logika game (state, skor, XP, badge, sertifikat, dsb.)
├── data/
│   └── questions.js       → bank soal 5 misi + fungsi Fisher-Yates Shuffle
├── assets/
│   ├── images/            → ilustrasi SVG orisinal (logo, sumber energi, latar kota)
│   └── audio/              → (lihat catatan di bawah)
└── README.md
```

## Catatan penting tentang aset (mohon dibaca)
Proyek ini dibuat di lingkungan tanpa akses internet, sehingga dua hal disesuaikan dari permintaan awal:

1. **Gambar**: bukan diunduh dari Pixabay/Pexels/Wikimedia/dll, melainkan **ilustrasi SVG orisinal** yang dibuat khusus untuk proyek ini (bebas lisensi karena dibuat sendiri). File ada di `assets/images/`. Format SVG dipilih karena ringan, tajam di semua ukuran layar, dan mudah diedit ulang warnanya.
2. **Audio**: bukan file MP3 yang diunduh, melainkan **disintesis langsung di browser** memakai Web Audio API (lihat `SoundEngine` di `script.js`). Semua efek yang diminta (klik, benar, salah, reward, victory, gameover, countdown) serta musik latar menu/game tetap ada — hanya dibangkitkan lewat kode, bukan file `.mp3`/`.ogg`. Folder `assets/audio/` sengaja dikosongkan.

Jika Bapak/Ibu ingin mengganti aset ini dengan file asli dari Pixabay/Freesound dsb., tinggal:
- Simpan file audio ke `assets/audio/` lalu ganti pemanggilan `SoundEngine.xxx()` di `script.js` dengan `new Audio("assets/audio/xxx.mp3").play()`.
- Ganti file di `assets/images/` dengan nama yang sama (atau sesuaikan path di `index.html` / `script.js`).

## Bank soal saat ini
| Misi | Jenis | Jumlah soal tersedia |
|---|---|---|
| 1. Identifikasi Energi Fosil | Pilihan ganda | 20 soal |
| 2. Drag & Drop Pemanfaatan | Pasangan | 12 pasangan |
| 3. Studi Kasus | Pilihan ganda | 15 kasus |
| 4. Pilih Solusi Terbaik | Checkbox (multi-jawaban) | 15 kasus |
| 5. Escape Challenge (60 detik) | Benar/Salah cepat | 25 soal |

Setiap sesi bermain mengambil subset acak dari bank ini (memakai algoritma **Fisher-Yates Shuffle**, termasuk pengacakan urutan opsi jawaban). Untuk menambah soal, cukup tambahkan objek baru ke array terkait di `data/questions.js` — tidak perlu mengubah `script.js`.

## Fitur yang sudah diimplementasikan
- 8 menu: Beranda, Mulai, Materi, Pengaturan, Badge, Sertifikat, Skor, Tentang + tombol Keluar, dan tombol "Kembali ke Beranda" di semua layar dalam game.
- 5 misi sesuai spesifikasi (identifikasi, drag-and-drop, studi kasus, checkbox solusi, escape challenge dengan timer 60 detik).
- Sistem XP, level, skor, badge/achievement, progress bar, dan leaderboard — seluruhnya tersimpan di `localStorage` sehingga progres tidak hilang saat browser ditutup.
- Sertifikat otomatis (canvas) dengan nama pemain, skor, dan level — dapat diunduh sebagai **PNG** maupun **PDF** (PDF dibangun manual tanpa library eksternal karena proyek offline).
- Confetti/particle effect, popup hasil, tooltip toast, loading screen, fullscreen, pause/resume/restart.
- Latar animasi (awan, matahari, pepohonan, kendaraan, asap PLTU) sesuai tema kota & energi.
- Desain responsif untuk desktop, tablet, dan mobile; menghormati preferensi "reduced motion" pengguna.

## Mengganti font
Proyek menggunakan Google Fonts (`Baloo 2` untuk judul, `Nunito` untuk isi) via CDN di `index.html`. Jika perlu 100% offline tanpa koneksi apa pun saat font di-load pertama kali, unduh kedua font tersebut dan ganti tag `<link>` dengan `@font-face` lokal.
