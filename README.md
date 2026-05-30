# Website Cinta - Iqbaal & Silvi

Website ini dibuat khusus sebagai kenang-kenangan perjalanan cinta Iqbaal Nanda dan Silvi.

## Fitur Website
- **Desain Premium:** Menggunakan aesthetic *Glassmorphism* dengan warna gradasi romantis.
- **Counter Dinamis:** Menghitung waktu secara *real-time* (Tahun, Bulan, Hari, Jam, Menit, Detik) sejak tanggal jadian kalian (19 September 2024).
- **Profil Pasangan:** Menampilkan nama dan tanggal lahir masing-masing.
- **Galeri Kenangan:** Tempat untuk menaruh foto-foto memori. *(Saat ini menggunakan placeholder, kamu bisa menggantinya nanti).*
- **Animasi Interaktif:** Terdapat tombol rahasia di bagian bawah yang akan memunculkan efek taburan hati (floating hearts) jika ditekan.

## Cara Mengganti Foto (Galeri)
Untuk saat ini, bagian foto galeri dan foto profil menggunakan ikon (*placeholder*). Jika kamu ingin memasukkan foto asli kalian:
1. Masukkan foto-foto yang kamu inginkan ke dalam folder ini (misalnya `foto1.jpg`, `foto2.png`, dll). Disarankan untuk membuat folder khusus bernama `images` atau `assets`.
2. Buka file `index.html`.
3. Cari bagian `<div class="photo-placeholder">...</div>` di dalam kode HTML.
4. Ganti *placeholder* tersebut dengan tag gambar biasa, contohnya: `<img src="foto1.jpg" alt="Kencan Pertama" style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px;">`.

## Cara Hosting Gratis di GitHub Pages
Website ini dibuat menggunakan HTML, CSS, dan JavaScript murni (Vanilla), sehingga sangat mudah untuk di-hosting secara gratis selamanya menggunakan **GitHub Pages**.

Berikut adalah langkah-langkahnya:
1. Buat akun di [GitHub](https://github.com/) jika belum punya.
2. Login, lalu buat repository baru (klik ikon **+** di pojok kanan atas -> **New repository**).
3. Beri nama repository, misalnya `cinta-Silvi` atau nama sesukamu. Pastikan pengaturan privasinya diset ke **Public**.
4. Klik tombol **Create repository**.
5. Di halaman berikutnya, klik **uploading an existing file**.
6. Upload/drag-and-drop semua file dari folder `cinta` ini (`index.html`, `style.css`, `script.js`, dan file gambar jika ada) ke repository tersebut.
7. Setelah proses upload selesai, klik tombol **Commit changes**.
8. Sekarang pergi ke tab **Settings** di repository tersebut.
9. Di menu sebelah kiri, klik bagian **Pages**.
10. Di bagian *Build and deployment*, pada opsi *Source*, pilih branch **main** (atau **master**) dan biarkan foldernya `/ (root)`. Lalu klik **Save**.
11. Tunggu 1-2 menit. Refresh halaman tersebut, dan akan muncul link website kamu di bagian atas (misalnya `https://namakamu.github.io/cinta-shakilla`).

Selesai! Kamu bisa membagikan link tersebut ke pacar kamu.
 