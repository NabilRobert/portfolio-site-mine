---
title: "agent-observability: satu jejak untuk seluruh proyek agen"
summary: Menelusuri satu permintaan agen AI melalui setiap sistem yang dilaluinya, beserta waktu dan biaya setiap langkah, dalam satu penampil kecil yang di-hosting sendiri.
category: portfolio
order: 5
draft: true
status: wip
stack: Python · OpenTelemetry · Jaeger · Docker
coverAlt: "Ilustrasi sebuah jejak yang digambarkan sebagai susunan batang bertingkat, masing-masing tersusun di bawah langkah yang memanggilnya, di bawah kata “Trace”, dengan keterangan “+0.39 ms per call” (tambahan 0,39 ms per panggilan) dan kata “Observability” di bagian bawah."
links:
  - { label: Repositori, href: "https://github.com/NabilRobert/agent-observability", primary: true }
  - { label: Pengukuran overhead, href: "https://github.com/NabilRobert/agent-observability/blob/main/docs/mcp-backbone-overhead.md" }
screenshots:
  - src: trace-mcp-backbone.webp
    alt: "Penampil jejak Jaeger yang menampilkan satu permintaan dari agen demo ke MCP-backbone: 19 span selama 189 milidetik, dalam dua layanan. Langkah agen berwarna biru dan langkah server berwarna oranye. Pemanggilan alat pertama melewati autentikasi, pembatasan laju, validasi, pemeriksaan biaya, eksekusi, dan audit; pemanggilan kedua berhenti di validasi, ditandai ikon galat merah, lalu diaudit."
    caption: "Satu permintaan, dua proses"
    description: "Sebuah agen demo kecil memanggil alat kueri MCP-backbone dua kali, dan seluruh pertukaran itu tampil sebagai satu jejak. Langkah agen berwarna biru dan langkah server berwarna oranye: konteks jejak dibawa di dalam setiap permintaan MCP, sehingga span server tersusun di bawah panggilan agen meskipun berjalan di proses yang berbeda. Di dalam panggilan pertama, tahap-tahap server tampil berurutan, yaitu autentikasi, pembatasan laju, validasi, pemeriksaan biaya, eksekusi, dan audit, masing-masing dengan lamanya. Panggilan kedua adalah DELETE yang ditolak: panggilan itu berhenti di validasi, ditandai ikon galat merah, dan tahap audit tetap mencatat penolakannya. Tidak ada teks SQL yang dicatat di span mana pun."
    terms:
      - { term: "Jejak (trace)", meaning: "Catatan satu permintaan melalui setiap sistem yang dilaluinya." }
      - { term: "Span", meaning: "Satu langkah dalam jejak, dengan waktu mulai dan durasinya, tersusun di bawah langkah yang memanggilnya." }
      - { term: "Biru dan oranye", meaning: "Dua layanan: agen demo (biru) dan MCP-backbone (oranye)." }
      - { term: "Batang", meaning: "Kapan setiap langkah berjalan dalam permintaan, dan berapa lama." }
      - { term: "Ikon merah", meaning: "Langkah tempat terjadinya galat: di sini, kueri yang ditolak." }
      - { term: "189 ms, 19 span", meaning: "Lama seluruh permintaan, dan jumlah langkahnya." }
      - { term: "Jaeger", meaning: "Penampil jejak sumber terbuka yang digunakan di sini, berjalan dalam kontainer kecil." }
  - src: trace-pitstop-replay.webp
    alt: "Penampil jejak Jaeger yang menampilkan eksekusi harian Pitstop tanggal 6 Oktober yang diputar ulang: 29 span selama 2,4 menit. Setelah sinkronisasi data dan penyusunan konteks, analisis Anna ditinjau Ciri, direvisi sekali, lalu disetujui; rekomendasi Rico juga direvisi sekali lalu disetujui; ringkasan Sammy disetujui pada tinjauan pertamanya. Setiap panggilan model menjadi span tersendiri, berlabel model yang digunakan."
    caption: "Satu eksekusi Pitstop, diputar ulang"
    description: "Salah satu eksekusi harian Pitstop, dari 6 Oktober, disusun kembali dari catatannya dengan waktu aslinya. Jejak ini dibaca dari atas ke bawah seperti pipeline-nya sendiri: sinkronisasi data dan penyusunan konteks, lalu analisis Anna, tinjauan Ciri, revisi, dan tinjauan kedua sebelum disetujui. Rekomendasi Rico melalui jalur yang sama, dan ringkasan Sammy disetujui pada tinjauan pertamanya. Setiap panggilan ke model bahasa menjadi span tersendiri, berlabel model yang digunakannya. Seluruh eksekusi berlangsung 2,4 menit, dan sebagian besar waktunya dihabiskan untuk menunggu panggilan model."
    terms:
      - { term: "Diputar ulang", meaning: "Disusun kembali dari catatan Pitstop yang tersimpan setelah kejadiannya, bukan dilacak secara langsung, dengan waktu mulai dan durasi asli setiap langkah." }
      - { term: "invoke_workflow, invoke_agent", meaning: "Nama standar untuk satu eksekusi pipeline secara utuh dan untuk pekerjaan satu agen di dalamnya." }
      - { term: "chat", meaning: "Satu panggilan ke model bahasa." }
      - { term: "Revise, Approve", meaning: "Keputusan agen pengkritik, yang dicatat sebagai langkah tersendiri." }
      - { term: "2,4m, 29 span", meaning: "Lama eksekusi, dan jumlah langkahnya." }
  - src: trace-model-call.webp
    alt: "Penampil jejak Jaeger dengan satu panggilan model dari eksekusi Pitstop yang diputar ulang dibuka: panggilan selama 27,4 detik, dengan atribut seperti biayanya (agentobs.cost.usd = 0.010699) dan jenis operasinya (chat), serta detail sumber daya yang menunjukkan bahwa jejak ini diputar ulang dari cadangan bernama."
    caption: "Di dalam satu panggilan model"
    description: "Membuka satu panggilan model menampilkan rinciannya: berapa lama panggilan itu berlangsung dan kapan dimulai dalam eksekusi, serta atribut seperti biayanya dalam dolar AS, jenis operasinya, dan jenis keluarannya. Baris sumber daya mencatat bahwa jejak ini diputar ulang, dan dari cadangan yang mana. Teks prompt dan respons tidak disimpan di dalam jejak."
    terms:
      - { term: "Atribut", meaning: "Keterangan yang melekat pada sebuah span, seperti biaya dan jenis operasinya." }
      - { term: "agentobs.cost.usd", meaning: "Biaya panggilan dalam dolar AS: di sini, sekitar satu sen." }
      - { term: "gen_ai.*", meaning: "Atribut yang ditetapkan oleh konvensi OpenTelemetry untuk sistem AI, yang dapat dibaca oleh penampil apa pun yang kompatibel." }
      - { term: "Sumber daya (resource)", meaning: "Keterangan tentang asal jejak: di sini, pemutaran ulang dari cadangan bernama." }
      - { term: "Tab GenAI", meaning: "Tampilan yang mengelompokkan rincian panggilan model yang khusus terkait AI." }
  - src: trace-harness-replay.webp
    alt: "Penampil jejak Jaeger yang menampilkan satu sampel evaluasi dari agent-eval-harness, diputar ulang dari log-nya: 15 span dalam 11,8 detik. Di bawah sampel terdapat solver dan agen; di bawah agen, empat panggilan model selama 3,3, 4,2, 3,1, dan 0,9 detik berselang-seling dengan empat pemanggilan alat: mendaftar tabel, melihat struktur satu tabel, menjalankan kueri (masing-masing 50 hingga 100 milidetik), dan menyerahkan jawaban."
    caption: "Satu sampel evaluasi, diputar ulang"
    description: "Salah satu sampel evaluasi harness: agen AI menjawab pertanyaan tentang basis data contoh penyewaan film melalui alat-alat MCP-backbone, direkam saat eksekusi nyata dan diputar ulang dari log harness dengan waktu aslinya. Jejaknya mempertahankan struktur yang dicatat oleh kerangka evaluasinya: sampel, lalu solver dan agen, lalu setiap panggilan model dan setiap pemanggilan alat. Dibaca ke samping, jejak ini menunjukkan ke mana waktunya habis: dari 11,8 detik, empat panggilan ke model AI memakan 11,5 detik, sedangkan tiga alat basis data masing-masing 50 hingga 100 milidetik dan penyerahan jawaban kurang dari satu milidetik. Setiap panggilan model memuat jumlah token dan biayanya sendiri, dan pemutaran ulangnya diperiksa agar jumlahnya sesuai dengan total yang dicatat harness."
    terms:
      - { term: "agent-eval-harness", meaning: "Proyek evaluasi agen dalam portofolio ini: menjalankan agen pada kumpulan tugas yang tetap dan menilai hasilnya." }
      - { term: "Sampel", meaning: "Satu tugas yang dicoba satu kali oleh agen. Eksekusi harness yang dipublikasikan memuat 1.777 sampel, dan semuanya diputar ulang." }
      - { term: "Diputar ulang", meaning: "Disusun kembali menjadi jejak dari log eksekusi yang tersimpan, dengan waktu yang tercatat, tanpa menjalankannya lagi, sehingga tanpa biaya." }
      - { term: "Panggilan model", meaning: "Satu permintaan ke model AI, beserta jumlah token dan biayanya." }
      - { term: "Pemanggilan alat", meaning: "Satu penggunaan alat, misalnya menjalankan kueri; ditandai dengan ikon kunci pas." }
      - { term: "11,8 dtk, 15 span", meaning: "Lama sampel berlangsung dan jumlah langkahnya." }
