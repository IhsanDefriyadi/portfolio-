# 🚀 Portfolio Website — Ihsan Defriyadi

Web portofolio modern, responsif, dan berperforma tinggi yang dibangun khusus untuk menampilkan kapabilitas sebagai **Full-Stack Web Developer & Data Specialist**. 

Dirancang dengan standar industri front-end modern: **Vanilla HTML5, CSS3 Glassmorphism, dan JavaScript modular**, sehingga **100% siap di-upload ke InfinityFree tanpa konfigurasi build tambahan**.

---

## 📁 Struktur Direktori Proyek

```text
Portofolio_Ihsan/
├── index.html                   # Halaman utama (Entry Point Web)
├── README.md                    # Dokumentasi & Panduan Deploy
└── assets/
    ├── css/
    │   └── style.css            # Design System, Glassmorphism, Theme Tokens
    ├── js/
    │   └── main.js              # Interaktivitas (Filter, Modal, Theme, Clipboard, Form)
    └── images/                  # Aset visual & showcase proyek
        ├── avatar.jpg           # Foto profil developer (AI High-Tech Portrait)
        ├── project-ivo.jpg      # Screenshot mockup IVO Reporting System
        ├── project-nlp.jpg      # Screenshot mockup Lexi-AI NLP Topic Modeling
        └── project-gesture.jpg  # Screenshot mockup Cyber Clash Gesture Game
```

---

## ✨ Fitur Utama Web

1. **Aesthetics & Glassmorphism Modern**:
   - Skema warna *dark mode* obsidian (`#060913`) dengan aksen neon cyan (`#00f2fe`) dan violet (`#8b5cf6`).
   - Efek frosted-glass (`backdrop-filter: blur(16px)`), kartu melayang, dan animasi ambient glow.
2. **Dual Theme Engine (Dark / Light)**:
   - Tombol toggle di navbar dengan penyimpanan preferensi di `localStorage`.
3. **Showcase Proyek Interaktif**:
   - Filter dinamis berdasarkan kategori (*All*, *Full-Stack & Laravel*, *Data Science & NLP*, *Interactive & Games*).
   - Modal pop-up detail proyek yang menampilkan ringkasan arsitektur, teknologi, dan tautan demo/repo.
4. **Hero & Stats Bar**:
   - Kartu profil tech avatar dengan animasi badge status aktif.
   - Counter animasi metrik (*15+ Projects Completed*, *99.8% System Uptime*, *3+ Years Experience*).
5. **Formulir Kontak & Quick Copy**:
   - Fitur 1-klik salin alamat email (`xouloss99@gmail.com`) ke clipboard dengan notifikasi *toast*.
   - Integrasi langsung ke WhatsApp dan auto-draft email.
6. **Mobile Responsive & SEO Optimized**:
   - Tampilan adaptif sempurna dari smartphone hingga monitor layar lebar.
   - Dilengkapi metadata SEO, OpenGraph tags, dan struktur semantik HTML5.

---

## 🌐 Live Website (GitHub Pages)

Web portofolio ini dapat diakses secara publik di:
👉 **[https://ihsandefriyadi.github.io/portfolio-/](https://ihsandefriyadi.github.io/portfolio-/)**

---

## 🌐 Cara Upload / Deploy ke Hosting (InfinityFree / Shared Hosting)

Web ini dibuat dengan arsitektur **Zero-Build Static Web**, yang berarti sangat mudah di-deploy ke shared hosting InfinityFree:

1. Buka dashboard InfinityFree kamu di: [dash.infinityfree.com](https://dash.infinityfree.com/accounts).
2. Klik tombol **Manage** pada akun hosting kamu (misalnya domain `gesture-game.freedev.app` atau buat subdomain baru khusus portofolio).
3. Buka **File Manager** (atau gunakan FTP FileZilla).
4. Masuk ke folder **`htdocs/`**.
5. Unggah seluruh file dan folder berikut langsung ke dalam `htdocs/`:
   - File `index.html`
   - Folder `assets/` (beserta seluruh subfolder `css/`, `js/`, dan `images/`)
6. Buka nama domain kamu di browser — **Web portofolio kamu langsung live seketika!** 🎉

---

## 💻 Menjalankan di Komputer Lokal

Jika ingin melihat atau mengedit di komputer lokal:
1. Cukup klik ganda file `index.html` untuk membuka langsung di browser, atau
2. Jalankan server lokal PHP di terminal:
   ```bash
   php -S 127.0.0.1:8080
   ```
   Lalu buka `http://127.0.0.1:8080` di browser.
