import type { ApiError } from "../api/errors";

export type StatusPermintaan<T> =
    | { status: "memuat" }
    | { status: "berhasil"; data: T }
    | { status: "gagal"; error: ApiError };

export type StatusKirim =
    | { status: "diam" }
    | { status: "mengirim" }
    | { status: "gagal"; error: ApiError };