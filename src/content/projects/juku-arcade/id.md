---
title: "juku-arcade: gim kartu belajar bahasa Jepang dengan kombo skor"
summary: Gim kartu arkade orisinal dengan kombo skor, satu genre dengan Balatro, untuk mempelajari cara baca kata-kata bahasa Jepang. Masih dikembangkan, tetapi sudah dapat dimainkan di peramban, di laptop, tablet, dan ponsel dalam posisi tegak.
category: other
order: 10
status: wip
stack: Vue 3 · TypeScript · Tailwind CSS · Vite · Dexie
coverAlt: "Sampul bertuliskan “Juku” di atas papan permainan di meja biru: tiga kartu kata kanji (本, 三日, 上) di atas empat kartu cara baca yang tersusun seperti kipas (ほん, みっか, みか, うえ); keterangannya “A Japanese learning game”, dengan tulisan “Arcade” di bagian bawah."
links:
  - { label: Mainkan, href: "https://nabilrobert.github.io/juku-arcade/", primary: true }
  - { label: Repositori, href: "https://github.com/NabilRobert/juku-arcade" }
screenshots:
  - src: board.webp
    alt: "Satu tangan di mode Words juku-arcade pada level N5. Lima kartu kata di baris atas (本, 三日, 取る, 上, 四つ) dan enam kartu cara baca di bawahnya (ほん, とる, みか, よっつ, みっか, うえ), dengan tombol Play dan tumpukan kartu. Panel di kiri menunjukkan kemajuan hari ini, level (1 dari 5), kombo, pengaturan suara, pot yang belum diamankan dengan tombol Bank, Scout, skor, dan End run."
    caption: "Satu tangan di mode Words"
    description: "Awal sebuah putaran pada level N5. Di baris atas ada lima kartu kata, masing-masing ditulis dalam kanji. Di bawahnya ada enam kartu cara baca: satu untuk setiap kata, dan satu kartu pengecoh. Di sini pengecohnya adalah みか, yang tampak seperti cara baca 三日 tetapi tanpa っ kecil (jawaban yang benar adalah みっか). Mencocokkan cara baca berturut-turut membangun kombo, kombo menaikkan level, dan poin masuk ke pot yang dapat diamankan (bank) agar tetap menjadi milik pemain, atau hilang. Panel di kiri selalu menampilkan level, kombo, pot, dan skor."
    terms:
      - { term: "Cara baca", meaning: "Cara mengucapkan kata yang ditulis dalam kanji, ditulis dengan kana: 三日 dibaca みっか." }
      - { term: "Pengecoh", meaning: "Kartu cara baca tambahan yang berisi kesalahan yang mudah terjadi, misalnya cara baca tanpa っ kecil, vokal panjang yang keliru, atau cara baca lain dari kanji yang sama." }
      - { term: "Pot", meaning: "Poin yang didapat selama putaran tetapi belum aman. Amankan (bank) agar poin itu tetap dimiliki." }
      - { term: "N5", meaning: "Level pertama dari lima level JLPT, Ujian Kemampuan Bahasa Jepang. Gim ini punya dek dari N5 sampai N1." }
---
Gim belajar bahasa Jepang, dibuat untuk para pelajar bahasa Jepang: gim kartu arkade orisinal dengan kombo skor, satu genre dengan Balatro, untuk mempelajari cara baca kata-kata bahasa Jepang. Di mode utama, pemain mencocokkan lima kartu kata kanji (三日) dengan cara bacanya (みっか), dengan satu kartu pengecoh di antaranya. Kombo menaikkan level dan mengisi pot yang dapat diamankan atau hilang.

- **Mode:** Words, seperti di atas; Kanji, yang meminta semua cara baca dari satu kanji; Bunpou, tempat pemain menyusun ubin tata bahasa secara berurutan untuk membangun cerita pendek yang dibuat otomatis; dan Practice, yang mencampur kata, kanji, dan tata bahasa yang sudah pernah ditemui.
- **Pengecoh dari kesalahan nyata:** setiap pengecoh adalah kesalahan yang umum: keliru pada vokal panjang, っ kecil, tanda dakuten, atau ゃ, ゅ, ょ kecil, atau cara baca lain dari kanji yang sama.
- **Data kata:** dek untuk setiap level JLPT dari N5 sampai N1, dibangun dari OpenJLPT, yang bersumber dari JMdict, KANJIDIC2, daftar JLPT Jonathan Waller, dan Tatoeba. Dek-deknya dibagikan dengan lisensi CC BY-SA 4.0, sama seperti sumbernya.
- **Tanpa server:** aplikasi web statis. Tidak ada akun, dan kemajuan pemain tersimpan di peramban. Setiap push ke cabang main yang lolos lint, pemeriksaan tipe, tes, dan build akan dipublikasikan ke GitHub Pages.
- **Mengukurnya:** pemeriksaan harian opsional dirancang untuk mengukur apakah bermain meningkatkan daya ingat. Belum ada pelajar yang diukur, jadi belum ada hasil untuk dilaporkan.
- **Status:** masih dikembangkan, dan sudah dapat dimainkan di peramban, di laptop, tablet, dan ponsel dalam posisi tegak. Kodenya dilindungi hak cipta sepenuhnya (all rights reserved): terbuka untuk dibaca, tetapi tidak untuk digunakan ulang. Dek katanya berlisensi CC BY-SA 4.0.
