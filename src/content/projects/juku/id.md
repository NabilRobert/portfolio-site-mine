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
screenshots:
  - src: stack.svg
    alt: "Diagram arsitektur yang direncanakan. Ponsel pelajar menampilkan halaman web ringan dari aplikasi Juku (Python dan FastAPI), yang memuat Shiori, untuk obrolan, dan laporan mingguan oleh Keiko, Nikki, dan Tadashi, serta memanggil model AI melalui satu penyedia. Setiap pemanggilan alat melewati mcp-security-gateway, menuju MCP-backbone, yang membaca kamus, atau server MCP milik Juku, yang membaca kemajuan dan ingatan satu pelajar, serta kamus. Semuanya dilacak oleh agent-observability dan diukur oleh agent-eval-harness."
    caption: "Susunan Juku secara keseluruhan"
    description: "Masih berupa rencana, belum dibangun. Pelajar menggunakan Juku dari ponsel, melalui halaman web ringan yang disajikan oleh aplikasi Python kecil. Di dalam aplikasi terdapat dua jenis pekerjaan agen: Shiori, yang menjawab pertanyaan dalam obrolan, dan laporan mingguan yang ditulis oleh Keiko, Nikki, dan Tadashi. Setiap kali agen membutuhkan fakta, agen memanggil sebuah alat, dan setiap pemanggilan alat melewati gateway keamanan, tempat setiap agen memiliki kuncinya sendiri dan daftar alat yang diizinkan untuknya. Di balik gateway terdapat dua server. MCP-backbone menjawab pertanyaan dari kamus terbuka. Server milik Juku menyimpan kemajuan dan ingatan setiap pelajar, dan dirancang agar satu sesi hanya dapat melihat satu pelajar: tidak ada satu alat pun yang menerima ID pelajar. Keduanya baca-saja. Penelusuran dan pengukuran mutunya disediakan oleh proyek lain dalam portofolio ini."
    terms:
      - { term: "Server MCP", meaning: "Layanan yang menyediakan alat bagi agen AI melalui Model Context Protocol, sebuah standar terbuka." }
      - { term: "mcp-security-gateway", meaning: "Gateway milik portofolio ini: memeriksa kunci setiap agen, hanya mengizinkan alat yang ada dalam daftar agen tersebut, menyaring keluaran alat dari instruksi sisipan, dan mencatat setiap pemanggilan." }
      - { term: "MCP-backbone", meaning: "Server basis data baca-saja milik portofolio ini, yang di sini menyajikan kamus." }
      - { term: "Server MCP milik Juku", meaning: "Server untuk data pelajar, yang dibuka dengan token bertanda tangan berumur pendek untuk satu pelajar dan satu keperluan, sehingga sebuah sesi tidak akan pernah dapat menjangkau data pelajar lain." }
      - { term: "JMdict, KANJIDIC2, Tatoeba", meaning: "Kumpulan data terbuka: kamus bahasa Jepang, kamus kanji, dan kumpulan contoh kalimat." }
      - { term: "Baca-saja", meaning: "Alat dapat melihat data tetapi tidak dapat mengubahnya." }
  - src: weekly.svg
    alt: "Diagram alur laporan mingguan yang direncanakan. Fakta dihitung oleh kode; Keiko merencanakan minggu itu dari kandidat yang disiapkan kode; Tadashi memeriksa rencana; Nikki menulis laporan dalam bahasa Indonesia; Tadashi memeriksa laporan; kode memeriksa ulang setiap angka, kata, dan kutipan lalu memutuskan; laporan diterbitkan untuk pelajar. Pemeriksaan yang menemukan masalah mengembalikan pekerjaan untuk direvisi, paling banyak dua kali; jika masih gagal, laporan berisi fakta saja yang diterbitkan."
    caption: "Laporan mingguan"
    description: "Masih berupa rencana, belum dibangun. Setiap minggu, untuk setiap pelajar, kode terlebih dahulu menghitung faktanya: kemajuan, kesalahan terbaru, dan kata-kata yang layak dipelajari berikutnya. Keiko, sang perencana, memilih materi belajar minggu itu dari kandidat tersebut, dan Tadashi, sang pengkritik, memeriksa rencana itu hanya terhadap apa yang diterima Keiko. Nikki kemudian menulis laporan dalam bahasa Indonesia, dan Tadashi memeriksanya dengan cara yang sama. Jika Tadashi menemukan masalah serius, pekerjaan itu dikembalikan untuk direvisi, paling banyak dua kali. Terakhir, kode sendiri memeriksa ulang setiap angka, kata, dan kutipan, lalu memutuskan apakah laporan dikirim, sehingga kesalahan yang terlewat oleh pengkritik tetap tidak sampai ke pelajar. Jika laporan terus gagal, pelajar menerima laporan sederhana berisi fakta saja. Inilah pola Pitstop, yang diterapkan pada kegiatan belajar."
    terms:
      - { term: "Fakta", meaning: "Angka yang dihitung oleh kode dari aktivitas pelajar, tidak pernah oleh model AI, karena model tidak andal dalam berhitung atas tabel." }
      - { term: "Kandidat", meaning: "Kata dan butir latihan yang diusulkan kode untuk minggu itu. Keiko hanya boleh memilih di antaranya." }
      - { term: "Pengkritik", meaning: "Agen yang tugasnya hanya mencari masalah dalam pekerjaan agen lain: di sini, Tadashi." }
      - { term: "Masalah serius", meaning: "Masalah yang dinilai pengkritik berkeparahan tinggi, misalnya angka yang tidak ada dalam fakta. Masalah yang lebih ringan dicatat, tetapi tidak menghentikan laporan." }
      - { term: "Kode memutuskan", meaning: "Persetujuan akhir diberikan oleh kode biasa yang memiliki pengujian, bukan oleh penilaian model AI." }
      - { term: "Laporan berisi fakta saja", meaning: "Laporan sederhana dari templat, yang dipakai jika versi buatan agen terus gagal. Seberapa sering hal ini terjadi juga dihitung." }
  - src: memory.svg
    alt: "Diagram alur ingatan yang direncanakan. Agen mengusulkan sebuah catatan beserta aktivitas pelajar yang mendukungnya; kode memeriksa apakah catatan itu tentang belajar, apakah buktinya milik pelajar ini, dan apakah buktinya benar-benar menunjukkannya. Jika tidak, catatan ditolak dan dihitung; jika ya, catatan disimpan. Pelajar melihat setiap catatan beserta buktinya dan dapat menghapusnya atau menandainya keliru. Setiap minggu, catatan gugur jika buktinya sudah lebih dari 30 hari dan tidak terulang lagi."
    caption: "Ingatan yang dapat dilihat pelajar"
    description: "Masih berupa rencana, belum dibangun. Agen Juku dapat mengingat sesuatu tentang seorang pelajar, misalnya pola tata bahasa yang terus keliru, tetapi tidak dapat sekadar mencatatnya. Agen hanya dapat mengusulkan sebuah catatan, bersama catatan aktivitas pelajar yang mendukungnya. Kode lalu memeriksa catatan itu: isinya harus tentang belajar, buktinya harus milik pelajar ini, dan buktinya harus benar-benar menunjukkan pola tersebut. Catatan yang tidak lolos ditolak, dan jumlah penolakannya dihitung. Catatan yang lolos disimpan, dan pelajar dapat melihat semuanya beserta buktinya, lalu menghapusnya atau menandainya keliru. Setiap minggu, sebuah catatan memudar jika buktinya sudah lebih dari 30 hari dan polanya tidak muncul lagi."
    terms:
      - { term: "Catatan", meaning: "Sesuatu yang diingat agen tentang seorang pelajar, yang disimpan bersama buktinya." }
      - { term: "Bukti", meaning: "Catatan aktivitas pelajar itu sendiri yang menunjukkan polanya, misalnya jawaban atas latihan sebelumnya." }
      - { term: "Tentang belajar", meaning: "Hanya catatan tentang belajar yang diizinkan; hal lain tentang diri seseorang ditolak." }
      - { term: "Gugur", meaning: "Catatan dihapus jika buktinya sudah lama dan polanya tidak terulang, agar ingatan tidak menyimpan klaim yang usang." }
      - { term: "Dihitung", meaning: "Usulan yang ditolak, koreksi dari pelajar, dan klaim yang usang semuanya diukur, untuk menunjukkan seberapa andal ingatannya." }
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
