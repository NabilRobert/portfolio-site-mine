---
title: "MCP-backbone: server basis data yang tidak dapat disalahgunakan oleh AI"
summary: Server MCP yang memungkinkan model AI mengajukan kueri ke Postgres secara aman.
category: portfolio
order: 1
status: live
stack: Python · FastAPI · MCP SDK · Postgres
links:
  - { label: Repositori, href: "https://github.com/NabilRobert/MCP-backbone", primary: true }
  - { label: Situs daring, href: "https://mcp.my.id" }
  - { label: Red team, href: "https://github.com/NabilRobert/MCP-backbone/blob/main/RED_TEAM.md" }
  - { label: Tolok ukur, href: "https://github.com/NabilRobert/MCP-backbone/blob/main/BENCHMARK.md" }
screenshots:
  - src: step1.gif
    still: step1-still.png
    alt: "Claude Code memuat skill query-database, memanggil list_tables dan describe_table, lalu menjawab dengan tiga film yang paling sering disewa."
    caption: "Ajukan pertanyaan"
    description: "Demo dimulai di Claude Code, asisten AI yang berjalan di terminal, dengan pertanyaan sederhana tentang basis data contoh penyewaan film: tiga film mana yang paling sering disewa, dan berapa kali masing-masing? Claude memuat skill MCP-backbone, memeriksa tabel apa saja yang ada dan bagaimana strukturnya, serta meminta persetujuan pengguna sebelum setiap langkah dijalankan. Baru setelah itu Claude menulis satu kueri baca-saja. Jawabannya ditampilkan dalam bentuk tabel: Cat Coneheads (disewa 123 kali), Deer Virginian (112), dan Muscle Bright (107). Claude juga menjelaskan bahwa ia memeriksa dua film berikutnya untuk memastikan tidak ada nilai yang sama di peringkat ketiga."
  - src: step2.gif
    still: step2-still.png
    alt: "Ketika diminta menjalankan DELETE FROM rental, server menolaknya karena hanya pernyataan SELECT yang diizinkan, sehingga tidak ada data yang terhapus."
    caption: "Coba ubah data"
    description: "Di awal, pengguna mengulangi pertanyaan pertama. Server membatasi jumlah kueri yang dapat dijalankan dalam satu jam, sehingga Claude memberikan jawaban sebelumnya alih-alih menjalankan kueri lagi. Selanjutnya, pengguna meminta Claude menjalankan pernyataan yang akan menghapus satu catatan penyewaan. Permintaan itu sampai ke server, yang menolaknya karena hanya pernyataan SELECT tunggal yang diizinkan, sehingga tidak ada data yang terhapus. Claude melaporkan penolakan itu apa adanya dan tidak mencari cara untuk menghindarinya; Claude menjelaskan bahwa pemblokiran tersebut merupakan pengaman yang disengaja, dan bahwa mengubah data memerlukan akun terpisah yang memiliki hak tulis."
  - src: step3.png
    alt: "Jejak audit di konsol: DELETE yang ditolak ditampilkan dengan warna merah beserta alasannya, kueri yang berhasil beserta biayanya, dan grafik 14 hari."
    caption: "Periksa apa yang dijalankan"
    description: "Semua yang dilakukan AI tercatat, termasuk hal yang tidak diizinkan untuk dilakukannya. Jejak audit di konsol menampilkan grafik kueri selama empat belas hari terakhir, yang dipisahkan antara kueri yang berhasil dan kueri yang ditolak, gagal, atau melewati batas waktu. Di bawah grafik, setiap kueri dicantumkan beserta waktu, status, SQL lengkap, perkiraan biaya, dan alasannya apabila ditolak. Kedua momen dari demo tampak di sini: DELETE yang ditolak, ditandai merah beserta alasannya, dan kueri berhasil yang menjawab pertanyaan tadi. Daftar ini dapat disaring menurut status atau teks kueri."
---

Server MCP yang memungkinkan model AI menelusuri dan mengajukan kueri ke basis data Postgres secara aman.

- Setiap kueri diurai, diperiksa biayanya, dijalankan dalam mode baca saja, dan dicatat.
- Basis data itu sendiri menolak operasi penulisan, sehingga kesalahan pada validator tidak dapat menyebabkan hilangnya data.
- **Bukti:** rangkaian uji *red team* yang bersifat adversarial serta 141 pengujian terhadap basis data Postgres sungguhan. Dalam tolok ukur, `gpt-5-mini` menjawab 29 dari 30 pertanyaan dengan benar di bawah penilaian yang ketat.

Sistem ini menjadi fondasi bagi dua proyek lainnya. *Harness* evaluasi mengukur agen yang menggunakannya, dan skema alatnya diperbaiki setelah *harness* tersebut menemukan bahwa skema itu tidak kompatibel dengan mode ketat (*strict mode*) OpenAI.
