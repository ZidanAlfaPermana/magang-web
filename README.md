## Apa bedanya pendekatan imperatif dan deklaratif?

Pendekatan imperatif adalah cara pemrograman di mana kita menginstruksikan komputer langkah demi langkah secara mendetail mengenai bagaimana suatu tugas harus dikerjakan, layaknya memberikan resep masakan lengkap dengan urutannya. Sebaliknya, pendekatan deklaratif adalah cara pemrograman yang hanya berfokus pada apa hasil akhir yang ingin dicapai tanpa harus merinci instruksi langkah demi langkah secara manual, mirip seperti memesan makanan di restoran di mana kita hanya menyebutkan menu yang diinginkan dan membiarkan pihak lain yang mengerjakannya.

## Kenapa frontend dan backend dibuat sebagai dua aplikasi terpisah?

pemisahan frontend dan backend menjadi dua aplikasi yang berbeda didasari oleh prinsip agar masing-masing bagian memiliki tanggung jawab yang spesifik dan terisolasi. Frontend bertanggung jawab penuh terhadap tampilan visual dan interaksi pengguna di layar, sedangkan backend fokus mengelola logika bisnis, pemrosesan data, serta keamanan di balik layar. Dengan pemisahan ini, pengembangan aplikasi menjadi jauh lebih fleksibel karena satu sistem backend yang sama dapat digunakan secara bersamaan untuk melayani berbagai jenis frontend, seperti situs web, aplikasi Android, dan aplikasi iOS, tanpa harus menulis ulang kode pemrosesan datanya dari awal.

---

## Kenapa key sebaiknya ID dari database dan bukan indeks array?

Key membantu React mengenali item mana yang sama di antara dua render. 
ID dari database melekat pada datanya sendiri sehingga tidak berubah ketika daftar diurutkan ulang, ditambah, atau dihapus. 
Indeks hanya menunjuk posisi: saat item pertama dihapus, item kedua pindah ke indeks 0 dan React mengira itu item yang sama, 
sehingga kondisi seperti isi input bisa menempel ke item yang salah. Indeks baru aman kalau daftarnya statis dan urutannya tidak pernah berubah.