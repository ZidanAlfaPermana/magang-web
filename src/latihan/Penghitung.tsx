import { useState } from "react";
import { Button } from "../components/ui/Button";

export function Penghitung() {
    const [jumlah, setJumlah] = useState(0);

    return (
        <div>
            <p>Jumlah: {jumlah}</p>
            <Button onClick={() => setJumlah((j) => j + 1)}>Tambah</Button>
            <Button
                variant="secondary"
                disabled={jumlah === 0}
                onClick={() => setJumlah((j) => Math.max(0, j - 1))}
            >
                Kurang
            </Button>
            <Button variant="danger" onClick={() => setJumlah(0)}>
                Reset
            </Button>
        </div>
    );
}