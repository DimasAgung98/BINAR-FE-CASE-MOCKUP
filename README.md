# FRONT END TEST CASE MOCK UP BINAR ACADEMY
> DIMAS AGUNG

- Front end test case mockup by Binar Academy

> MODULE USED
```
    "axios"
    "bootstrap"
    "react"
    "react-bootstrap"
    "react-dom"
    "react-icons"
    "react-router-dom"
    "react-scripts"
    "sweetalert2"
```

- Lakukan clone repository menggunakan terminal pada directory yang diinginkan    dengan perintah berikut :

```sh
git clone git@github.com:DimasAgung98/BINAR-FE-CASE-MOCKUP.git
```

- Buka VsCode dan jalankan perintah berikut di terminal :

```sh
npm install
```

- syntax ini digunakan untuk menginstall semua module yang diperlukan


- Jalankan project menggunakan perintah :

```sh
npm run start
```
```
NOTE:
1. Halaman isi/data halaman dashboard hanya bisa diakses ketika sudah login
2. Pastikan untuk register terlebih dahulu sebelum login
```
> FITURE
1. REGISTER dengan melengkapi form dengan `nama`, `email`, dan `password`
2. LOGIN dengan memasukan `email` dan `username`
3. CREATE DATA dengan `click` button `create new`
4. EDIT DATA dengan `click` icon `edit` pada bagian kanan atas setiap product
5. DELETE DATA dengan `click` icon `delete` pada bagian kanan atas setiap product

# JAWABAN UNTUK SOAL NOMOR 4
> Dari dokumen https://testbinar.docs.apiary.io/, menurut anda, apakah ada desain yang
kurang maupun keliru? Jika ada tuliskan kekurangan-kekurangan desain tersebut.

```

- Pada bagian Edit product dan Delete Product ditemukan sebuah masalah yaitu alamat API yang di block oleh CORS. hal ini terjadi karena pada backend API Edit dan Delete tidak memberikan sebuah hak ases bagi alamat atau url lain untuk mengakses API Edit dan Delete. Hal ini bisa diatasi dengan menerapkan perantara atau middleware CORS (Cross-Origin Resource Sharing). CORS disini berperan sebagai perantara yang mengizinkan sebuah request untuk mengirimkan method (POST, GET, PUT, DELETE) antara client dan server.

- Melihat dari bagian parameter saat melakukan EDIT PRODUCT, terdapat parameter body yang hanya berisikan "name" saja. seharusnya jika sebuah product memiliki attribute "name", "price", dan "imageurl" maka parameter body harusnya mencakup tiga hal tersebut. Karena pada dasarnya ketika melakukan EDIT product, user bisa melakukan update terhadap nama produk, harga produk, dan gambar product (imageurl). Hal ini diketahui karena pada bagian design front end terdapat 3 input form yang meliputi name, price, dan imageurl. Namun pada docs api hanya menerima 1 attribut saja yaitu name.

```