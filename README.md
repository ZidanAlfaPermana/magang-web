# Magang Web

Aplikasi jurnal harian magang: peserta menulis jurnal, mentor me-review dengan catatan. Dibuat dengan React, TypeScript, dan Vite.

## Cara Menjalankan

```bash
git clone <url-repo>
cd magang-web
npm install
npm run dev
```

Perintah lain: `npm run lint` dan `npm run build`.

## Fitur

- Tambah jurnal lewat form dengan validasi di sisi klien (kolom opsional yang kosong disimpan sebagai `null`)
- Hapus jurnal dengan konfirmasi dua langkah
- Saklar peran Peserta dan Mentor. Mentor dapat me-review: status "sudah" wajib disertai catatan minimal 5 karakter, status "belum" boleh tanpa catatan
- Filter status dan pencarian kegiatan (ditunda 300 ms), pintasan `/` untuk memfokuskan pencarian
- Ringkasan total, sudah, dan belum direview dihitung dari data
- Data bertahan setelah muat ulang lewat localStorage dengan pemeriksaan bentuk data
- Judul tab menampilkan jumlah jurnal belum direview
- Dua keadaan kosong yang berbeda: belum ada jurnal, dan hasil filter kosong

## Rencana Pengembangan

- Menyambungkan aplikasi ke API untuk mengambil dan menyimpan jurnal, menggantikan data tiruan dan localStorage

## Struktur Folder

```
src/
├── components/
│   ├── ui/        Button, Alert, Kartu, Badge
│   ├── jurnal/    FormJurnal, DaftarJurnal, JurnalCard, PanelReview, RingkasanJurnal,
│   │              StatusBadge, PencarianJurnal, FilterJurnal
│   └── layout/    Header, SaklarPeran
├── hooks/         useLocalStorage, usePenundaan
├── data/          jurnal (data tiruan)
├── types/         peserta, jurnal
├── utils/         cx, format, validasiJurnal, guard, daftar
├── App.tsx
└── main.tsx
```

## Keputusan Desain

- **State jurnal diangkat ke `App`.** Ringkasan, daftar, dan judul tab membaca satu sumber data, sehingga tidak mungkin tidak sinkron.
- **Hasil filter, urutan, dan angka ringkasan adalah data turunan.** Dihitung saat render dan tidak disimpan sebagai state, jadi tidak ada salinan basi.
- **Validasi berupa fungsi murni** (`validasiFormJurnal`, `validasiReview`) yang terpisah dari komponen. Aturannya meniru DTO di backend, sedangkan server tetap penentu akhir.
- **Data dari localStorage diperiksa dengan type guard, bukan `as`.** Tipe TypeScript hilang saat runtime, dan isi localStorage bisa diubah pengguna.
- **Hanya client.ts yang memakai as**: undefined as T untuk respons 204 yang memang tanpa isi, dan json as T sebagai satu-satunya titik kepercayaan pada kontrak OpenAPI.

---

## Efek atau bukan?

| Kasus | Jawaban | Alasan |
|---|---|---|
| Menghitung jumlah jurnal belum direview | Data turunan | Bisa dihitung dari `jurnal` saat render, misalnya `jurnal.filter(...).length`. Tidak perlu state atau efek. |
| Mengosongkan form setelah jurnal berhasil disimpan | Event handler | Terjadi karena pengguna menekan Simpan. Reset state dipanggil di handler yang sama, bukan di efek yang memantau. |
| Menyimpan jurnal ke localStorage setiap berubah | Efek | Menyinkronkan state dengan sistem di luar React (penyimpanan browser), seperti di `useLocalStorage`. |
| Mengatur judul tab sesuai jumlah jurnal | Efek | `document.title` ada di luar React dan perlu disinkronkan setelah render. |
| Menampilkan "Berhasil disimpan" setelah Simpan ditekan | Event handler | Respons langsung terhadap aksi pengguna. Pesan diatur di handler, bukan efek yang menunggu perubahan state. |
| Mengurutkan daftar dari terbaru | Data turunan | Dihitung saat render dengan `[...jurnal].sort(...)`, tanpa state tambahan. |

---

## Catatan Belajar

<details>
<summary>Apa beda props, state, dan data turunan?</summary>


Props adalah data yang diberikan komponen induk dan hanya boleh dibaca, misalnya jurnal yang dikirim DaftarJurnal ke JurnalCard. 
State adalah data milik komponen itu sendiri yang bisa berubah lewat setter dan memicu tampilan digambar ulang, misalnya terbuka di JurnalCard yang menentukan apakah detail tampil. 
Data turunan adalah nilai yang dihitung dari props atau state yang sudah ada saat render, misalnya adaDetail di JurnalCard, yang dihitung dari props jurnal untuk menentukan apakah tombol detail ditampilkan.

<details>
<summary>Contoh dari aplikasi jurnalmu untuk masing-masing.</summary>

