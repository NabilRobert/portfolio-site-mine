---
title: "agent-eval-harness: apakah agen masih berfungsi?"
summary: Mengukur kinerja agen dan menggagalkan CI apabila suatu perubahan menurunkannya.
category: portfolio
order: 2
status: ci
stack: Python · Inspect AI · statistik
links:
  - { label: Repositori, href: "https://github.com/NabilRobert/agent-eval-harness", primary: true }
  - { label: Hasil, href: "https://github.com/NabilRobert/agent-eval-harness/blob/main/RESULTS.md" }
screenshots:
  - src: gate-chart.svg
    alt: "Grafik delapan perbandingan pada gerbang regresi. Pada suite basis data, menjalankan agen yang sama dua kali mengubah tingkat kelulusan ketat sebesar +0,5 poin; penghapusan alat skema (−3,0), peralihan ke model yang lebih kecil (−4,5), dan penghapusan satu baris dari prompt (−2,5) diharapkan ditandai, tetapi tidak ada yang ditandai. Pada suite sistem berkas, pengulangan eksekusi tidak mengubah apa pun (±0,0), dan tiga perubahan ditandai sebagai regresi: penghapusan alat penemuan (−61,2), pemangkasan batas pesan dari 20 menjadi 12 (−20,0), dan peralihan ke model yang lebih kecil (−20,0)."
    caption: "Gerbang regresi"
    description: "Setiap baris membandingkan satu versi agen dengan versi dasarnya pada tugas yang sama, dengan lima percobaan per tugas. Titiknya menunjukkan seberapa jauh proporsi tugas yang lulus dengan penilaian ketat berubah, dan batang di sekitarnya adalah interval 95%, yaitu rentang yang kemungkinan besar memuat perubahan sebenarnya. Gerbang ini menandai regresi apabila seluruh rentang tersebut berada di bawah nol, atau apabila tugas yang sebelumnya selalu lulus kini selalu gagal, sehingga variasi biasa antar-eksekusi tidak disalahartikan sebagai penurunan. Kedua baris A/A, yaitu agen yang sama dijalankan dua kali, berada di sekitar nol dan dengan tepat tidak ditandai, dan pada suite sistem berkas, ketiga kerusakan yang disengaja semuanya terdeteksi. Pada suite basis data, tiga penurunan kecil sebesar 2,5 hingga 4,5 poin diharapkan ditandai tetapi tidak, karena intervalnya masih melewati nol. Proyek ini memublikasikannya sebagai pembuktian yang tidak berhasil alih-alih menyembunyikannya; untuk model yang lebih kecil, pemeriksaan lanjutan dengan percobaan baru pada tugas-tugas yang menurun kemudian memastikan adanya regresi."
    terms:
      - { term: "Suite", meaning: "Sekumpulan tugas tetap yang jawabannya sudah diketahui. Suite basis data berisi 40 pertanyaan tentang Pagila, basis data latihan milik sebuah toko penyewaan DVD fiktif, yang dijawab melalui MCP-backbone. Suite sistem berkas berisi 17 tugas untuk menemukan informasi di dalam berkas-berkas sebuah proyek perangkat lunak fiktif." }
      - { term: "Percobaan", meaning: "Satu kali upaya menyelesaikan satu tugas. Setiap tugas dicoba lima kali, karena agen AI tidak selalu memberikan jawaban yang sama." }
      - { term: "Tingkat kelulusan ketat", meaning: "Proporsi percobaan yang jawabannya sepenuhnya benar. Pada suite basis data, baris yang dikembalikan harus sama persis dengan yang diharapkan; pada suite sistem berkas, jawaban harus memuat setiap nilai yang diharapkan." }
      - { term: "Versi dasar dan kandidat", meaning: "Setiap baris membandingkan agen apa adanya (versi dasar) dengan salinannya yang diberi satu perubahan yang disengaja (kandidat)." }
      - { term: "Titik: perubahan, dalam poin", meaning: "Seberapa jauh tingkat kelulusan ketat kandidat bergeser dari versi dasarnya, dalam poin persentase. −20,0 berarti dari setiap 100 percobaan, 20 lebih sedikit yang lulus." }
      - { term: "Batang: interval 95%", meaning: "Rentang yang kemungkinan besar memuat perubahan sebenarnya, dengan memperhitungkan faktor kebetulan. Makin lebar batangnya, makin rendah tingkat kepastiannya." }
      - { term: "Garis nol", meaning: "Tidak ada perubahan. Batang yang seluruhnya berada di kiri garis ini menunjukkan penurunan yang terlalu besar untuk dianggap kebetulan." }
      - { term: "A/A", meaning: "Agen yang sama dibandingkan dengan dirinya sendiri, untuk memastikan gerbang tidak bereaksi ketika tidak ada yang berubah." }
      - { term: "Ditandai", meaning: "Gerbang menilai kandidat lebih buruk. Dalam integrasi berkelanjutan, build akan gagal." }
      - { term: "Diharapkan ditandai", meaning: "Perubahan yang sengaja dibuat untuk memperburuk agen dan dicatat sebelum eksekusi, sehingga seharusnya terdeteksi oleh gerbang." }
      - { term: "Alat skema, alat penemuan", meaning: "Alat yang digunakan agen untuk mengenali situasinya sebelum menjawab, yaitu tabel dan kolom basis data, atau berkas-berkas di dalam proyek." }
      - { term: "Batas pesan, model yang lebih kecil", meaning: "Batas pesan membatasi jumlah pesan yang dapat dipertukarkan agen dalam satu tugas. Model yang lebih kecil adalah gpt-5-nano, yang lebih murah daripada gpt-5-mini yang digunakan secara bawaan." }
---

Mengukur apakah suatu konfigurasi agen berfungsi, dan menggagalkan *continuous integration* (CI) apabila suatu perubahan menurunkan kinerjanya melebihi variasi antarpercobaan. Proyek ini dibangun di atas Inspect AI dan menambahkan gerbang regresi, penilaian ulang atas percobaan sebelumnya, serta pencatatan asal-usul (*provenance*).

- **Bukti:** hasil dipublikasikan dengan lima percobaan per tugas. Pada rangkaian uji basis data, `gpt-5-mini` memperoleh skor 191/200 dan 192/200 dalam dua percobaan terpisah, dengan biaya sekitar US$0,53 per percobaan.
- Gerbang ini mendeteksi regresi yang nyata (penurunan 61 poin ketika alat penelusuran berkas dihapus), dan tidak menandai agen yang sama yang dijalankan dua kali.
- **Keterbatasan yang diungkapkan secara terbuka:** pada rangkaian uji basis data, sistem ini tidak mendeteksi sebagian penurunan kecil yang disengaja. Hasil tersebut tetap dipublikasikan sebagai pembuktian yang tidak berhasil.

## Apa yang diukur

Agen di sini adalah model AI yang diberi instruksi dan seperangkat alat, yang digunakannya untuk menyelesaikan tugas secara mandiri. Harness ini menjalankan agen pada sekumpulan tugas tetap (suite), masing-masing lima kali, dan menilai setiap jawaban secara otomatis. Untuk memeriksa bahwa gerbangnya berfungsi, dibuat perubahan yang disengaja yang seharusnya memperburuk agen, seperti menghapus suatu alat atau beralih ke model yang lebih kecil, lalu setiap versi yang diubah dibandingkan dengan versi aslinya. Grafik di bawah menampilkan perbandingan tersebut, dengan keterangan di sampingnya.
