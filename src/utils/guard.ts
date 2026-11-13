import type { FilterStatus, Jurnal } from "../types/jurnal";

export function adalahFilterStatus(x: string): x is FilterStatus {
    return x === "semua" || x === "belum" || x === "sudah";
}

function teksOpsional(x: object, kunci: string): boolean {
    const nilai: unknown = Reflect.get(x, kunci);
    return nilai === undefined || nilai === null || typeof nilai === "string";
}

function lampiranValid(x: object): boolean {
    const nilai: unknown = Reflect.get(x, "lampiran");
    if (nilai === undefined || nilai === null) return true;
    return (
        Array.isArray(nilai) &&
        nilai.every((l) => typeof l === "object" && l !== null && typeof Reflect.get(l, "url") === "string")
    );
}

function adalahJurnal(x: unknown): x is Jurnal {
    return (
        typeof x === "object" &&
        x !== null &&
        "id" in x && typeof x.id === "number" &&
        "pesertaId" in x && typeof x.pesertaId === "number" &&
        "kegiatan" in x && typeof x.kegiatan === "string" &&
        "statusReview" in x && (x.statusReview === "belum" || x.statusReview === "sudah") &&
        "createdAt" in x && typeof x.createdAt === "string" &&
        teksOpsional(x, "hambatan") &&
        teksOpsional(x, "linkCommit") &&
        teksOpsional(x, "catatanMentor") &&
        lampiranValid(x)
    );
}

export const adalahDaftarJurnal = (x: unknown): x is Jurnal[] =>
    Array.isArray(x) && x.every(adalahJurnal);