import { request } from "./client";
import type { JurnalBaru, JurnalListResponse, JurnalResponse } from "./types";

interface OpsiDaftar {
    halaman?: number;
    signal?: AbortSignal;
}

export async function ambilJurnalSaya({ halaman, signal }: OpsiDaftar = {}) {
    const body = await request<JurnalListResponse>("GET", "/jurnal/me", {
        query: { page: halaman, limit: 5 },
        signal,
    });
    return { daftar: body.data, meta: body.meta };
}

export async function buatJurnal(data: JurnalBaru) {
    const body = await request<JurnalResponse>("POST", "/jurnal", { body: data });
    return body.data;
}

export async function ambilJurnal(id: number, { signal }: { signal?: AbortSignal } = {}) {
    const body = await request<JurnalResponse>("GET", `/jurnal/${id}`, { signal });
    return body.data;
}