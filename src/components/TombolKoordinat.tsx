import type { MouseEvent } from "react";
import { Button } from "./ui/Button";

export function TombolKoordinat() {
    function klik(e: MouseEvent<HTMLButtonElement>) {
        console.log("Diklik di posisi", e.clientX, e.clientY);
    }

    return <Button onClick={klik}>Cetak koordinat</Button>;
}