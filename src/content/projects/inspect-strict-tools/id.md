---
title: "Inspect AI: skema alat mode strict, dilaporkan ke hulu"
summary: Bug yang ditemukan oleh harness evaluasi dalam portofolio ini, diperbaiki di servernya sendiri, lalu dilaporkan ke kerangka kerja sumber terbuka Inspect AI.
category: opensource
order: 7
status: proposed
stack: Python · Inspect AI · OpenAI API · MCP
coverAlt: "Sampul bertuliskan “Strict” di atas kartu berisi baris-baris skema alat, salah satunya disorot, dengan cap merah “400”, dan anak panah yang naik ke tanda isu terbuka; keterangannya “Issue #6093 · Proposed” (isu #6093, diusulkan), dengan kata “Upstream” di bagian bawah."
links:
  - { label: "Isu #6093", href: "https://github.com/UKGovernmentBEIS/inspect_ai/issues/6093", primary: true }
  - { label: Perbaikan di MCP-backbone, href: "https://github.com/NabilRobert/MCP-backbone/pull/3" }
---

Kontribusi sumber terbuka yang berawal dari pekerjaan dalam portofolio ini sendiri. Ketika harness evaluasi menjalankan agen terhadap MCP-backbone melalui Inspect AI, kerangka kerja yang banyak dipakai untuk mengevaluasi model AI, setiap permintaan gagal dengan galat bahkan sebelum modelnya berjalan.

- **Penyebabnya:** penyedia Inspect yang kompatibel dengan OpenAI menandai setiap alat sebagai *strict* secara bawaan, padahal mode strict OpenAI hanya menerima skema alat yang semua argumennya wajib. Alat dengan argumen opsional atau bernilai bawaan, yang sangat umum, membuat seluruh permintaan gagal.
- **Diperbaiki di sisi sendiri:** MCP-backbone kini memublikasikan skema yang sesuai dengan mode strict, disertai pengujian yang gagal jika ada skema yang tidak sesuai; untuk sementara, harness mematikan mode strict.
- **Dilaporkan ke hulu:** MCP Python SDK sebelumnya telah menolak arah perubahan ini, sehingga laporan diajukan ke Inspect AI. Laporan itu menunjukkan baris-baris yang tepat, disertai cara mereproduksinya tanpa kunci API, dan mengusulkan perbaikan: memeriksa skema setiap alat sebelum menandainya sebagai strict. Jalur Responses API milik Inspect sendiri sudah menghindari masalah ini.
- **Status:** diusulkan. Isu tersebut masih terbuka dan menunggu triase; pull request baru akan diajukan setelah pengelola menerimanya.

Ditemukan oleh harness evaluasi saya, diperbaiki di server saya, dan dilaporkan ke hulu.
