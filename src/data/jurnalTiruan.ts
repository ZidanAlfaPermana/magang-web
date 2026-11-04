import type { Jurnal } from "../types/jurnal";

export const jurnalTiruan: Jurnal[] = [
    {
        id: 1,
        tanggal: "2026-11-02",
        kegiatan: "Belajar komponen React",
        hambatan: null,
        rencanaBesok: "Belajar props",
        statusReview: "sudah",
        lampiran: [{ url: "https://contoh.com/ss1.png", keterangan: "Hasil render" }],
    },
    {
        id: 2,
        tanggal: "2026-11-04",
        kegiatan: "Membuat PesertaCard",
        hambatan: "Bingung tipe props",
        rencanaBesok: "Belajar key",
        statusReview: "belum",
        lampiran: [],
    },
    {
        id: 3,
        tanggal: "2026-11-03",
        kegiatan: "Mencoba rendering bersyarat",
        hambatan: null,
        rencanaBesok: "Belajar union",
        statusReview: "belum",
        lampiran: [],
    },
];