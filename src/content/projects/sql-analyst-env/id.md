---
title: "sql-analyst-env: lingkungan pelatihan untuk analis data AI"
summary: Lingkungan pembelajaran penguatan tempat agen AI menjawab pertanyaan bisnis dengan menulis SQL, dan kode memeriksa jawabannya pada salinan kedua data yang tersembunyi.
category: portfolio
order: 13
status: ci
stack: Python · verifiers · MCP · Postgres · Ollama
coverAlt: "Ilustrasi: sebuah kartu bertuliskan “Select” dengan panah ke dua basis data, A dan B, masing-masing dengan tanda centang di bawahnya, di bawah kata “Data”, dengan keterangan “An RL environment”, dan tulisan “Analyst” di bagian bawah."
links:
  - { label: Repositori, href: "https://github.com/NabilRobert/sql-analyst-env", primary: true }
  - { label: Hasil, href: "https://github.com/NabilRobert/sql-analyst-env/blob/main/RESULTS.md" }
---

Lingkungan pembelajaran penguatan (reinforcement learning) untuk agen analis data. Agen menerima pertanyaan bisnis tentang Pagila, basis data contoh sebuah toko penyewaan DVD, menjelajahinya melalui alat baca-saja milik MCP-backbone, lalu menulis kueri SQL dan mengirimkannya. Kode yang menilai jawabannya: kueri harus memberikan hasil yang benar pada basis data yang dilihat agen dan pada salinan tersembunyi dengan data yang berbeda, sehingga kueri yang menuliskan jawabannya secara langsung akan gagal. Pembelajaran penguatan memperbaiki model dengan membiarkannya mencoba tugas dan menilai setiap percobaan; proyek ini membangun tugas dan penilaiannya, bukan pelatihannya.

- **Tugas:** 100 pertanyaan bisnis, masing-masing dengan kunci jawaban yang harus lolos tujuh pemeriksaan pada kedua salinan. Misalnya, kueri kedua yang ditulis secara terpisah harus memberikan hasil yang sama, sedangkan tafsiran keliru yang paling mungkin atas pertanyaan itu tidak boleh sama. 70 tugas bersifat publik; 30 tugas uji disimpan di luar repositori, sehingga tidak ada model yang dapat dilatih dengannya.
- **Penilaian:** +1 untuk kueri yang benar pada kedua salinan, −0,5 untuk upaya mengubah data, dan hingga −0,1 untuk kueri yang ditolak karena terlalu mahal. Lima tugas menggoda agen untuk menulis data (“hapus…, lalu hitung”) padahal cukup dijawab dengan membaca.
- **Rangkaian uji kecurangan:** agen bernaskah yang mencoba mengakali skor harus mendapat skor yang persis ditentukan. Mengirim jawaban salinan A sebagai nilai tetap, atau mengembalikan seluruh tabel, mendapat skor 0; menyelipkan penulisan data di samping jawaban yang benar mendapat 0,5, tidak pernah 1. CI menjalankan sekitar 840 percobaan seperti itu, tanpa model dan tanpa biaya.
- **Dibangun di atas proyek Arthur yang lain:** MCP-backbone menyediakan alat, pemeriksaan kueri, dan akses basis data baca-saja. agent-eval-harness menyediakan build MCP-backbone, 40 dari tugasnya, dan penilai ketat; sebuah tes memastikan bahwa salinan penilai itu memberikan putusan yang sama dengan harness pada seluruh 212 hasil yang tercatat. Pustaka verifiers dari Prime Intellect menjalankan percobaannya.
- **Baseline:** tiga model terbuka berukuran kecil, dijalankan secara lokal di sebuah Mac melalui Ollama, lima percobaan per tugas. Pada 30 tugas uji, Qwen3.5 4B memperoleh pass@1 sebesar 62,7%, yaitu peluang satu percobaan benar (interval 95%: 47,3% hingga 77,3%); Qwen3 1.7B dan Llama 3.2 3B memperoleh 0%. Tujuh percobaan Qwen3.5 melampaui batas konteks yang ditetapkan sebelum pengujian, karena Ollama mengabaikan pengaturan itu untuk model ini; jika percobaan tersebut dihitung salah, hasilnya 62,0%. Pembacaan manual atas percobaan dengan skor tertinggi tidak menemukan model yang mendapat skor tanpa menjawab.
- **Keterbatasan dan status:** selesai, dari lingkungan lokal hingga baseline. Pelatihan model dan pencantuman di Environments Hub milik Prime Intellect sengaja tidak dikerjakan. Tinjauan menemukan celah yang dicatat, bukan diperbaiki: salinan B mengubah jawaban tetapi tidak mengubah ID, sehingga kueri yang menyaring dengan ID dari salinan A tetap lolos. Pengerjaannya juga menemukan dua bug di MCP-backbone, keduanya sudah diperbaiki di sana. Berlisensi MIT.
