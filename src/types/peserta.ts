// src/types/peserta.ts: cerminan schema Peserta di dokumentasi API
import type { Peserta } from "../api/types";

export interface ProfilBaru {
    nama: string;
    telepon: string | null;
}

export type Peran = Peserta["role"];