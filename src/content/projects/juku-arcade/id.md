---
title: "juku-arcade: gim kartu belajar bahasa Jepang dengan kombo skor"
summary: Gim kartu arkade orisinal dengan kombo skor, satu genre dengan Balatro, untuk mempelajari cara baca kata-kata bahasa Jepang. Masih dikembangkan, tetapi sudah dapat dimainkan di peramban, di laptop, tablet, dan ponsel dalam posisi tegak.
category: other
order: 10
status: wip
stack: Vue 3 · TypeScript · Tailwind CSS · Vite · Dexie
coverAlt: "Sampul bertuliskan “Juku” di atas papan permainan di meja biru: tiga kartu kata kanji (本, 三日, 上) di atas empat kartu cara baca yang tersusun seperti kipas (ほん, みっか, みか, うえ); keterangannya “A Japanese learning game”, dengan tulisan “Arcade” di bagian bawah."
links:
  - { label: Mainkan, href: "https://arcade.nabilrobert.my.id/", primary: true }
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
  - src: kanji.webp
    alt: "Mode Kanji juku-arcade pada level N5. Satu kartu kanji, 二, dengan artinya “two; two radical (no. 7)”, di atas delapan kartu cara baca: ふた, ゼイ, むずか(しい), び, ニ, ふた(つ), あか(らめる), dan よわ(まる). Panel di kiri menunjukkan jumlah kanji (1 dari 10), skor, kombo, Scout, dan End run, dan tiga lampion merah ada di samping papan."
    caption: "Mode Kanji: semua cara baca satu kanji"
    description: "Satu kanji dibagikan bersama delapan cara baca, dan tugas pemain adalah memilih semua yang benar sebelum menekan Play. Untuk 二, jawabannya ニ, ふた, dan ふた(つ); lima lainnya milik kanji lain. Setiap kanji boleh salah pilih tiga kali. Kanji yang cara bacanya tidak ditemukan semua akan memadamkan satu dari tiga lampion, dan putaran berakhir ketika ketiganya padam. Mode ini tidak mengubah catatan ulasan."
    terms:
      - { term: "Bacaan on dan kun", meaning: "Kebanyakan kanji punya cara baca yang diserap dari bahasa Tionghoa (on, ditulis dengan katakana, seperti ニ) dan cara baca asli Jepang (kun, dengan hiragana, seperti ふた)." }
      - { term: "Lampion", meaning: "Tiga nyawa dalam satu putaran. Setiap kanji yang cara bacanya tidak ditemukan semua memadamkan satu lampion." }
  - src: bunpou.webp
    alt: "Mode Bunpou juku-arcade pada level N5. Di atas ada adegan seni piksel berupa sosok di atas panggung; di bawahnya petunjuk “時間＋に” (waktu + に), lima kotak kosong, dan lima ubin untuk disusun: は, 夜, に, お父さん, dan 来ます. Panel di kiri menunjukkan kemajuan hari ini, tata bahasa yang dikuasai, skor, level, petunjuk, dan End run."
    caption: "Bunpou: ubin tata bahasa yang membangun cerita"
    description: "Bunpou adalah mode tata bahasa. Setiap kalimat diberikan sebagai ubin yang harus disusun berurutan, di sini は, 夜 (malam), に, お父さん (ayah), dan 来ます (datang), dengan petunjuk berupa pola yang sedang dilatih: kata waktu diikuti に. Setelah kalimat-kalimat itu tersusun, semuanya membentuk cerita pendek yang dibuat otomatis, yang dimainkan di adegan bagian atas. Gim ini menandai mode ini sebagai khusus N5 untuk saat ini, dan masih dikembangkan."
    terms:
      - { term: "Partikel", meaning: "Kata pendek seperti は atau に yang menandai peran sebuah kata dalam kalimat. に setelah kata waktu menyatakan kapan." }
      - { term: "Petunjuk", meaning: "Pola yang sedang dilatih, ditampilkan di atas kotak. Petunjuk dapat dimatikan." }
  - src: phone.webp
    alt: "Mode Words juku-arcade di ponsel dalam posisi tegak: lima kartu kata dalam dua baris (東, 二つ, 持つ, 本, 上), tombol Play, dan enam kartu cara baca di bawahnya dalam dua baris (うえ, もつ, ほん, ひがし, ふたつ, もうつ), dengan Pause di kanan atas."
    caption: "Di ponsel, dalam posisi tegak"
    description: "Papan Words yang sama, ditata untuk ponsel dalam posisi tegak. Kartu kata terbagi menjadi dua baris dan kartu cara baca tersusun dalam kisi di bawahnya, sehingga satu tangan penuh muat di layar tanpa menggulir. Di sini pengecohnya adalah もうつ, salah baca もつ dengan vokal panjang. Jika ponsel dimiringkan, muncul pemberitahuan yang meminta pemain mengembalikannya ke posisi tegak, karena posisi mendatar di ponsel belum didukung."
---
Gim belajar bahasa Jepang, dibuat untuk para pelajar bahasa Jepang: gim kartu arkade orisinal dengan kombo skor, satu genre dengan Balatro, untuk mempelajari cara baca kata-kata bahasa Jepang. Di mode utama, pemain mencocokkan lima kartu kata kanji (三日) dengan cara bacanya (みっか), dengan satu kartu pengecoh di antaranya. Kombo menaikkan level dan mengisi pot yang dapat diamankan atau hilang.

**Untuk memainkan demo daring:** demo meminta nama pengguna dan kata sandi. Nama pengguna: `demo`. Kata sandi: `UuDQe55SrZ6WRjOz`.

- **Mode:** Words, seperti di atas; Kanji, yang meminta semua cara baca dari satu kanji; Bunpou, tempat pemain menyusun ubin tata bahasa secara berurutan untuk membangun cerita pendek yang dibuat otomatis; dan Practice, yang mencampur kata, kanji, dan tata bahasa yang sudah pernah ditemui.
- **Pengecoh dari kesalahan nyata:** setiap pengecoh adalah kesalahan yang umum: keliru pada vokal panjang, っ kecil, tanda dakuten, atau ゃ, ゅ, ょ kecil, atau cara baca lain dari kanji yang sama.
- **Data kata:** dek untuk setiap level JLPT dari N5 sampai N1, dibangun dari OpenJLPT, yang bersumber dari JMdict, KANJIDIC2, daftar JLPT Jonathan Waller, dan Tatoeba. Dek-deknya dibagikan dengan lisensi CC BY-SA 4.0, sama seperti sumbernya.
- **Tanpa backend:** aplikasi web statis. Tidak ada akun, dan kemajuan pemain tersimpan di peramban. Demo daringnya berupa berkas statis yang sama, dan server web meminta nama pengguna serta kata sandi di atas sebelum mengirim berkas apa pun.
- **Mengukurnya:** pemeriksaan harian opsional dirancang untuk mengukur apakah bermain meningkatkan daya ingat. Belum ada pelajar yang diukur, jadi belum ada hasil untuk dilaporkan.
- **Status:** masih dikembangkan, dan sudah dapat dimainkan di peramban, di laptop, tablet, dan ponsel dalam posisi tegak. Kodenya dilindungi hak cipta sepenuhnya (all rights reserved): terbuka untuk dibaca, tetapi tidak untuk digunakan ulang. Dek katanya berlisensi CC BY-SA 4.0.