Props adalah jurnal (dan onHapus) yang diterima di parameter fungsi:
```tsx
export function JurnalCard({ jurnal, onHapus }: JurnalCardProps)
```
Nilainya dikirim oleh induknya:
```tsx
<JurnalCard jurnal={j} />
```

---

State adalah terbuka, di baris pertama dalam JurnalCard:

```tsx
const [terbuka, setTerbuka] = useState(false)
```

Nilainya diubah lewat setter saat tombol diklik:

```tsx
onClick={() => setTerbuka((t) => !t)}
```

---

Data turunan adalah jumlahLampiran dan adaDetail, tepat di bawah state:

```tsx
const jumlahLampiran = jurnal.lampiran?.length ?? 0;
const adaDetail =
Boolean(jurnal.hambatan) || Boolean(jurnal.catatanMentor) || jumlahLampiran > 0;
```
</details>
</details>

<details>
<summary>Gambar aliran data</summary>

```mermaid
flowchart TD
    App["App<br/>state: jurnal"]
    Header["Header"]
    Ringkasan["RingkasanJurnal"]
    Daftar["DaftarJurnal"]
    Card["JurnalCard<br/>state: terbuka"]

    App -- "namaPeserta" --> Header
    App -- "jurnal" --> Ringkasan
    App -- "jurnal, onHapus, onUbahStatus" --> Daftar
    Daftar -- "jurnal, onHapus, onUbahStatus" --> Card
    Card -. "onHapus(id), onUbahStatus(id, status)" .-> Daftar
    Daftar -. "onHapus(id), onUbahStatus(id, status)" .-> App
```

Garis penuh adalah data yang turun lewat props, sedangkan garis putus-putus adalah peristiwa yang naik lewat callback. `App` adalah pemilik tunggal data jurnal. Peristiwa klik naik sampai ke `App`, yang mengubah state dan membuat semua komponen anak menerima data terbaru.
</details>

<details>
<summary>Mengapa Key Harus Berupa ID Unik?</summary>

React mengenali item lewat key. Kalau key berupa indeks, yang dikenali hanya posisinya, bukan identitas item. 
Setelah “Satu” dihapus, “Dua” pindah ke indeks 0 dan memakai key yang tadinya milik “Satu”, sehingga React memakai ulang elemen li lama beserta isi input-nya dan AAA menempel di samping “Dua”. 
Dengan key berupa nilai unik dan stabil, React tahu elemen milik “Satu” memang dibuang dan elemen “Dua” dipertahankan beserta isinya. Itu sebabnya key harus berupa ID dari data, bukan indeks.
</details>

<details>
<summary>apa itu origin, apa yang diblokir browser, di mana konfigurasinya, dan kenapa curl tidak terkena.</summary>

Origin adalah gabungan skema, host, dan port, jadi localhost:5173 dan localhost:3000 dihitung sebagai dua origin berbeda. Browser menerapkan same-origin policy: skrip dari satu origin tidak boleh membaca respons origin lain kecuali server tujuan mengizinkannya lewat header Access-Control-Allow-Origin. Yang diblokir adalah pembacaan respons oleh browser, sedangkan server tetap menerima dan memprosesnya. Izin itu dikonfigurasi di server, yaitu di middleware cors lewat daftar CORS_ORIGINS. curl tidak terkena karena CORS hanya ditegakkan oleh browser, dan Swagger tidak terkena karena halamannya disajikan dari origin yang sama dengan API (localhost:3000).
</details>

<details>
<summary>Mengapa proxy Vite di development dan nginx di produksi bisa dipakai bergantian tanpa mengubah kode frontend?</summary>

Proxy Vite di development dan nginx di produksi memegang peran yang sama: menerima permintaan di origin yang sama dengan frontend, lalu meneruskan yang berawalan /api ke backend. Karena kode frontend hanya memakai alamat relatif seperti /api/v1/..., ia tidak perlu tahu alamat backend yang sebenarnya dan tidak berubah saat pindah lingkungan. Browser pun hanya melihat satu origin, sehingga CORS tidak terlibat. Yang berbeda hanya konfigurasi proxy-nya (vite.config.ts saat development, konfigurasi nginx saat produksi), bukan kode aplikasi.
</details>

<details>
<summary>Kenapa dokumen API yang longgar menghasilkan tipe frontend yang longgar? Apa hubungan hal itu dengan pelajaran "tulis dokumen yang akurat" di Minggu 16?</summary>

Tipe yang dihasilkan hanya menerjemahkan apa yang tertulis di dokumen OpenAPI. Di OpenAPI, properti dianggap wajib hanya jika disebut di required, jadi schema tanpa required menghasilkan tipe dengan semua properti opsional (id?: number), dan frontend terpaksa memeriksa nilai yang sebenarnya selalu ada. Dokumen yang tidak akurat (kurang required, lupa nullable, nama field salah) menghasilkan tipe yang longgar atau menyesatkan, dan kesalahan itu menjalar ke semua kode yang memakainya. Itulah hubungannya dengan pelajaran Minggu 16: dokumen harus akurat dan diuji terhadap server, karena sekarang dokumen menjadi sumber tipe dan bukan sekadar bacaan.
</details>

