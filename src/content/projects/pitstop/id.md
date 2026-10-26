---
title: "Pitstop: pipeline agen yang telah beroperasi, beserta buktinya"
summary: Pipeline agen yang berjalan tanpa pengawasan selama sebelas minggu, didokumentasikan dari catatan operasionalnya sendiri.
category: portfolio
order: 3
featured: true
status: live
stack: TypeScript · Node · Vue · Postgres
coverAlt: "Sampul bertuliskan “Pit Stop” dan “11 weeks unattended” (sebelas minggu tanpa pengawasan), yang membingkai tangkapan layar dasbor: angka kinerja dan grafik tren harian, dengan data iklan sintetis."
links:
  - { label: Studi kasus, href: "https://github.com/NabilRobert/pitstop-crew-public/blob/main/docs/case-study.md", primary: true }
  - { label: Demo daring, href: "https://pitcrew-public.my.id" }
  - { label: Repositori, href: "https://github.com/NabilRobert/pitstop-crew-public" }
---

Dasbor AI untuk Google Ads. Tiga agen bertugas menganalisis, memberikan rekomendasi, dan meringkas, sementara agen keempat, yaitu agen pengkritik, meninjau setiap keluaran sebelum ditampilkan. Sistem ini berjalan tanpa pengawasan selama kurang lebih sebelas minggu dengan data iklan sintetis.

- Studi kasusnya disusun dari catatan operasional sistem itu sendiri: 68 eksekusi harian, 3 kegagalan beserta penyebabnya, biaya sekitar US$0,15 per eksekusi, serta perubahan penilaian agen pengkritik dari waktu ke waktu.
- Setiap angka dihasilkan oleh kueri SQL yang dipublikasikan.
- Demo daringnya bersifat baca saja dan telah diverifikasi tidak dapat menimbulkan biaya.
