// src/api/types.ts: alias yang nyaman dipakai di seluruh aplikasi
import type { components } from "./schema";

type Skema = components["schemas"];

export type Peserta = Skema["Peserta"];
export type Jurnal = Skema["Jurnal"];
export type StatusReview = Jurnal["statusReview"];       // union "belum" | "sudah" turunan dari enum di dokumen
export type JurnalBaru = Skema["CreateJurnalRequest"];
export type PaginationMeta = Skema["PaginationMeta"];
export type FieldError = Skema["FieldError"];
export type ErrorResponse = Skema["ErrorResponse"];
export type LoginResponse = Skema["LoginResponse"];
export type JurnalListResponse = Skema["JurnalListResponse"];
export type JurnalResponse = Skema["JurnalResponse"];
export type JurnalListTotalResponse = Skema["JurnalListTotalResponse"];