<details>
<summary>Apa itu Parameter property (constructor(readonly status: number))?</summary>

Parameter property (constructor(readonly status: number)) adalah sintaks TypeScript yang menghasilkan kode, bukan sekadar anotasi tipe. Template Vite mengaktifkan erasableSyntaxOnly, yaitu hanya mengizinkan sintaks yang bisa dihapus begitu saja saat tipe dibuang. Karena itu properti ditulis eksplisit dan diisi di dalam konstruktor.
</details>

<details>
<summary>Peta kode ke perilaku</summary>

| Kode error | Perilaku aplikasi | Dibangun |
|---|---|---|
| NETWORK_ERROR | Pesan koneksi dan tombol coba lagi | Kamis |
| UNAUTHORIZED | Arahkan ke halaman login | Minggu 20 |
| TOKEN_EXPIRED | Segarkan token otomatis, ulangi permintaan | Minggu 20 |
| INVALID_TOKEN | Hapus sesi, arahkan ke login | Minggu 20 |
| FORBIDDEN | Pesan tidak punya akses, sembunyikan aksi yang tidak boleh | Minggu 20 |
| NOT_FOUND | Pesan data tidak ditemukan | Kamis |
| VALIDATION_ERROR | Pesan di bawah kolom yang salah | Jumat |
| CONFLICT | Pesan di form (data sudah ada) | Jumat |
| RATE_LIMITED | Pesan tunggu, nonaktifkan tombol sementara | Rabu |
| PAYLOAD_TOO_LARGE | Pesan data terlalu besar | Rabu |
| INTERNAL_ERROR | Pesan umum dan kode laporan | Rabu |
| BAD_RESPONSE | Pesan umum dan kode laporan | Rabu |
| INVALID_JSON, UNKNOWN_ERROR | Pesan umum | Rabu |
</details>

<details>
<summary>Kenapa “kosong” bukan status</summary>

Kosong adalah hasil permintaan yang berhasil, bukan keadaan permintaan itu sendiri: server menjawab sukses dan datanya kebetulan tidak punya isi. Keputusan menampilkan “Belum ada jurnal” adalah urusan tampilan dan cukup dibaca dari data.daftar.length === 0. Kalau dijadikan status ketiga, hook harus memeriksa isi data, dan union bisa memuat keadaan ganjil seperti status “kosong” yang membawa data berisi.
</details>

<details>
<summary>Kesimpulan dari race condition</summary>

Tanpa pembatalan dan pencocokan kunci, jawaban yang lebih lambat dari permintaan lama bisa tiba terakhir dan menimpa data permintaan terbaru. Layar akhirnya menampilkan data yang tidak sesuai dengan halaman yang dipilih pengguna.
</details>

<details>
<summary>Sebutkan tiga masalah yang harus kamu tangani sendiri saat mengambil data di useEffect yang tidak ada jika datanya statis. Menurutmu alat seperti apa yang seharusnya mengurusnya untukmu?</summary>

Saat mengambil data di useEffect, tiga hal harus kita tangani sendiri yang tidak ada pada data statis. Pertama, race condition: jawaban lama bisa tiba terakhir dan menimpa data baru, sehingga permintaan harus dibatalkan dan hasilnya dicocokkan dengan permintaan yang sedang berlaku. Kedua, keadaan memuat, gagal, dan berhasil harus dikelola konsisten, termasuk “coba lagi”. Ketiga, pembatalan saat komponen dilepas dan efek yang berjalan dua kali di StrictMode. Alat seperti TanStack Query seharusnya mengurusnya, karena ia menangani pembatalan, status, percobaan ulang, dan penyimpanan hasil sehingga komponen cukup membaca hasilnya.
</details>

<details>
<summary>perbedaan antara replace dengan tanpa replace saat menekan tombol Back</summary>

Navigate dengan replace mengganti entri riwayat saat ini, jadi / hilang dari riwayat dan digantikan /jurnal. Saat pengguna menekan Back dari /jurnal, ia kembali ke halaman sebelum /. Tanpa replace, / tetap ada di riwayat, sehingga Back membawa pengguna ke / yang langsung mengarahkannya lagi ke /jurnal, dan ia terjebak di halaman yang sama.
</details> 

<details>
<summary>Kenapa Link tidak boleh diganti dengan elemen a pada aplikasi yang menyimpan token di memori? Apa yang terjadi pada token itu bila kamu memakai elemen a?</summary>

Link hanya mengganti tampilan di dalam aplikasi yang sama lewat History API, sehingga JavaScript, state, dan variabel di memori tetap hidup. Elemen a meminta halaman baru ke server, jadi seluruh aplikasi dimuat ulang dari awal. Token di aplikasi ini disimpan di variabel memori (accessToken di client.ts), sehingga saat halaman dimuat ulang variabel itu kembali null dan pengguna dianggap belum login. Akibatnya setiap klik elemen a pada menu membuat pengguna harus login lagi.
</details>