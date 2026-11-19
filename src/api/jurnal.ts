import { request } from "./clients";
import type { JurnalBaru, JurnalListTotalResponse, JurnalResponse } from "./types";

interface OpsiDaftar {
    signal?: AbortSignal;
}

export async function ambilJurnalSaya({ signal }: OpsiDaftar = {}) {
    const body = await request<JurnalListTotalResponse>("GET", "/jurnal/me", { signal });
    return { daftar: body.data, total: body.total };
}

export async function buatJurnal(data: JurnalBaru) {
    const body = await request<JurnalResponse>("POST", "/jurnal", { body: data });
    return body.data;
}