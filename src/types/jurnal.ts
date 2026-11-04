export interface Lampiran {
    url: string;
    keterangan?: string;
}

export interface Jurnal {
    id: number;
    tanggal: string;
    kegiatan: string;
    hambatan: string | null;
    rencanaBesok: string;
    statusReview: "belum" | "sudah";
    lampiran: Lampiran[];
}