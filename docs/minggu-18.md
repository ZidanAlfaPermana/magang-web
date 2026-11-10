SOAL 2 — Variabel biasa gagal
Tulis Penghitung versi let seperti contoh. Buktikan layar tidak berubah. Tulis 2 alasannya.
- React tidak tahu variabel biasa berubah, jadi komponen tidak digambar ulang.
- Kalaupun digambar ulang (misalnya karena induknya render ulang), fungsi komponen dijalankan dari awal sehingga jumlah kembali 0.

SOAL 4 — Snapshot
Tulis tambahTigaSalah dan tambahTigaBenar. Catat hasil akhirnya. Tambahkan console.log
tepat setelah setJumlah dan jelaskan kenapa nilainya "ketinggalan".
- jumlah adalah foto nilai pada render ini. Setter tidak mengubah variabel itu. Ia hanya meminta React menggambar ulang dengan nilai baru, dan nilai baru baru ada di render berikutnya. Karena ketiga baris memakai foto yang sama (0 + 1), ketiganya meminta nilai 1. Bentuk fungsi (j) => j + 1 memakai nilai terbaru dari antrean, jadi hasilnya bertambah tiga.

SOAL 7 — Ketik state
Tulis 5 pemanggilan useState dengan tipe yang tepat (string, boolean, array objek, objek atau null, union literal).
Jelaskan kenapa useState([]) bermasalah di TypeScript.
- array kosong tidak memberi petunjuk isinya, jadi TypeScript (mode strict) menyimpulkan never[], yaitu array yang tidak boleh berisi apa pun.