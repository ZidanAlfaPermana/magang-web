/*
// Tidak Murni

let urutan = 0;

function NomorUrut() {
    urutan = urutan + 1;                    // efek samping di dalam render
    return <p>Nomor {urutan}</p>;
}*/
interface NomorUrutProps {
    nomor: number;
}

export default function NomorUrut({ nomor }: NomorUrutProps) {
    return <span>#{nomor}</span>;
}