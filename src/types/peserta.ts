// src/types/peserta.ts: cerminan schema Peserta di dokumentasi API
export interface Peserta {
    id: number;
    nama: string;
    sekolah: string;
    email: string;
    fase: number;
    status: "aktif" | "lulus" | "berhenti";
    role: "peserta" | "mentor";
}

export interface ProfilBaru {
    nama: string;
    telepon: string | null;
}