---

Penelusuran (tracing) untuk proyek-proyek lainnya. Setiap proyek mengirimkan jejak OpenTelemetry, yang mengikuti konvensi standar untuk sistem AI, ke satu penampil kecil yang di-hosting sendiri (Jaeger), sehingga satu permintaan agen dapat diikuti dari agen, melalui server MCP, hingga ke basis data, beserta waktu dan biaya setiap langkah.

- **Tiga sumber sudah tersambung:**
  - MCP-backbone, yang dilacak secara langsung dengan satu span untuk setiap tahap dari setiap pemanggilan alat;
  - Pitstop, yang 62 eksekusi tercatatnya (653 langkah) diputar ulang dari cadangan dengan waktu aslinya;
  - harness evaluasi, yang 20 eksekusi terpublikasinya (1.777 sampel evaluasi, 7.068 panggilan nyata ke model AI) diputar ulang dari log-nya, dengan jumlah token dan biaya untuk setiap panggilan model.
- **Bukti:**
  - Penelusuran menambah 0,39 ms pada pemanggilan alat MCP-backbone di nilai mediannya (1,4%), tanpa perbedaan yang terdeteksi pada 5% dan 1% pemanggilan yang paling lambat.
  - Pemutaran ulangnya setia: setiap langkah yang tercatat muncul satu kali, dengan induk, waktu mulai, dan durasi yang sama. Pada eksekusi Pitstop yang mencatat total biayanya, biaya panggilan modelnya berjumlah tepat sama; pada setiap sampel harness, biaya dan jumlah token panggilan modelnya sesuai dengan total yang tercatat. Ke-62 eksekusi Pitstop dan ke-1.777 sampel harness lolos pemeriksaan.
  - Tanpa isi secara bawaan: teks SQL, prompt, dan respons tidak dicatat kecuali diaktifkan, dan hal ini diuji pada setiap jalur yang dapat dilalui teks kueri.
  - Penelusuran tidak dapat merugikan sistem yang dilacak: saat penampil mati, pemanggilan alat tetap berhasil, dan proses penghentian menunggu paling lama dua detik.
  - Penampilnya tetap kecil: 79 MiB dari batas 256 MB, dengan seluruh data pemutaran ulang dimuat.
