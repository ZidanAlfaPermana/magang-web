import type { Peserta } from "../types/peserta";

export function tambahPeserta(daftar: readonly Peserta[], baru: Peserta): Peserta[] {
    return [...daftar, baru];
}

export function hapusPeserta(daftar: readonly Peserta[], id: number): Peserta[] {
    return daftar.filter((p) => p.id !== id);
}

export function gantiPeserta(
    daftar: readonly Peserta[],
    id: number,
    pengganti: Peserta
): Peserta[] {
    return daftar.map((p) => (p.id === id ? pengganti : p));
}

export function ubahStatusPeserta(
    daftar: readonly Peserta[],
    id: number,
    status: Peserta["status"]
): Peserta[] {
    return daftar.map((p) => (p.id === id ? { ...p, status } : p));
}

export function urutkanPesertaDariNama(daftar: readonly Peserta[]): Peserta[] {
    return [...daftar].sort((a, b) => a.nama.localeCompare(b.nama, "id"));
}