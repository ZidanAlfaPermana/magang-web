const formatterTanggal = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
});

export function formatTanggal(iso: string): string {
    return formatterTanggal.format(new Date(iso));
}