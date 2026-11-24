export function bacaNomorPositif(mentah: string | null | undefined): number | null {
    if (mentah === null || mentah === undefined || mentah.trim() === "") return null;
    const nomor = Number(mentah);
    return Number.isInteger(nomor) && nomor >= 1 ? nomor : null;
}