---
title: "systems-monitoring: apakah berjalan, dan siapa yang diberi tahu?"
summary: "Pemantauan yang sedang direncanakan untuk aplikasi yang berjalan dalam portofolio ini: janji layanan dengan anggaran galat, dan peringatan beserta panduan penanganannya, hanya jika seseorang perlu bertindak."
category: portfolio
order: 8
draft: true
status: wip
stack: VictoriaMetrics · Alertmanager · Python · Telegram
coverAlt: "Sampul bertuliskan “Alert” di atas grafik garis anggaran galat yang turun melewati ambang batas bergaris putus-putus, dengan penurunan tajam berwarna merah, di samping lonceng kuning dan ponsel yang menampilkan pesan; keterangannya “SLOs · Error budgets · Runbooks”, dengan kata “Monitoring” di bagian bawah."
links:
  - { label: Repositori, href: "https://github.com/NabilRobert/systems-monitoring", primary: true }
screenshots:
  - src: path.svg
    alt: "Diagram rencana jalur peringatan. Tiga sumber, yaitu authwatch (login, sudo, port baru yang terbuka), probe dan metrik (ketersediaan, memori, disk, sertifikat), serta slo-check (catatan Juku dan anggaran galat), mengirim ke Alertmanager, yang mengelompokkan, membuang duplikat, membisukan, dan mengarahkan peringatan ke bot Telegram yang hanya mengirim pesan kepada operator. Sebuah peringatan berupa page, yang membuat ponsel berbunyi, atau ticket, yang datang tanpa bunyi."
    caption: "Bagaimana peringatan sampai ke operator"
    description: "Masih berupa rencana, belum dibangun. Tiga jenis sumber mengawasi sistem. Sebuah pengawas kecil membaca catatan login server dan port yang terbuka. Probe dan metrik memeriksa setiap menit bahwa setiap aplikasi merespons, serta memantau memori, disk, dan sertifikat. Sebuah pemeriksaan atas catatan Juku sendiri mengukur sasaran tingkat layanannya. Semuanya mengirim peringatan ke satu Alertmanager, yang mengelompokkannya, membuang duplikat, menahannya selama pemeliharaan, dan mengarahkannya ke bot Telegram yang hanya mengirim pesan kepada operator. Peringatan mendesak, seperti kejadian keamanan atau anggaran yang cepat habis, membuat ponsel berbunyi; peringatan lain, seperti sertifikat yang berakhir dalam sepuluh hari, datang tanpa bunyi untuk dibaca nanti. Setiap peringatan disertai panduan penanganan dan dua pengujian, serta tautan ke jejak permintaannya di agent-observability."
    terms:
      - { term: "Peringatan", meaning: "Pesan yang dikirim otomatis ketika sesuatu membutuhkan perhatian seseorang." }
      - { term: "authwatch", meaning: "Pengawas kecil buatan proyek ini untuk kejadian keamanan: login, penggunaan sudo, dan port yang baru terbuka. Ia hanya mendeteksi dan tidak mengubah apa pun." }
      - { term: "Probe", meaning: "Pemeriksaan otomatis setiap menit bahwa sebuah halaman atau layanan merespons dengan benar dan tepat waktu." }
      - { term: "Alertmanager", meaning: "Perangkat lunak sumber terbuka yang menerima peringatan dari semua sumber, mengelompokkannya, membuang duplikat, dan menentukan tujuan masing-masing." }
      - { term: "Page, ticket", meaning: "Dua tingkat urgensi: page membuat ponsel berbunyi; ticket datang tanpa bunyi." }
      - { term: "Panduan penanganan (runbook)", meaning: "Panduan tertulis singkat yang ditautkan dari setiap peringatan, berisi apa yang perlu diperiksa dan dilakukan." }
  - src: slos.svg
    alt: "Tabel rencana sasaran tingkat layanan sementara untuk Juku dalam jendela bergulir 28 hari: ketersediaan 99,5% dengan anggaran 201 menit buruk; latensi obrolan, 95% jawaban dalam 40 detik dan separuhnya dalam 15 detik; keberhasilan obrolan 99%; laporan mingguan tepat waktu, paling banyak dua terlambat dan tidak pernah pelajar yang sama dua kali berturut-turut; mutu jawaban, 95% jawaban sampel lolos pemeriksaan kode."
    caption: "Sasaran tingkat layanan Juku"
    description: "Masih berupa rencana, belum dibangun. Sasaran tingkat layanan adalah janji yang dinyatakan dalam angka, diukur dalam jendela bergulir 28 hari. Setiap sasaran memiliki anggaran galat: jumlah kegagalan yang masih diperbolehkan oleh sasaran itu, misalnya 201 menit situs tidak merespons. Peringatan dikirim ketika anggaran itu terpakai terlalu cepat, bukan pada setiap kegagalan. Sasarannya mengikuti rencana Juku sendiri: sasaran latensi obrolan, misalnya, memberi batas 40 detik, karena agen yang beberapa kali memanggil alat dan model tidak dapat secara jujur menjanjikan lima detik. Sasaran ini bersifat sementara hingga dua minggu lalu lintas nyata, dan sasaran yang tidak tercapai dipublikasikan, bukan diturunkan diam-diam."
    terms:
      - { term: "SLO (sasaran tingkat layanan)", meaning: "Target seberapa andal sebuah layanan bekerja, misalnya 99,5% pemeriksaan merespons tepat waktu." }
      - { term: "Anggaran galat", meaning: "Kegagalan yang masih diperbolehkan oleh sasaran selama jendela waktu. Jika habis, janjinya telah dilanggar." }
      - { term: "Laju pemakaian (burn rate)", meaning: "Seberapa cepat anggaran terpakai. Pemakaian cepat memanggil operator; pemakaian lambat menjadi ticket." }
      - { term: "Jendela bergulir 28 hari", meaning: "Jendela selalu mencakup empat minggu terakhir, sehingga setiap hari dalam seminggu dihitung sama banyak." }
      - { term: "Laporan tepat waktu", meaning: "Laporan dianggap terkirim jika siap dalam satu jam, termasuk laporan sederhana berisi fakta saja yang menjadi cadangan Juku." }
      - { term: "Pemeriksaan kode", meaning: "Mutu jawaban diperiksa oleh kode tanpa biaya: setiap entri kamus yang dikutip harus ada dan sesuai dengan isi jawaban." }
  - src: slices.svg
    alt: "Urutan rencana pembangunan: 0 perencanaan, selesai; 1 peringatan keamanan, berikutnya; 2 pemasangan di server; 3 metrik dan probe; 4 galat, jika muat di memori; titik periksa, server dipantau sebelum pengguna pertama Juku; 5 SLO Juku; 6 sinyal khas AI; 7 canary; 8 penulisan. Semuanya tanpa biaya; irisan 5 hingga 8 menunggu hingga Juku berjalan."
    caption: "Dibangun dalam irisan"
    description: "Masih berupa rencana, dan baru langkah pertamanya yang selesai. Pekerjaan dipotong menjadi irisan, dan setiap irisan berjalan utuh, dari sinyal hingga pesan di ponsel, beserta pengujiannya, sebelum irisan berikutnya dimulai. Peringatan keamanan didahulukan, karena tidak membutuhkan apa pun yang lain. Kemudian kesehatan server itu sendiri, agar server sudah dipantau sebelum Juku memiliki satu pengguna pun. Sisanya membutuhkan Juku yang sudah berjalan: sasaran tingkat layanannya, kegagalan yang khas AI, dan canary, yaitu agen berskrip yang menjalankan satu tugas nyata setiap jam untuk membuktikan bahwa seluruh rantai masih berfungsi. Apa yang dipangkas jika waktu atau memori tidak cukup telah diputuskan sejak awal; peringatan keamanan dan hasil yang dipublikasikan tidak pernah dipangkas."
    terms:
      - { term: "Irisan", meaning: "Bagian sistem yang kecil dan utuh, yang dibangun dan diuji sepenuhnya sebelum irisan berikutnya." }
      - { term: "Titik periksa", meaning: "Saat server sudah sepenuhnya dipantau, sebelum pengguna pertama Juku." }
      - { term: "Canary", meaning: "Agen berskrip yang menjalankan satu tugas nyata setiap jam tanpa biaya, agar kerusakan diketahui sebelum pengguna menyadarinya." }
      - { term: "Gerbang memori", meaning: "Sebuah komponen hanya dipakai jika memori terukurnya muat di server bersama; angkanya dipublikasikan apa pun hasilnya." }
      - { term: "Postmortem", meaning: "Catatan tertulis tentang kegagalan nyata: apa yang terjadi, mengapa, dan apa yang diubah." }
