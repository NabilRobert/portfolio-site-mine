---
title: "Framed: halaman portofolio yang dapat dibuat siapa saja, tanpa kode"
summary: Platform portofolio. Siapa pun dapat memiliki alamat seperti framed.my.id/nama-anda dan menyusun halamannya dari blok-blok, menyuntingnya langsung di peramban, tanpa kode.
category: other
order: 9
status: live
stack: Vue 3 · TypeScript · Hono · Better Auth · SQLite / Cloudflare D1
coverAlt: "Sampul bertuliskan “Framed” di atas bingkai foto kuning yang memuat halaman kecil yang disusun dari blok: spanduk merah, gambar di samping baris teks, teks lagi, dan sebuah tombol, dengan pensil di sudutnya; keterangannya “framed.my.id/your-name”, dengan tulisan “Portfolios” di bagian bawah."
links:
  - { label: Repositori, href: "https://github.com/NabilRobert/author-website", primary: true }
  - { label: Situs langsung, href: "https://framed.my.id" }
screenshots:
  - src: landing.webp
    alt: "Halaman depan Framed: judul “Your work, framed.”, kalimat “Halaman portofolio yang Anda rancang sendiri, untuk penulis, desainer, arsitek, seniman, dan pembuat karya. Gratis.”, tombol “Make your page”, dan empat kartu: alamat sendiri, disusun dari blok, tampilkan karya Anda, dan buat sesuai gaya Anda."
    caption: "Pintu masuk"
    description: "Inilah yang dilihat pengunjung di framed.my.id. Janjinya ada pada judul dan kalimat di bawahnya: halaman portofolio yang dirancang sendiri, gratis, bagi siapa pun yang punya karya untuk ditampilkan. Keempat kartu meringkas gagasannya: alamat sendiri untuk dicantumkan di CV atau kartu nama, halaman yang disusun dari blok yang ditumpuk, karya yang disimpan sekali lalu ditampilkan di mana pun Anda mau, serta warna, huruf, dan pola latar pilihan Anda, dengan pratinjau langsung. “Make your page” mengarah ke pendaftaran, yang untuk saat ini hanya dengan undangan."
    terms:
      - { term: "Alamat", meaning: "Setiap halaman berada di framed.my.id/ diikuti nama yang dipilih pemiliknya, yang diperiksa terhadap aturan nama yang boleh dipakai." }
      - { term: "Blok", meaning: "Bagian-bagian penyusun halaman: spanduk, teks, gambar dan teks, daftar, kutipan, tombol, karya, berita, kontak, dan kit pers." }
      - { term: "Pratinjau langsung", meaning: "Penyunting menampilkan halaman seperti yang akan dilihat pengunjung selama Anda mengubahnya, sehingga tidak perlu kode atau langkah terbit terpisah untuk memeriksanya." }
---
Platform portofolio bagi siapa pun yang punya karya untuk ditampilkan: penulis, desainer, arsitek, seniman, dan pembuat karya. Setiap orang mendaftar, memilih alamat seperti `framed.my.id/nama-anda`, lalu menyusun halamannya dari blok-blok, menyuntingnya langsung di peramban dengan pratinjau langsung. Tidak ada kode sama sekali. Platform ini bermula sebagai situs untuk seorang penulis, lalu berkembang menjadi platform yang dapat dipakai siapa saja.

- **Blok penyusun:** spanduk, teks, gambar dan teks, daftar, kutipan, tombol, etalase karya (proyek, buku, bangunan, atau karya seni), berita, kontak, dan kit pers.
- **Tampilan sesuai gaya Anda:** tema untuk warna, huruf, dan latar, pola yang digambar dengan CSS, gaya kotak untuk setiap blok, dan pemotongan gambar. Unggahan gambar dan PDF sudah dibangun, tetapi untuk sementara dinonaktifkan.
- **Akun:** email dan kata sandi melalui Better Auth, dengan kode yang dikirim lewat email untuk memastikan alamat email dan mengatur ulang kata sandi yang terlupa. Pendaftaran untuk saat ini hanya dengan undangan.
- **Menjaga keamanan:** siapa pun dapat melaporkan halaman yang melanggar aturan, halaman seperti itu dapat disembunyikan dari publik, dan pengguna dapat menghapus akunnya, yang sekaligus menghapus situs dan gambarnya.
- **Diuji:** lebih dari 300 pengujian, dengan pengujian API dijalankan dua kali, pada D1 milik Cloudflare dan pada SQLite.
- **Tempat berjalan:** sudah dapat diakses di framed.my.id, sebagai satu proses Node dengan basis data SQLite di sebuah server kecil. Kode yang sama juga berjalan di paket gratis Cloudflare (Pages, fungsi Hono, D1, dan R2).
