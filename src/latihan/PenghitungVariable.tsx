export function PenghitungVariable() {
    let jumlah = 0;

    function tambah() {
        jumlah = jumlah + 1;
        console.log(jumlah);
    }

    return <button onClick={tambah}>Jumlah: {jumlah}</button>;
}