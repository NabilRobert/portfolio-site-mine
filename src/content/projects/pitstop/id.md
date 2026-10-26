---
title: "Pitstop: pipeline agen yang telah beroperasi, beserta buktinya"
summary: Pipeline agen yang berjalan tanpa pengawasan selama sebelas minggu, didokumentasikan dari catatan operasionalnya sendiri.
category: portfolio
order: 3
featured: true
status: live
stack: TypeScript · Node · Vue · Postgres
coverAlt: "Ilustrasi empat agen Pitstop sebagai kru pit di sekitar mobil bertanda “AI”, dengan tulisan “Pit Stop” dan “11 weeks unattended” (sebelas minggu tanpa pengawasan). Anna memegang grafik, Rico papan bertanda panah ke atas, Sammy papan klip, dan Ciri, agen pengkritik, bendera kotak-kotak."
screenshots:
  - src: dashboard-overview.webp
    alt: "Dasbor Pitstop dengan data iklan sintetis: angka tiga bulan terakhir (tayangan, klik, rasio klik-tayang, dan biaya), grafik tayangan harian, kampanye yang diurutkan menurut konversi, serta laporan AI dari Anna, Rico, dan Sammy yang ditandai telah disetujui oleh Ciri, agen pengkritik."
    caption: "Dasbor: kinerja akun terkini dapat dilihat sekilas, bersama laporan AI hari itu dari Anna, Rico, dan Sammy yang masing-masing telah disetujui oleh Ciri. Seluruh datanya sintetis."
  - src: why-this-trail.webp
    alt: "Laporan harian dalam tiga kolom, yaitu analisis Anna, rekomendasi Rico, dan ringkasan Sammy, masing-masing bernilai A dan disetujui oleh Ciri, dengan panel “Why this?” terbuka di sampingnya yang menampilkan draf aslinya."
    caption: "Laporan harian dengan panel “Why this?” terbuka, yang menunjukkan bagaimana setiap bagian disusun, dikritik oleh Ciri, lalu direvisi."
  - src: learning-grade-trend.webp
    alt: "Halaman Learning: grafik batang bertumpuk berisi putusan Ciri atas laporan akhir Anna selama delapan minggu, yang awalnya sebagian besar ditandai dan pada minggu terakhir sebagian besar disetujui."
    caption: "Halaman Learning: perubahan putusan Ciri atas laporan akhir dari minggu ke minggu."
  - src: run-inspector-overview.webp
    alt: "Run Inspector untuk satu eksekusi harian: ringkasan durasi, jumlah panggilan model, token, dan biaya, diikuti linimasa setiap langkah, mulai dari penyiapan data hingga pekerjaan setiap agen."
    caption: "Run Inspector: setiap langkah dalam satu eksekusi secara berurutan, beserta waktu dan biayanya."
  - src: run-inspector-model-call.webp
    alt: "Run Inspector dengan salah satu panggilan model Anna terbuka, yang menampilkan jumlah token, biaya, dan pengaturannya, serta prompt dan respons lengkapnya."
    caption: "Satu panggilan model di Run Inspector, dengan prompt dan respons lengkapnya, sehingga setiap keluaran dapat ditelusuri kembali ke apa yang menghasilkannya."
links:
  - { label: Studi kasus, href: "https://github.com/NabilRobert/pitstop-crew-public/blob/main/docs/case-study.md", primary: true }
  - { label: Demo daring, href: "https://pitcrew-public.my.id" }
  - { label: Repositori, href: "https://github.com/NabilRobert/pitstop-crew-public" }
---

Dasbor AI untuk Google Ads. Tiga agen bertugas menganalisis, memberikan rekomendasi, dan meringkas, sementara agen keempat, yaitu agen pengkritik, meninjau setiap keluaran sebelum ditampilkan. Sistem ini berjalan tanpa pengawasan selama kurang lebih sebelas minggu dengan data iklan sintetis.

## Empat agen

- **Anna, analisis.** Membaca data kinerja akun iklan dan mengidentifikasi tren, anomali, serta segmen yang menonjol, masing-masing disertai angka yang mendukungnya.
- **Rico, rekomendasi.** Mengubah temuan Anna menjadi saran dalam bahasa yang mudah dipahami. Saran tersebut hanya bersifat anjuran dan tidak pernah diterapkan pada akun secara otomatis.
- **Sammy, ringkasan.** Merangkum analisis dan rekomendasi menjadi ringkasan harian dan mingguan yang dapat dibaca dengan cepat.
- **Ciri, agen pengkritik.** Meninjau setiap keluaran sebelum ditampilkan untuk memeriksa bukti yang lemah dan klaim yang terlalu yakin, lalu mengembalikannya untuk direvisi apabila belum memenuhi standar.

Setiap agen bekerja dalam batasan pengamannya (guardrail) sendiri: agen hanya bekerja sesuai perannya dan dalam lingkup data yang diberikan kepadanya, memperlakukan data tersebut sebagai informasi, bukan sebagai perintah, dan tidak dapat melakukan perubahan apa pun pada akun iklan.

## Bukti

- Studi kasusnya disusun dari catatan operasional sistem itu sendiri: 68 eksekusi harian, 3 kegagalan beserta penyebabnya, biaya sekitar US$0,15 per eksekusi, serta perubahan penilaian agen pengkritik dari waktu ke waktu.
- Setiap angka dihasilkan oleh kueri SQL yang dipublikasikan.
- Demo daringnya bersifat baca saja dan telah diverifikasi tidak dapat menimbulkan biaya.
