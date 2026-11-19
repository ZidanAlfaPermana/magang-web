import type { ApiError } from "../api/errors";

export type StatusPermintaan<T> =
    | { status: "memuat" }
    | { status: "berhasil"; data: T }
    | { status: "gagal"; error: ApiError };