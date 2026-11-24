import type { ApiError } from "./errors";

export function pesanUntukPengguna(error: ApiError): string {
    if (error.kode === "BAD_RESPONSE" && error.status >= 500) {
        return "Server tidak dapat dihubungi saat ini. Coba lagi beberapa saat lagi.";
    }
    switch (error.kode) {
        case "NETWORK_ERROR":
            return "Tidak dapat terhubung ke server. Periksa koneksi internetmu lalu coba lagi.";
        case "UNAUTHORIZED":
        case "TOKEN_EXPIRED":
        case "INVALID_TOKEN":
            return "Sesimu berakhir atau belum login. Silakan login kembali.";
        case "FORBIDDEN":
            return "Kamu tidak memiliki akses untuk aksi ini.";
        case "NOT_FOUND":
            return "Data yang dicari tidak ditemukan.";
        case "RATE_LIMITED":
            return "Terlalu banyak percobaan. Tunggu beberapa saat lalu coba lagi.";
        case "PAYLOAD_TOO_LARGE":
            return "Data yang dikirim terlalu besar.";
        case "VALIDATION_ERROR":
            return "Data yang dikirim belum valid. Periksa kembali isianmu.";
        default:
            return "Terjadi kesalahan di server. Coba lagi beberapa saat lagi.";
    }
}

export function kodeLaporan(error: ApiError): string | null {
    return error.requestId ? `Kode laporan: ${error.requestId}` : null;
}

export function pesanLogin(error: ApiError): string {
    if (error.kode === "UNAUTHORIZED") {
        return "Email atau password salah.";
    }
    return pesanUntukPengguna(error);
}