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
    caption: "Dasbor"
    description: "Ini adalah halaman pertama setelah masuk ke demo. Di bagian atas terdapat menu, pilihan bahasa, dan penanda “Demo mode” sebagai pengingat bahwa semua yang tampil di sini menggunakan data contoh. Kartu-kartunya merangkum tiga bulan terakhir: tayangan, klik, rasio klik-tayang, biaya, pangsa tayangan, dan skor pengoptimalan dari Google, dan rentang waktunya dapat diubah dari satu minggu hingga lima tahun. Di bawahnya, grafik tren menampilkan tayangan per hari dan dapat dialihkan ke klik, biaya, atau konversi. Di kiri bawah, kampanye diurutkan menurut konversi; di sebelah kanan terdapat laporan AI hari itu, dengan tab untuk Anna, Rico, dan Sammy yang masing-masing telah disetujui oleh Ciri."
  - src: why-this-trail.webp
    alt: "Laporan harian dalam tiga kolom, yaitu analisis Anna, rekomendasi Rico, dan ringkasan Sammy, masing-masing bernilai A dan disetujui oleh Ciri, dengan panel “Why this?” terbuka di sampingnya yang menampilkan draf aslinya."
    caption: "Laporan harian dan “Why this?”"
    description: "Laporan harian menampilkan hasil kerja ketiga agen secara berdampingan: analisis Anna, rekomendasi Rico, dan ringkasan Sammy. Baris di atasnya menunjukkan alurnya: analisis menjadi dasar rekomendasi, lalu ringkasan merangkum keduanya. Setiap kolom memuat nilai dan persetujuan dari Ciri, dengan dua tautan di bawahnya: “Why this?” untuk menelusuri asal-usul teksnya, dan “Ask about this” untuk mengajukan pertanyaan lanjutan. Di sini, “Why this?” dibuka pada analisis Anna. Panel di sebelah kanan dimulai dari draf awal, lalu berlanjut ke kritik Ciri hingga versi yang disetujui."
  - src: learning-grade-trend.webp
    alt: "Halaman Learning: grafik batang bertumpuk berisi putusan Ciri atas laporan akhir Anna selama delapan minggu, yang awalnya sebagian besar ditandai dan pada minggu terakhir sebagian besar disetujui."
    caption: "Halaman Learning"
    description: "Halaman Learning menunjukkan bagaimana penilaian agen pengkritik berkembang dari waktu ke waktu. Grafiknya menghitung laporan akhir setiap minggu menurut putusan Ciri: hijau untuk disetujui tanpa catatan, kuning untuk disetujui dengan catatan, merah untuk ditandai, dan abu-abu untuk yang tidak ditinjau. Tampilannya dapat dialihkan antara Anna, Rico, dan Sammy, serta antara putusan dan nilai mutu. Di sini, untuk Anna, hampir setiap minggu hingga akhir September berwarna merah. Garis putus-putus pada 28 September menandai perubahan aturan persetujuan, dan catatan di bawahnya menegaskan bahwa bertambahnya persetujuan setelah tanggal itu belum dengan sendirinya membuktikan bahwa laporannya membaik. Di bagian bawah, kriteria penilaian menjelaskan arti setiap nilai dari A hingga F."
  - src: run-inspector-overview.webp
    alt: "Run Inspector untuk satu eksekusi harian: ringkasan durasi, jumlah panggilan model, token, dan biaya, diikuti linimasa setiap langkah, mulai dari penyiapan data hingga pekerjaan setiap agen."
    caption: "Run Inspector"
    description: "Setiap eksekusi pipeline dapat dibuka di Run Inspector. Kartu di bagian atas memuat angka keseluruhan eksekusi: durasinya, berapa kali model bahasa dipanggil, token yang dikirim dan diterima, biaya, serta jumlah langkahnya. Di bawahnya, linimasa mencantumkan setiap langkah secara berurutan, mulai dari penyiapan data hingga pekerjaan setiap agen dan setiap panggilan model di dalamnya, dengan batang yang menunjukkan kapan setiap langkah berjalan dan berapa lama. Setiap langkah dapat dibuka untuk melihat apa yang sebenarnya terjadi."
  - src: run-inspector-model-call.webp
    alt: "Run Inspector dengan salah satu panggilan model Anna terbuka, yang menampilkan jumlah token, biaya, dan pengaturannya, serta prompt dan respons lengkapnya."
    caption: "Di dalam satu panggilan model"
    description: "Di sini, satu panggilan model dalam langkah Anna dibuka. Tampilan ini menunjukkan pengaturan dan jumlah token panggilan tersebut, lalu instruksi lengkap yang diterima agen dan respons lengkap yang diberikannya. Isi laporan tidak perlu diterima begitu saja: setiap kalimat dapat ditelusuri kembali ke panggilan yang menghasilkannya."
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
