---
title: "Juku: tim agen yang membimbing pelajar bahasa Jepang"
summary: Platform belajar yang sedang dalam tahap perencanaan untuk orang dewasa Indonesia yang mempersiapkan JLPT, dijalankan oleh tim kecil agen AI di atas tumpukan MCP milik portofolio ini.
category: portfolio
order: 6
draft: true
status: wip
stack: Python · FastAPI · Postgres · MCP
coverAlt: "Ilustrasi empat kartu nama, masing-masing dengan kanji besar dan sebuah nama (栞 Shiori, dengan pita pembatas buku berwarna merah; 稽 Keiko; 日 Nikki; 正 Tadashi), di bawah kata “Juku”, dengan keterangan “JLPT N5 → N2” dan kata “Agents” di bagian bawah."
links:
  - { label: Repositori, href: "https://github.com/NabilRobert/juku-agents", primary: true }
---

Platform belajar yang sedang dalam tahap perencanaan, untuk orang dewasa Indonesia yang mempersiapkan Ujian Kemampuan Bahasa Jepang (JLPT), dari level N5 hingga N2. *Juku* (塾) adalah kata dalam bahasa Jepang untuk bimbingan belajar, tempat para pengajar membimbing siswa menuju ujian; di sini, pengajarnya adalah tim kecil agen AI, yang masing-masing diberi nama yang berkaitan dengan tugasnya.

Platform ini mengikuti pola Pitstop, kali ini untuk belajar bahasa Jepang: kode menghitung kemajuan setiap pelajar, tim kecil agen menyusun rencana mingguan dan menulis laporan dalam bahasa Indonesia, dan agen pengkritik memeriksa setiap angka dan kata terhadap datanya sebelum kode memutuskan apakah hasilnya disetujui.

- **Para anggota tim:**
  - **Shiori** (栞, pembatas buku: menandai sampai di mana Anda belajar): pemimpin tim, sekaligus penjaga ingatan tentang setiap pelajar.
  - **Keiko** (稽古, latihan): menyusun rencana setiap minggu.
  - **Nikki** (日記, buku harian): menulis laporan mingguan.
  - **Tadashi** (正しい, benar): agen pengkritik.
- **Ingatan yang dapat dilihat pelajar:** apa yang diingat Shiori tentang setiap pelajar tersusun rapi dan didukung bukti, serta dapat dilihat dan dihapus oleh pelajar itu sendiri.
- **Dibangun di atas proyek lain dalam portofolio ini:** seluruh pengetahuan bahasa Jepang berasal dari kamus terbuka (JMdict, KANJIDIC2, Tatoeba), yang hanya diakses melalui alat MCP dari MCP-backbone, di balik gateway keamanan MCP. Harness evaluasi mengukur mutunya, dan agent-observability melacak setiap permintaan.
- **Diperiksa sejak awal:** evaluasi ditulis sebelum agennya, dan setiap batasan pengaman berupa kode yang memiliki pengujiannya sendiri.
- **Status:** masih dalam tahap perencanaan, belum ada kode. Ini akan menjadi proyek pertama dalam portofolio ini yang memiliki pengguna sungguhan: sebuah kelompok belajar pelajar Indonesia.
