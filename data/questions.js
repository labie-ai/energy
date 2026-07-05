/* ============================================================
   ENERGY MISSION — BANK SOAL
   Mapel: IPAS Kelas VI SD
   Struktur data sengaja dibuat modular & mudah ditambah.
   Untuk menambah soal baru, cukup tambahkan object baru
   pada array misi terkait mengikuti format yang sudah ada.
   ============================================================ */

const QUESTION_BANK = {

  /* =========================================================
     MISI 1 — Identifikasi Gambar Energi Fosil (Pilihan Ganda)
     ========================================================= */
  misi1: [
    { id: "m1-01", img: "assets/images/pltu-batubara.svg", question: "Gambar di atas menunjukkan sumber energi apa?", options: ["Batu bara (fosil)", "Panel surya", "Angin", "Air terjun"], answer: 0 },
    { id: "m1-02", img: "assets/images/sumur-minyak.svg", question: "Alat pada gambar digunakan untuk mengambil...", options: ["Air tanah", "Minyak bumi (fosil)", "Gas alam", "Energi angin"], answer: 1 },
    { id: "m1-03", img: "assets/images/gas-alam.svg", question: "Gambar di atas adalah lambang dari sumber energi...", options: ["Gas alam (fosil)", "Cahaya matahari", "Energi air", "Energi angin"], answer: 0 },
    { id: "m1-04", img: "assets/images/kendaraan-bbm.svg", question: "Kendaraan pada gambar menghasilkan asap karena menggunakan bahan bakar...", options: ["Listrik", "Baterai surya", "Bahan bakar minyak (fosil)", "Angin"], answer: 2 },
    { id: "m1-05", img: "assets/images/panel-surya.svg", question: "Sumber energi pada gambar tergolong energi...", options: ["Fosil", "Terbarukan (matahari)", "Nuklir", "Batu bara"], answer: 1 },
    { id: "m1-06", img: "assets/images/turbin-angin.svg", question: "Alat pada gambar memanfaatkan energi...", options: ["Angin (terbarukan)", "Minyak bumi", "Batu bara", "Gas alam"], answer: 0 },
    { id: "m1-07", img: "assets/images/plta-air.svg", question: "Pembangkit listrik pada gambar memanfaatkan energi...", options: ["Gas alam", "Air (terbarukan)", "Batu bara", "Minyak bumi"], answer: 1 },
    { id: "m1-08", question: "Manakah kelompok yang seluruhnya termasuk energi fosil?", options: ["Batu bara, minyak bumi, gas alam", "Matahari, angin, air", "Batu bara, angin, air", "Minyak bumi, matahari, panas bumi"], answer: 0 },
    { id: "m1-09", question: "Batu bara terbentuk dari...", options: ["Sisa tumbuhan purba yang terkubur jutaan tahun", "Pasir yang mengeras", "Air laut yang membeku", "Logam yang meleleh"], answer: 0 },
    { id: "m1-10", question: "Minyak bumi umumnya diolah menjadi...", options: ["Bensin dan solar", "Air minum", "Pupuk organik", "Kertas"], answer: 0 },
    { id: "m1-11", question: "Mengapa energi fosil disebut tidak dapat diperbarui?", options: ["Karena proses pembentukannya sangat lama", "Karena harganya mahal", "Karena berwarna hitam", "Karena hanya ada di Indonesia"], answer: 0 },
    { id: "m1-12", question: "PLTU adalah pembangkit listrik yang umumnya menggunakan bahan bakar...", options: ["Batu bara", "Sinar matahari", "Angin", "Air terjun"], answer: 0 },
    { id: "m1-13", question: "Gas LPG yang digunakan untuk memasak berasal dari...", options: ["Gas alam/minyak bumi", "Air laut", "Kayu bakar", "Panas bumi"], answer: 0 },
    { id: "m1-14", question: "Berikut ini yang BUKAN termasuk energi fosil adalah...", options: ["Batu bara", "Gas alam", "Energi matahari", "Minyak bumi"], answer: 2 },
    { id: "m1-15", question: "Asap hitam pekat dari cerobong pabrik biasanya dihasilkan dari pembakaran...", options: ["Energi fosil", "Air", "Angin", "Cahaya matahari"], answer: 0 },
    { id: "m1-16", question: "Solar dan bensin termasuk hasil olahan dari...", options: ["Minyak bumi", "Air laut", "Sinar matahari", "Angin"], answer: 0 },
    { id: "m1-17", question: "Salah satu ciri utama energi fosil adalah...", options: ["Jumlahnya terbatas dan proses terbentuknya sangat lama", "Selalu tersedia setiap hari tanpa batas", "Tidak menghasilkan polusi", "Mudah diperbarui dalam hitungan hari"], answer: 0 },
    { id: "m1-18", question: "Negara yang memiliki banyak tambang batu bara biasanya memanfaatkannya untuk...", options: ["Pembangkit listrik dan industri", "Membuat kertas", "Menyiram tanaman", "Membuat pakaian"], answer: 0 },
    { id: "m1-19", question: "Manakah yang termasuk dampak penggunaan energi fosil secara berlebihan?", options: ["Udara semakin bersih", "Pemanasan global dan polusi udara", "Suhu bumi menjadi lebih dingin", "Sumber energi menjadi tidak terbatas"], answer: 1 },
    { id: "m1-20", question: "Gas alam paling sering dimanfaatkan di rumah tangga sebagai...", options: ["Bahan bakar kompor gas", "Bahan bakar mobil listrik", "Sumber cahaya matahari", "Bahan baku panel surya"], answer: 0 }
  ],

  /* =========================================================
     MISI 2 — Drag and Drop Pemanfaatan Energi
     Setiap pasangan: sumber energi (kiri) -> pemanfaatannya (kanan)
     ========================================================= */
  misi2: [
    { id: "m2-01", source: "Batu Bara", usage: "Bahan bakar PLTU (pembangkit listrik)" },
    { id: "m2-02", source: "Minyak Bumi", usage: "Bahan bakar kendaraan bermotor" },
    { id: "m2-03", source: "Gas Alam", usage: "Bahan bakar kompor rumah tangga" },
    { id: "m2-04", source: "Sinar Matahari", usage: "Sumber listrik panel surya" },
    { id: "m2-05", source: "Angin", usage: "Pemutar turbin pembangkit listrik" },
    { id: "m2-06", source: "Air Terjun/Sungai", usage: "Pembangkit Listrik Tenaga Air (PLTA)" },
    { id: "m2-07", source: "Panas Bumi", usage: "Pembangkit Listrik Tenaga Panas Bumi" },
    { id: "m2-08", source: "Bensin", usage: "Bahan bakar sepeda motor dan mobil" },
    { id: "m2-09", source: "Solar (Diesel)", usage: "Bahan bakar mesin diesel dan genset" },
    { id: "m2-10", source: "Baterai Surya", usage: "Menyimpan listrik dari panel surya" },
    { id: "m2-11", source: "Biogas", usage: "Bahan bakar alternatif dari kotoran ternak" },
    { id: "m2-12", source: "LPG (Gas Elpiji)", usage: "Bahan bakar memasak dalam tabung gas" }
  ],

  /* =========================================================
     MISI 3 — Studi Kasus Bergambar (Pilihan Ganda)
     ========================================================= */
  misi3: [
    { id: "m3-01", img: "assets/images/pltu-batubara.svg", case: "Sebuah kota mendapat pasokan listrik utama dari PLTU batu bara. Setiap hari cerobong asap mengeluarkan asap hitam yang membuat udara di sekitarnya terasa sesak.", question: "Apa dampak jangka panjang yang paling mungkin terjadi?", options: ["Kualitas udara menurun dan mencemari lingkungan", "Udara menjadi lebih segar", "Harga listrik otomatis turun drastis", "Tidak ada dampak sama sekali"], answer: 0 },
    { id: "m3-02", img: "assets/images/kendaraan-bbm.svg", case: "Di kota besar, jumlah kendaraan berbahan bakar minyak terus meningkat setiap tahun sehingga jalanan sering macet.", question: "Solusi paling tepat untuk mengurangi dampak tersebut adalah...", options: ["Menambah jumlah kendaraan pribadi", "Meningkatkan penggunaan transportasi umum dan sepeda", "Membiarkan kondisi tetap seperti itu", "Membangun lebih banyak SPBU"], answer: 1 },
    { id: "m3-03", img: "assets/images/panel-surya.svg", case: "Sebuah sekolah di daerah terpencil belum memiliki akses listrik dari PLN, namun daerah tersebut mendapat sinar matahari melimpah sepanjang tahun.", question: "Solusi energi apa yang paling cocok untuk sekolah tersebut?", options: ["Panel surya", "PLTU batu bara", "Genset diesel", "Menunggu jaringan PLN tanpa solusi lain"], answer: 0 },
    { id: "m3-04", img: "assets/images/turbin-angin.svg", case: "Sebuah desa nelayan di pesisir memiliki angin laut yang kencang sepanjang tahun namun sering mati listrik.", question: "Sumber energi terbarukan apa yang paling sesuai dengan kondisi desa tersebut?", options: ["Energi angin (turbin angin)", "Batu bara", "Minyak bumi", "Gas alam"], answer: 0 },
    { id: "m3-05", case: "Sebuah pabrik tekstil menggunakan mesin diesel yang menghabiskan ratusan liter solar setiap hari, sehingga biaya operasional sangat tinggi dan asap knalpot mencemari udara sekitar pabrik.", question: "Langkah bijak yang bisa dilakukan pabrik tersebut adalah...", options: ["Menambah jumlah mesin diesel", "Mengganti sebagian mesin dengan energi terbarukan dan menghemat pemakaian", "Membiarkan mesin menyala terus tanpa perawatan", "Memindahkan pabrik tanpa mengubah sumber energi"], answer: 1 },
    { id: "m3-06", case: "Keluarga Budi selalu membiarkan lampu, TV, dan AC menyala meskipun tidak ada orang di rumah, sehingga tagihan listrik bulanan sangat tinggi.", question: "Apa dampak dari kebiasaan tersebut terhadap penggunaan energi fosil?", options: ["Menghemat energi fosil karena pemakaian listrik sedikit", "Meningkatkan pemborosan energi fosil pembangkit listrik", "Tidak berpengaruh pada energi fosil", "Membuat listrik menjadi terbarukan"], answer: 1 },
    { id: "m3-07", img: "assets/images/plta-air.svg", case: "Sebuah daerah memiliki sungai besar dengan arus deras yang mengalir sepanjang tahun.", question: "Pembangkit listrik apa yang paling potensial dibangun di daerah tersebut?", options: ["PLTA (Pembangkit Listrik Tenaga Air)", "PLTU batu bara", "Kilang minyak", "Pengeboran gas alam"], answer: 0 },
    { id: "m3-08", case: "Kota Ana mengalami krisis akibat polusi udara yang parah karena banyaknya pabrik dan kendaraan yang menggunakan bahan bakar fosil setiap hari.", question: "Tindakan apa yang paling tepat dilakukan pemerintah kota tersebut?", options: ["Membangun lebih banyak pabrik berbahan bakar fosil", "Mendorong penggunaan energi terbarukan dan transportasi ramah lingkungan", "Melarang seluruh warga keluar rumah", "Menaikkan harga bensin tanpa solusi lain"], answer: 1 },
    { id: "m3-09", case: "Sebuah rumah menggunakan kompor gas LPG untuk memasak setiap hari. Suatu ketika stok gas LPG di daerah tersebut menipis karena keterlambatan distribusi.", question: "Hal ini menunjukkan salah satu kelemahan energi fosil, yaitu...", options: ["Selalu tersedia tanpa batas", "Bergantung pada distribusi dan jumlahnya terbatas", "Tidak pernah habis", "Bisa diperbarui dalam sehari"], answer: 1 },
    { id: "m3-10", case: "Petani di sebuah desa memanfaatkan kotoran sapi untuk menghasilkan biogas yang digunakan sebagai bahan bakar memasak, menggantikan sebagian kayu bakar dan gas LPG.", question: "Manfaat utama dari langkah petani tersebut adalah...", options: ["Mengurangi ketergantungan pada energi fosil", "Meningkatkan polusi udara", "Menambah penggunaan bahan bakar minyak", "Tidak memberikan manfaat apa pun"], answer: 0 },
    { id: "m3-11", case: "Sebuah kapal nelayan tradisional menggunakan mesin diesel untuk melaut setiap hari, sehingga biaya bahan bakar menjadi beban besar bagi nelayan.", question: "Solusi hemat energi yang bisa dipertimbangkan untuk nelayan tersebut adalah...", options: ["Mengembangkan mesin kapal bertenaga surya/hybrid", "Menambah kapal bermesin diesel baru", "Melaut lebih sering tanpa perhitungan bahan bakar", "Mengabaikan biaya bahan bakar"], answer: 0 },
    { id: "m3-12", case: "Di sebuah kompleks perumahan, sebagian warga mulai memasang panel surya di atap rumah mereka untuk memenuhi kebutuhan listrik sehari-hari.", question: "Dampak positif dari tindakan warga tersebut adalah...", options: ["Mengurangi ketergantungan pada listrik dari energi fosil", "Menambah polusi udara di lingkungan rumah", "Membuat tagihan listrik menjadi tidak terbatas", "Merusak atap rumah secara permanen"], answer: 0 },
    { id: "m3-13", case: "Sebuah kota besar mewajibkan seluruh angkutan umum menggunakan bus listrik mulai tahun ini untuk mengurangi polusi udara.", question: "Kebijakan tersebut merupakan salah satu bentuk...", options: ["Solusi hemat energi dan ramah lingkungan", "Pemborosan energi fosil", "Peningkatan polusi udara", "Kebijakan yang tidak berkaitan dengan energi"], answer: 0 },
    { id: "m3-14", case: "Setiap malam, lampu jalan di sebuah kota kecil tetap menyala terang meski hari sudah pagi karena sensor otomatisnya rusak dan tidak segera diperbaiki.", question: "Kondisi tersebut termasuk contoh...", options: ["Penghematan energi yang baik", "Pemborosan energi listrik", "Penggunaan energi terbarukan", "Solusi hemat energi"], answer: 1 },
    { id: "m3-15", case: "Sebuah sekolah mengganti seluruh lampu di kelas dengan lampu LED hemat energi dan mengajak siswa mematikan lampu saat kelas kosong.", question: "Manfaat utama dari kebijakan sekolah tersebut adalah...", options: ["Menghemat penggunaan energi listrik", "Menambah tagihan listrik sekolah", "Mempercepat habisnya energi fosil dunia", "Tidak memberi manfaat apapun"], answer: 0 }
  ],

  /* =========================================================
     MISI 4 — Pilih Solusi Terbaik (Checkbox / Multi-select)
     benarIndex berisi seluruh indeks jawaban yang benar
     ========================================================= */
  misi4: [
    { id: "m4-01", case: "Rumah Rani sering meninggalkan charger HP tetap tercolok ke listrik meski tidak dipakai, dan AC menyala sepanjang hari meski ruangan kosong.", question: "Manakah solusi hemat energi yang tepat untuk keluarga Rani? (pilih semua yang benar)", options: ["Mencabut charger saat tidak digunakan", "Mematikan AC saat ruangan kosong", "Membiarkan semua alat elektronik menyala 24 jam", "Menggunakan AC hanya saat diperlukan"], correct: [0, 1, 3] },
    { id: "m4-02", case: "Sekolah ingin mengurangi penggunaan listrik dari sumber energi fosil.", question: "Manakah tindakan yang mendukung tujuan tersebut?", options: ["Memasang panel surya di atap sekolah", "Mengganti lampu biasa dengan lampu LED", "Menyalakan seluruh AC sekolah tanpa henti", "Mematikan komputer saat tidak digunakan"], correct: [0, 1, 3] },
    { id: "m4-03", case: "Keluarga Pak Joko ingin berhemat bahan bakar kendaraan.", question: "Manakah kebiasaan yang membantu menghemat bahan bakar fosil?", options: ["Menggunakan transportasi umum atau bersepeda", "Memanaskan mesin mobil berlebihan setiap hari", "Merawat kendaraan secara rutin", "Mengendarai dengan kecepatan stabil, tidak mendadak"], correct: [0, 2, 3] },
    { id: "m4-04", case: "Sebuah desa ingin mengembangkan sumber energi terbarukan sesuai potensi alamnya yang berbukit dan berangin.", question: "Manakah pilihan energi terbarukan yang sesuai untuk desa tersebut?", options: ["Membangun turbin angin", "Membangun PLTU batu bara baru", "Memasang panel surya tambahan", "Menambah jumlah kendaraan berbahan diesel"], correct: [0, 2] },
    { id: "m4-05", case: "Kantor ingin menghemat penggunaan listrik dan air setiap hari.", question: "Manakah kebiasaan hemat energi yang tepat diterapkan di kantor?", options: ["Mematikan lampu dan komputer setelah jam kerja", "Membuka tirai untuk memanfaatkan cahaya alami", "Membiarkan keran air menyala terus", "Menggunakan alat elektronik hanya saat diperlukan"], correct: [0, 1, 3] },
    { id: "m4-06", case: "Pabrik plastik ingin mengurangi dampak polusi dari penggunaan energi fosil.", question: "Manakah langkah yang tepat dilakukan pabrik tersebut?", options: ["Memasang filter pada cerobong asap", "Menggunakan sebagian energi terbarukan untuk operasional", "Membuang limbah sembarangan ke sungai", "Melakukan audit dan penghematan energi rutin"], correct: [0, 1, 3] },
    { id: "m4-07", case: "Warga kompleks ingin membangun kebiasaan hemat energi di lingkungan rumah.", question: "Manakah pilihan berikut yang termasuk kebiasaan hemat energi yang baik?", options: ["Menjemur pakaian di bawah sinar matahari, bukan mesin pengering", "Menyalakan seluruh lampu taman di siang hari", "Menggunakan peralatan elektronik berlabel hemat energi", "Menutup pintu kulkas dengan rapat setelah digunakan"], correct: [0, 2, 3] },
    { id: "m4-08", case: "Sebuah kota merancang transportasi umum baru untuk mengurangi kemacetan dan polusi.", question: "Manakah rancangan yang mendukung penghematan energi fosil?", options: ["Bus listrik bertenaga baterai", "Menambah jumlah mobil pribadi berbahan bensin", "Jalur khusus sepeda", "Kereta listrik dalam kota"], correct: [0, 2, 3] },
    { id: "m4-09", case: "Petani ingin memanfaatkan limbah pertanian menjadi sumber energi.", question: "Manakah pemanfaatan energi terbarukan yang tepat dari limbah pertanian?", options: ["Mengolah kotoran ternak menjadi biogas", "Membakar seluruh limbah pertanian di lahan terbuka", "Memanfaatkan sekam padi sebagai bahan bakar alternatif", "Membiarkan limbah menumpuk tanpa dimanfaatkan"], correct: [0, 2] },
    { id: "m4-10", case: "Sekolah ingin mengedukasi siswa tentang hemat energi listrik di kelas.", question: "Manakah kebiasaan yang sebaiknya diajarkan kepada siswa?", options: ["Mematikan lampu kelas saat istirahat jika cahaya cukup", "Membiarkan proyektor menyala meski tidak dipakai", "Mencabut kabel alat elektronik setelah digunakan", "Memanfaatkan cahaya matahari melalui jendela"], correct: [0, 2, 3] },
    { id: "m4-11", case: "Sebuah keluarga di daerah pesisir mempertimbangkan sumber energi listrik alternatif karena sering terjadi pemadaman listrik.", question: "Manakah solusi energi terbarukan yang cocok untuk daerah pesisir berangin?", options: ["Turbin angin skala kecil", "Menambah genset diesel sebagai solusi utama jangka panjang", "Panel surya di atap rumah", "Tetap bergantung penuh pada listrik PLN tanpa alternatif"], correct: [0, 2] },
    { id: "m4-12", case: "Pemerintah daerah ingin mengurangi emisi karbon dari sektor transportasi.", question: "Manakah kebijakan yang mendukung pengurangan emisi karbon?", options: ["Subsidi kendaraan listrik", "Menambah pom bensin di setiap sudut kota", "Membangun jalur sepeda yang aman", "Meningkatkan pajak kendaraan berbahan bakar fosil tinggi emisi"], correct: [0, 2, 3] },
    { id: "m4-13", case: "Sebuah rumah tangga ingin mengurangi tagihan listrik bulanan tanpa mengurangi kenyamanan secara berlebihan.", question: "Manakah tindakan yang tepat untuk keluarga tersebut?", options: ["Mengganti seluruh lampu dengan LED hemat energi", "Menyalakan AC pada suhu yang wajar, tidak berlebihan", "Membiarkan televisi menyala sepanjang malam", "Mencabut peralatan elektronik yang tidak digunakan"], correct: [0, 1, 3] },
    { id: "m4-14", case: "Sebuah komunitas ingin membuat proyek energi bersama untuk desa mereka yang memiliki sungai deras.", question: "Manakah pilihan proyek energi yang paling sesuai dengan potensi desa tersebut?", options: ["Membangun PLTA skala mikro/kecil", "Membangun kilang minyak baru", "Menggunakan tenaga air untuk irigasi dan listrik sekaligus", "Mengimpor batu bara dari luar daerah"], correct: [0, 2] },
    { id: "m4-15", case: "Sebuah sekolah ingin menjadi 'Sekolah Hemat Energi' percontohan di kotanya.", question: "Manakah program yang cocok diterapkan sekolah tersebut?", options: ["Kampanye mematikan alat elektronik yang tidak digunakan", "Memasang panel surya untuk sebagian kebutuhan listrik", "Menambah jumlah AC di setiap sudut ruangan", "Edukasi rutin tentang hemat energi kepada siswa"], correct: [0, 1, 3] }
  ],

  /* =========================================================
     MISI 5 — Escape Challenge (Timer 60 detik, soal cepat)
     Format Benar/Salah agar bisa dijawab cepat
     ========================================================= */
  misi5: [
    { id: "m5-01", statement: "Batu bara termasuk sumber energi fosil.", answer: true },
    { id: "m5-02", statement: "Energi matahari dapat diperbarui dan tidak akan habis.", answer: true },
    { id: "m5-03", statement: "Minyak bumi dapat terbentuk kembali dalam waktu satu tahun.", answer: false },
    { id: "m5-04", statement: "PLTU umumnya menggunakan batu bara sebagai bahan bakar utama.", answer: true },
    { id: "m5-05", statement: "Angin adalah salah satu sumber energi terbarukan.", answer: true },
    { id: "m5-06", statement: "Gas LPG untuk memasak berasal dari energi terbarukan.", answer: false },
    { id: "m5-07", statement: "Mematikan lampu saat tidak digunakan adalah bentuk hemat energi.", answer: true },
    { id: "m5-08", statement: "Menggunakan kendaraan pribadi setiap saat lebih hemat energi daripada transportasi umum.", answer: false },
    { id: "m5-09", statement: "Energi fosil terbentuk dari sisa makhluk hidup purba yang terkubur jutaan tahun.", answer: true },
    { id: "m5-10", statement: "Panel surya mengubah cahaya matahari menjadi energi listrik.", answer: true },
    { id: "m5-11", statement: "PLTA memanfaatkan energi angin sebagai sumber utamanya.", answer: false },
    { id: "m5-12", statement: "Pembakaran bahan bakar fosil dapat menyebabkan polusi udara.", answer: true },
    { id: "m5-13", statement: "Biogas dapat dihasilkan dari kotoran hewan ternak.", answer: true },
    { id: "m5-14", statement: "Energi fosil jumlahnya tidak terbatas di alam.", answer: false },
    { id: "m5-15", statement: "Menggunakan lampu LED lebih hemat energi dibanding lampu pijar biasa.", answer: true },
    { id: "m5-16", statement: "Turbin angin menghasilkan listrik dengan cara membakar bahan bakar minyak.", answer: false },
    { id: "m5-17", statement: "Menjemur pakaian di bawah matahari lebih hemat energi daripada memakai mesin pengering.", answer: true },
    { id: "m5-18", statement: "Solar dan bensin merupakan hasil olahan dari gas alam saja, bukan minyak bumi.", answer: false },
    { id: "m5-19", statement: "Pemanasan global berkaitan dengan penggunaan energi fosil yang berlebihan.", answer: true },
    { id: "m5-20", statement: "Mencabut charger HP yang tidak dipakai adalah kebiasaan boros energi.", answer: false },
    { id: "m5-21", statement: "PLTA memanfaatkan aliran air untuk memutar turbin penghasil listrik.", answer: true },
    { id: "m5-22", statement: "Semua energi terbarukan berasal dari bahan bakar fosil.", answer: false },
    { id: "m5-23", statement: "Menghemat energi listrik dapat membantu mengurangi tagihan dan menjaga lingkungan.", answer: true },
    { id: "m5-24", statement: "Gas alam merupakan sumber energi yang tidak dapat diperbarui.", answer: true },
    { id: "m5-25", statement: "Membiarkan televisi menyala sepanjang malam tanpa ditonton adalah tindakan hemat energi.", answer: false }
  ]
};

/* Fisher-Yates Shuffle — dipakai untuk mengacak urutan soal & opsi jawaban */
function fisherYatesShuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTION_BANK, fisherYatesShuffle };
}
