import type { FieldError } from "../api/types";
import type { FormJurnalErrors, FormJurnalState } from "./validasiJurnal";

function adalahKolom<K extends string>(dikenal: readonly K[], field: string): field is K {
    return dikenal.some((k) => k === field);
}

export function petakanDetail<K extends string>(
    detail: readonly FieldError[],
    dikenal: readonly K[]
): { kolom: Partial<Record<K, string>>; umum: string[] } {
    const kolom: Partial<Record<K, string>> = {};
    const umum: string[] = [];

    for (const d of detail) {
        if (adalahKolom(dikenal, d.field)) {
            kolom[d.field] = d.pesan;
        } else {
            umum.push(`${d.field}: ${d.pesan}`);
        }
    }

    return { kolom, umum };
}

const KOLOM_JURNAL: ReadonlyArray<keyof FormJurnalState> = [
    "kegiatan",
    "hambatan",
    "rencanaBesok",
    "linkCommit",
];

export function detailKeErrors(detail: readonly FieldError[]): {
    kolom: FormJurnalErrors;
    umum: string[];
} {
    return petakanDetail(detail, KOLOM_JURNAL);
}