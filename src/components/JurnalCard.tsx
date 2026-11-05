// Komponen anak "memberi kabar" ke induk lewat FUNGSI yang dikirim sebagai props
import type {Jurnal} from "../types/jurnal.ts";
import {Button} from "./ui/Button.tsx";

interface JurnalCardProps {
    jurnal: Jurnal;
    onHapus?: (id: number) => void;
}

export function JurnalCard({ jurnal, onHapus }: JurnalCardProps) {
    return (
        <article>
            <p>{jurnal.kegiatan}</p>
            {onHapus && (
                <Button
                    variant="danger"
                    ukuran="sm"
                    aria-label={`Hapus jurnal: ${jurnal.kegiatan}`}
                    onClick={() => onHapus(jurnal.id)}
                >
                    Hapus
                </Button>
            )}
        </article>
    );
}

// Pemakaian (induk menentukan apa yang terjadi):
// <JurnalCard jurnal={j} onHapus={(id) => console.log("hapus", id)} />