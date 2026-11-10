import { useState } from "react";
import { Button } from "../components/ui/Button";

export function Snapshot() {
    const [jumlah, setJumlah] = useState(0);

    function tambahTigaSalah() {
        setJumlah(jumlah + 1);
        console.log("setelah setter pertama:", jumlah);
        setJumlah(jumlah + 1);
        console.log("setelah setter kedua:", jumlah);
        setJumlah(jumlah + 1);
        console.log("setelah setter ketiga:", jumlah);
    }

    function tambahTigaBenar() {
        setJumlah((j) => j + 1);
        setJumlah((j) => j + 1);
        setJumlah((j) => j + 1);
    }

    return (
        <div>
            <p>Jumlah: {jumlah}</p>
            <Button onClick={tambahTigaSalah}>+3 (salah)</Button>
            <Button onClick={tambahTigaBenar}>+3 (benar)</Button>
            <Button variant="danger" onClick={() => setJumlah(0)}>
                Reset
            </Button>
        </div>
    );
}