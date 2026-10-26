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
---

Mengukur apakah suatu konfigurasi agen berfungsi, dan menggagalkan *continuous integration* (CI) apabila suatu perubahan menurunkan kinerjanya melebihi variasi antarpercobaan. Proyek ini dibangun di atas Inspect AI dan menambahkan gerbang regresi, penilaian ulang atas percobaan sebelumnya, serta pencatatan asal-usul (*provenance*).

- **Bukti:** hasil dipublikasikan dengan lima percobaan per tugas. Pada rangkaian uji basis data, `gpt-5-mini` memperoleh skor 191/200 dan 192/200 dalam dua percobaan terpisah, dengan biaya sekitar US$0,53 per percobaan.
- Gerbang ini mendeteksi regresi yang nyata (penurunan 61 poin ketika alat penelusuran berkas dihapus), dan tidak menandai agen yang sama yang dijalankan dua kali.
- **Keterbatasan yang diungkapkan secara terbuka:** pada rangkaian uji basis data, sistem ini tidak mendeteksi sebagian penurunan kecil yang disengaja. Hasil tersebut tetap dipublikasikan sebagai pembuktian yang tidak berhasil.
