---
title: "systems-monitoring: apakah berjalan, dan siapa yang diberi tahu?"
summary: "Pemantauan yang sedang direncanakan untuk aplikasi yang berjalan dalam portofolio ini: janji layanan dengan anggaran galat, dan peringatan beserta panduan penanganannya, hanya jika seseorang perlu bertindak."
category: portfolio
order: 8
draft: true
status: wip
stack: Prometheus · Alertmanager · Grafana · Telegram
coverAlt: "Sampul bertuliskan “Alert” di atas grafik garis anggaran galat yang turun melewati ambang batas bergaris putus-putus, dengan penurunan tajam berwarna merah, di samping lonceng kuning dan ponsel yang menampilkan pesan; keterangannya “SLOs · Error budgets · Runbooks”, dengan kata “Monitoring” di bagian bawah."
links:
  - { label: Repositori, href: "https://github.com/NabilRobert/systems-monitoring", primary: true }
---

Pemantauan untuk aplikasi yang berjalan dalam portofolio ini, yang sedang dalam tahap perencanaan. agent-observability menjawab “apa yang terjadi dalam permintaan ini”; proyek ini menjawab “apakah semuanya berjalan saat ini, dan siapa yang diberi tahu jika tidak”. Proyek ini akan memantau Juku setelah memiliki pengguna sungguhan, demo Pitstop, dan MCP-backbone, yang semuanya berjalan di satu server bersama yang kecil.

- **Yang akan dipantau:** apakah halaman dan API merespons serta sertifikat masih berlaku; latensi, tingkat galat, memori, dan disk; galat beserta jejak tumpukannya; kegagalan khas AI yang tetap memberikan respons normal, seperti pengeluaran yang melaju melampaui batasnya, penolakan, pemblokiran oleh gateway, dan mutu jawaban; serta kejadian keamanan di server, seperti login, penggunaan `sudo`, dan port baru yang mulai menerima koneksi.
- **Janji, bukan sekadar grafik:** sasaran tingkat layanan (SLO) dengan anggaran galat, misalnya “99% jawaban Juku dalam waktu kurang dari lima detik”, dan peringatan ketika anggaran itu terpakai terlalu cepat.
- **Hanya peringatan yang perlu ditindaklanjuti:** satu saluran ke ponsel operator, panduan penanganan untuk setiap peringatan, dan pengujian yang sengaja memicu setiap peringatan serta memastikan peringatan itu sampai.
- **Hanya mendeteksi:** tidak ada bagian proyek ini yang mengubah pengaturan keamanan server.
- **Status:** masih dalam tahap perencanaan, belum ada kode; sebagian besar menunggu hingga Juku berjalan. Hasilnya, termasuk yang tidak mencapai sasaran, akan dipublikasikan apa adanya.