---

Pemantauan untuk aplikasi yang berjalan dalam portofolio ini, yang sedang dalam tahap perencanaan. agent-observability menjawab “apa yang terjadi dalam permintaan ini”; proyek ini menjawab “apakah semuanya berjalan saat ini, dan siapa yang diberi tahu jika tidak”. Proyek ini akan memantau Juku setelah memiliki pengguna sungguhan, demo Pitstop, dan MCP-backbone, yang semuanya berjalan di satu server bersama yang kecil.

- **Yang akan dipantau:** apakah halaman dan API merespons serta sertifikat masih berlaku; latensi, tingkat galat, memori, dan disk; galat beserta jejak tumpukannya; kegagalan khas AI yang tetap memberikan respons normal, seperti pengeluaran yang melaju melampaui batasnya, penolakan, pemblokiran oleh gateway, dan mutu jawaban; serta kejadian keamanan di server, seperti login, penggunaan `sudo`, dan port baru yang mulai menerima koneksi.
- **Janji, bukan sekadar grafik:** sasaran tingkat layanan (SLO) dengan anggaran galat, misalnya “95% jawaban obrolan Juku dalam 40 detik”, yang bersifat sementara hingga dua minggu lalu lintas nyata, dan peringatan ketika anggaran itu terpakai terlalu cepat.
- **Hanya peringatan yang perlu ditindaklanjuti:** satu saluran ke ponsel operator, panduan penanganan untuk setiap peringatan, dan pengujian yang sengaja memicu setiap peringatan serta memastikan peringatan itu sampai.
- **Hanya mendeteksi:** tidak ada bagian proyek ini yang mengubah pengaturan keamanan server.
- **Status:** perencanaannya selesai, dan pembangunan dimulai dari peringatan keamanan; sebagian besar sisanya menunggu hingga Juku berjalan. Hasilnya, termasuk yang tidak mencapai sasaran, akan dipublikasikan apa adanya.