- **Temuan dari jejak:** di MCP-backbone, langkah paling lambat dalam pemanggilan alat ternyata bukan kuerinya, melainkan autentikasi. Autentikasi adalah kueri pertama pada koneksi basis data yang baru, dan driver basis data memeriksa ulang tipe satu kolom pada setiap koneksi baru. Mengubah tipe kolom tersebut memangkas sekitar 8,5 ms dari setiap pemanggilan.
- **Perubahan di tengah jalan:** semula penampil dirancang untuk menyimpan jejak di disk. Saat eksekusi harness dimuat, penggunaan memori penyimpanan itu mencapai 532 MiB, melampaui batas penampil sebesar 256 MB, sehingga kini penampil menyimpan jejak di memori, dan data yang sama hanya memerlukan 79 MiB. Data hilang saat penampil dimulai ulang, tetapi pemutaran ulang mengisinya kembali dalam hitungan detik.
- **Selanjutnya:** satu permintaan nyata yang diikuti dari ujung ke ujung, dari agen melalui gateway keamanan MCP dan MCP-backbone hingga ke basis data, serta pemasangan penampil di server bersama.

## Apa yang ditunjukkan sebuah jejak

Jejak (trace) adalah catatan satu permintaan saat melewati suatu sistem: setiap langkah menjadi sebuah span, dengan waktu mulai dan durasinya, tersusun di bawah langkah yang memanggilnya. Di sini, sebuah span juga dapat memuat jumlah token dan biaya dari panggilan model AI. Dibaca dari atas ke bawah, jejak menunjukkan apa yang terjadi secara berurutan; dibaca ke samping, jejak menunjukkan ke mana waktunya habis.
