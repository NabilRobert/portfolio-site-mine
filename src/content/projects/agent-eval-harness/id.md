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
---

Mengukur apakah suatu konfigurasi agen berfungsi, dan menggagalkan *continuous integration* (CI) apabila suatu perubahan menurunkan kinerjanya melebihi variasi antarpercobaan. Proyek ini dibangun di atas Inspect AI dan menambahkan gerbang regresi, penilaian ulang atas percobaan sebelumnya, serta pencatatan asal-usul (*provenance*).

- **Bukti:** hasil dipublikasikan dengan lima percobaan per tugas. Pada rangkaian uji basis data, `gpt-5-mini` memperoleh skor 191/200 dan 192/200 dalam dua percobaan terpisah, dengan biaya sekitar US$0,53 per percobaan.
- Gerbang ini mendeteksi regresi yang nyata (penurunan 61 poin ketika alat penelusuran berkas dihapus), dan tidak menandai agen yang sama yang dijalankan dua kali.
- **Keterbatasan yang diungkapkan secara terbuka:** pada rangkaian uji basis data, sistem ini tidak mendeteksi sebagian penurunan kecil yang disengaja. Hasil tersebut tetap dipublikasikan sebagai pembuktian yang tidak berhasil.
