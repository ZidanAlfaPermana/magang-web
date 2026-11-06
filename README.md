# Magang Web

Halaman statis untuk melihat jurnal harian peserta magang beserta ringkasan status review. Dibuat dengan React, TypeScript, dan Vite.

## Cara Menjalankan

```bash
git clone <url-repo>
cd magang-web
npm install
npm run dev
```

Perintah lain: `npm run lint` dan `npm run build`.

## Struktur Folder

```text
src/
├── components/
│ ├── ui/ Button, Alert, Badge, Kartu (generik)
│ ├── jurnal/ JurnalCard, DaftarJurnal, StatusBadge, RingkasanJurnal
│ └── layout/ Header
├── data/ data tiruan (sementara)
├── types/ peserta.ts, jurnal.ts
├── utils/ cx.ts, format.ts
├── pages/ GaleriKomponen
└── App.tsx menyusun halaman
```

## Keputusan Desain

- **Komponen ui dipisah dari komponen jurnal.** Komponen ui tidak mengenal istilah jurnal sehingga bisa dipakai ulang di fitur lain, sedangkan komponen jurnal yang memakainya.
- **Ringkasan dihitung dari array saat render.** Angka total, sudah, dan belum direview tidak disimpan terpisah, jadi tidak bisa tidak sinkron dengan datanya.
- **Pengurutan memakai salinan array.** `[...jurnal].sort(...)` menjaga data asli tidak berubah, sehingga komponen tetap murni.