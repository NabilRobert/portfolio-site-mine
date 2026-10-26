---
title: "Pitstop: pipeline agen yang telah beroperasi, beserta buktinya"
summary: Pipeline agen yang berjalan tanpa pengawasan selama sebelas minggu, didokumentasikan dari catatan operasionalnya sendiri.
category: portfolio
order: 3
featured: true
status: live
stack: TypeScript · Node · Vue · Postgres
coverAlt: "Ilustrasi empat agen Pitstop sebagai kru pit di sekitar mobil bertanda “AI”, dengan tulisan “Pit Stop” dan “11 weeks unattended” (sebelas minggu tanpa pengawasan). Anna memegang grafik, Rico papan bertanda panah ke atas, Sammy papan klip, dan Ciri, sang kritikus, bendera kotak-kotak."
screenshots:
  - src: dashboard-overview.webp
    alt: "Dasbor Pitstop dengan data iklan sintetis: angka tiga bulan terakhir (tayangan, klik, rasio klik-tayang, dan biaya), grafik tayangan harian, kampanye yang diurutkan menurut konversi, serta laporan AI dari Anna, Rico, dan Sammy yang ditandai telah disetujui oleh Ciri, sang kritikus."
    caption: "Dasbor, dengan data iklan sintetis."
  - src: why-this-trail.webp
    alt: "Laporan harian dalam tiga kolom, yaitu analisis Anna, rekomendasi Rico, dan ringkasan Sammy, masing-masing bernilai A dan disetujui oleh Ciri, dengan panel “Why this?” terbuka di sampingnya yang menampilkan draf aslinya."
    caption: "Laporan harian, dengan panel “Why this?” terbuka."
  - src: learning-grade-trend.webp
    alt: "Halaman Learning: grafik batang bertumpuk berisi putusan Ciri atas laporan akhir Anna selama delapan minggu, yang hampir seluruhnya ditandai hingga akhir September dan sebagian besar disetujui dengan catatan pada minggu 28 September, disertai catatan tentang dua perubahan aturan pada hari itu."
    caption: "Halaman Learning: putusan Ciri dari minggu ke minggu."
  - src: run-inspector-overview.webp
    alt: "Run Inspector untuk proses harian #130: durasinya, delapan panggilan model, jumlah token, dan biaya $0,2427, diikuti linimasa setiap langkah, mulai dari penyusunan konteks hingga setiap agen dan panggilan model."
    caption: "Run Inspector: jejak lengkap dan biaya satu proses."
  - src: run-inspector-model-call.webp
    alt: "Run Inspector dengan satu panggilan model terbuka: panggilan Anna ke gpt-5-mini, beserta jumlah token dan biayanya, pengaturannya, serta prompt dan respons lengkapnya."
    caption: "Run Inspector: prompt dan respons lengkap dari satu panggilan model."
links:
  - { label: Studi kasus, href: "https://github.com/NabilRobert/pitstop-crew-public/blob/main/docs/case-study.md", primary: true }
  - { label: Demo daring, href: "https://pitcrew-public.my.id" }
  - { label: Repositori, href: "https://github.com/NabilRobert/pitstop-crew-public" }
---

Dasbor AI untuk Google Ads. Tiga agen bertugas menganalisis, memberikan rekomendasi, dan meringkas, sementara agen keempat, yaitu agen pengkritik, meninjau setiap keluaran sebelum ditampilkan. Sistem ini berjalan tanpa pengawasan selama kurang lebih sebelas minggu dengan data iklan sintetis.

- Studi kasusnya disusun dari catatan operasional sistem itu sendiri: 68 eksekusi harian, 3 kegagalan beserta penyebabnya, biaya sekitar US$0,15 per eksekusi, serta perubahan penilaian agen pengkritik dari waktu ke waktu.
- Setiap angka dihasilkan oleh kueri SQL yang dipublikasikan.
- Demo daringnya bersifat baca saja dan telah diverifikasi tidak dapat menimbulkan biaya.
