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
---

Penelusuran (tracing) untuk proyek-proyek lainnya. Setiap proyek mengirimkan jejak OpenTelemetry, yang mengikuti konvensi standar untuk sistem AI, ke satu penampil kecil yang di-hosting sendiri (Jaeger), sehingga satu permintaan agen dapat diikuti dari agen, melalui server MCP, hingga ke basis data, beserta waktu dan biaya setiap langkah.

- **Dua sumber sudah tersambung:** MCP-backbone, yang dilacak secara langsung dengan satu span untuk setiap tahap dari setiap pemanggilan alat; dan Pitstop, yang 62 eksekusi tercatatnya (653 langkah) diputar ulang dari cadangan dengan waktu aslinya.
- **Bukti:**
  - Penelusuran menambah 0,39 ms pada pemanggilan alat MCP-backbone di nilai mediannya (1,4%), tanpa perbedaan yang terdeteksi pada 5% dan 1% pemanggilan yang paling lambat.
  - Pemutaran ulangnya setia: setiap langkah yang tercatat muncul satu kali, dengan induk, waktu mulai, dan durasi yang sama, dan pada setiap eksekusi yang mencatat total biayanya, biaya panggilan modelnya berjumlah tepat sama. Ke-62 eksekusi lolos pemeriksaan.
  - Tanpa isi secara bawaan: teks SQL, prompt, dan respons tidak dicatat kecuali diaktifkan, dan hal ini diuji pada setiap jalur yang dapat dilalui teks kueri.
  - Penelusuran tidak dapat merugikan sistem yang dilacak: saat penampil mati, pemanggilan alat tetap berhasil.
- **Selanjutnya:** jejak yang melewati gateway keamanan MCP dan harness evaluasi, serta pemasangan penampil di server bersama.

## Apa yang ditunjukkan sebuah jejak

Jejak (trace) adalah catatan satu permintaan saat melewati suatu sistem: setiap langkah menjadi sebuah span, dengan waktu mulai dan durasinya, tersusun di bawah langkah yang memanggilnya. Di sini, sebuah span juga dapat memuat jumlah token dan biaya dari panggilan model AI. Dibaca dari atas ke bawah, jejak menunjukkan apa yang terjadi secara berurutan; dibaca ke samping, jejak menunjukkan ke mana waktunya habis.
