function updateDateTime() {
  const now = new Date();

  // ambil bagian tanggal & jam
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // format: DD/MM/YYYY HH:MM:SS WIB
  const formatted = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} WIB`;

  document.getElementById("waktutanggal").value = formatted;
}

// Hitung total denda dan penjara berdasarkan checkbox yang dicentang
function hitungTotal() {
  let totalDenda = 0;
  let totalPenjara = 0;

  document.querySelectorAll('.CEKLIS:checked').forEach(checkbox => {
    totalDenda += parseInt(checkbox.getAttribute('data-denda'));
    totalPenjara += parseInt(checkbox.getAttribute('data-penjara'));
  });

  let totalDendaElem = document.getElementById("totalDenda");
  let totalPenjaraElem = document.getElementById("totalPenjara");
  if (totalDendaElem) totalDendaElem.innerText = totalDenda;
  if (totalPenjaraElem) totalPenjaraElem.innerText = totalPenjara;
}

// Pasang event listener pada setiap checkbox
document.querySelectorAll('.CEKLIS').forEach(checkbox => {
  checkbox.addEventListener('change', hitungTotal);
});

// Fungsi submitForm untuk membuat laporan berdasarkan data yang diinput dan checkbox yang dicentang
function submitForm() {
  let namaPelaku = document.getElementById("namaPelaku").value;
  let nik = document.getElementById("nik").value;
  let waktuTanggal = document.getElementById("waktuTanggal").value;
  let lokasi = document.getElementById("lokasi").value;
  let namaPetugas = document.getElementById("namaPetugas").value;
  let pangkat = document.getElementById("pangkat").value;
  let devisi = document.getElementById("devisi").value;
  let narasi = document.getElementById("narasi").value;
  let pasalTerpilih = [];

  // Ambil checkbox yang dicentang dan simpan pasal (kolom pertama pada baris tabel)
  let ceklis = document.querySelectorAll(".CEKLIS:checked");
  ceklis.forEach(item => {
    let row = item.closest("tr");
    let pasal = row.cells[0].innerText;
    pasalTerpilih.push(pasal);
  });

  // Ambil nilai total denda dan penjara dari tampilan
  let totalDendaElem = document.getElementById("totalDenda");
  let totalPenjaraElem = document.getElementById("totalPenjara");
  let totalDenda = totalDendaElem ? totalDendaElem.innerText : 0;
  let totalPenjara = totalPenjaraElem ? totalPenjaraElem.innerText : 0;

  // Buat laporan dalam format HTML menggunakan elemen <p>
  let hasil = `
    <h5>🥷LAPORAN PENANGKAPAN🥷 </h5>
    <p><strong>Nama Pelaku:</strong> ${namaPelaku}</p>
    <p><strong>NIK:</strong> ${nik}</p>
    <p><strong>Waktu & Tanggal:</strong> ${waktuTanggal}</p>
    <p><strong>Pasal yang Dilanggar:</strong> ${pasalTerpilih.join(", ")}</p>
    <p><strong>Lokasi Penangkapan:</strong> ${lokasi}</p>
    <p><strong>Nama Petugas:</strong> ${namaPetugas}</p>
    <p><strong>Pangkat:</strong> ${pangkat}</p>
    <p><strong>Devisi:</strong> ${devisi}</p>
    <p><strong>Narasi:</strong> ${narasi}</p>
    <p><strong>Total Denda:</strong> ${totalDenda}</p>
    <p><strong>Total Penjara:</strong> ${totalPenjara} bulan</p>
  `;

  document.getElementById("history").innerHTML = hasil;

  // Reset input form dan checkbox setelah submit
  document.getElementById("namaPelaku").value = "";
  document.getElementById("nik").value = "";
  document.getElementById("lokasi").value = "";
  document.getElementById("namaPetugas").value = "";
  document.getElementById("pangkat").value = "";
  document.getElementById("devisi").value = "";
  document.getElementById("narasi").value = "";
  document.querySelectorAll('.CEKLIS').forEach(checkbox => checkbox.checked = false);
  hitungTotal();
}


function updateDateTime() {
  let now = new Date();
  let tanggal = now.toLocaleDateString('id-ID');
  let waktu = now.toLocaleTimeString('id-ID');
  document.getElementById("waktuTanggal").value = `${tanggal} ${waktu}`;
}

function submitForm() {
  let namaPelaku = document.getElementById("namaPelaku").value;
  let waktuTanggal = document.getElementById("waktuTanggal").value;
  let deskripsiPelanggaran = document.getElementById("deskripsiPelanggaran").value;
  let hukuman = document.getElementById("hukuman").value;
  let pasal = document.getElementById("pasal").value;
  let denda = document.getElementById("denda").value;
  let fotoKTP = document.getElementById("fotoKTP").value;

  let namaPetugas = document.getElementById("namaPetugas").value;
  let divisi = document.getElementById("divisi").value;
  let jabatan = document.getElementById("jabatan").value;
  let rekan = document.getElementById("rekan").value;

  let barangBukti = document.getElementById("barangBukti").value;

  let hasil = `
<h3>***LAPORAN PENAHANAN***</h3>
<pre>
\`\`\`I. Informasi Penahanan:
- Tanggal dan Waktu Penahanan: ${waktuTanggal}
- Deskripsi Singkat Pelanggaran: ${deskripsiPelanggaran}

II. Informasi Tersangka
- Nama Tersangka       : ${namaPelaku}
- Hukuman/Masa tahanan : ${hukuman}
- Pasal                : ${pasal}
- Denda                : ${denda}
- Foto KTP             : (Terlampir dibawah)

III. Identitas Petugas yang Menahan:
- Nama Petugas  : ${namaPetugas}
- Divisi        : ${divisi}
- Jabatan       : ${jabatan}
- Rekan         : ${rekan}

IV. Barang Bukti yang Disita:
- Jenis Barang Bukti: ${barangBukti}

Note: Sertakan foto KTP & Barang Bukti\`\`\`
</pre>
  `;

  if (fotoKTP) {
    hasil += `<img src="${fotoKTP}" alt="Foto KTP" style="max-width:200px; display:block; margin-top:10px;">`;
  }

  document.getElementById("history").innerHTML = hasil;
}

window.onload = updateDateTime;

// Inisialisasi waktu saat halaman dimuat
window.onload = updateDateTime;

function updateDateTime() {
  let now = new Date();
  let tanggal = now.toLocaleDateString('id-ID');
  let waktu = now.toLocaleTimeString('id-ID');
  document.getElementById("waktuTanggal").value = `${tanggal} ${waktu}`;
}

function updateLaporan() {
  let namaPelaku = document.getElementById("namaPelaku").value;
  let waktuTanggal = document.getElementById("waktuTanggal").value;
  let deskripsiPelanggaran = document.getElementById("deskripsiPelanggaran")?.value || "";
  let fotoKTP = document.getElementById("fotoKTP")?.value || "";

  // Data petugas
  let namaPetugas = document.getElementById("namaPetugas")?.value || "";
  let divisi = document.getElementById("divisi")?.value || "";
  let jabatan = document.getElementById("jabatan")?.value || "";
  let rekan = document.getElementById("rekan")?.value || "";

  // Barang bukti
  let barangBukti = document.getElementById("barangBukti")?.value || "";

  // 🔹 Ambil checkbox yang dicentang
  let ceklis = document.querySelectorAll(".CEKLIS:checked");
  let pasalTerpilih = [];
  let totalDenda = 0;
  let totalPenjara = 0;

  ceklis.forEach(item => {
    let row = item.closest("tr");
    let pasal = row.cells[0].innerText;
    pasalTerpilih.push(pasal);

    totalDenda += parseInt(item.getAttribute("data-denda"));
    let penjaraVal = item.getAttribute("data-penjara");
    if (!isNaN(penjaraVal)) {
      totalPenjara += parseInt(penjaraVal);
    }
  });

  // 🔹 Format output
  let dendaFormatted = totalDenda > 0 ? `$${totalDenda.toLocaleString()}` : "-";
  let hukumanFormatted = totalPenjara > 0 ? `${totalPenjara} Bulan` : "-";
  let pasalFormatted = pasalTerpilih.length > 0 ? pasalTerpilih.join(", ") : "-";

  let hasil = `
<h4>***LAPORAN PENAHANAN***</h4>
<pre>
<h4>\`\`\`I. Informasi Penahanan:
- Tanggal dan Waktu : ${waktuTanggal}
- Deskripsi Singkat Pelanggaran: ${deskripsiPelanggaran}

II. Informasi Tersangka
- Nama Tersangka : ${namaPelaku}
- Masa tahanan : ${hukumanFormatted}
- Pasal        : ${pasalFormatted}
- Denda        : ${dendaFormatted}
- Foto KTP     : (Terlampir dibawah)

III. Identitas Petugas yang Menahan:
- Nama Petugas : ${namaPetugas}
- Divisi       : ${divisi}
- Jabatan      : ${jabatan}
- Rekan        : ${rekan}

IV. Barang Bukti yang Disita:
- Jenis Barang Bukti: ${barangBukti}

Note: Sertakan foto KTP & Barang Bukti\`\`\`</h4>
</pre>
  `;

  if (fotoKTP) {
    hasil += `<img src="${fotoKTP}" alt="Foto KTP" style="max-width:200px; display:block; margin-top:10px;">`;
  }

  document.getElementById("history").innerHTML = hasil;
}

function submitForm() {
  updateLaporan(); // biar laporan final ikut input terbaru
}

// 🔹 Jalankan updateLaporan tiap kali checkbox berubah
document.querySelectorAll('.CEKLIS').forEach(checkbox => {
  checkbox.addEventListener('change', updateLaporan);
});

// Inisialisasi saat load
window.onload = function() {
  updateDateTime();
  updateLaporan();
};

function salinLaporan() {
  let laporanText = document.getElementById("history").innerText;

  navigator.clipboard.writeText(laporanText)
    .then(() => {
      alert("✅ Laporan berhasil disalin ke clipboard!");
    })
    .catch(err => {
      console.error("❌ Gagal menyalin:", err);
    });
}


function salinLaporan() {
  let laporanText = document.getElementById("history").innerText;

  navigator.clipboard.writeText(laporanText)
    .then(() => {
      showPopup(); // tampilkan popup
    })
    .catch(err => {
      console.error("❌ Gagal menyalin:", err);
    });
}

function showPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function otwDiscord() {
  const guildId = "1290282243167748171";   // ID server kamu
  const channelId = "1348720436686356522"; // ID channel kamu

  const laporanText = document.getElementById("history").innerText;

  // 1. Salin otomatis ke clipboard
  navigator.clipboard.writeText(laporanText)
    .then(() => {
      // 2. Setelah tersalin, langsung buka aplikasi Discord (HP → biasanya auto lempar ke app)
      const discordLink = `https://discord.com/channels/${guildId}/${channelId}`;
      window.location.href = discordLink;
    })
    .catch(err => {
      console.error("❌ Gagal menyalin laporan:", err);
      alert("Gagal menyalin laporan!");
    });
}

function playMusicWithDelay(delay) {
  setTimeout(() => {
    document.getElementById("bg-music").play();
  }, delay);
}

// contoh: delay 5 detik
playMusicWithDelay(1000);


function kirimLaporanDenganPassword() {
  Swal.fire({
    title: 'Konfirmasi',
    text: 'Masukkan password sebelum kirim laporan:',
    input: 'password',
    inputPlaceholder: 'Password...',
    showCancelButton: true,
    confirmButtonText: 'Kirim',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      if (result.value === "86") { // ganti password sesuai kebutuhan
        const laporan = document.getElementById("history").innerText;
        const fileInput = document.getElementById("foto").files[0];
        const webhookURL = "https://discord.com/api/webhooks/1420232139143909396/6j24XNYsNPQKjgr0hYXDgabOBciI9aOZNUufZm_s9JpS8yng_cD7UVDDhjwyrfdn2234";

        let formData = new FormData();
        formData.append("content", laporan);
        if (fileInput) formData.append("file", fileInput, fileInput.name);

        fetch(webhookURL, { method: "POST", body: formData })
          .then(res => {
            if (res.ok) {
              Swal.fire("✅ Sukses!", "Laporan berhasil dikirim.", "success");
            } else {
              Swal.fire("❌ Gagal!", "Laporan tidak terkirim.", "error");
            }
          });
      } else {
        Swal.fire("❌ Password salah!", "Laporan dibatalkan.", "error");
      }
    }
  });
  
  function kirimLaporanDenganPassword() {
  Swal.fire({
    title: 'Konfirmasi',
    text: 'Masukkan password sebelum kirim foto:',
    input: 'password',
    inputPlaceholder: 'Password...',
    showCancelButton: true,
    confirmButtonText: 'Kirim',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      if (result.value === "cek") { // ganti password sesuai kebutuhan
        const fileInput = document.getElementById("foto2").files[0];
        const webhookURL = "https://discord.com/api/webhooks/1420232139143909396/6j24XNYsNPQKjgr0hYXDgabOBciI9aOZNUufZm_s9JpS8yng_cD7UVDDhjwyrfdn2234";

        if (!fileInput) {
          Swal.fire("❌ Error", "Tidak ada file yang dipilih.", "error");
          return;
        }

        let formData = new FormData();
        formData.append("file", fileInput, fileInput.name); // Hanya kirim foto, tanpa teks

        fetch(webhookURL, { method: "POST", body: formData })
          .then(res => {
            if (res.ok) {
              Swal.fire("✅ Sukses!", "Foto berhasil dikirim ke Discord.", "success");
            } else {
              Swal.fire("❌ Gagal!", "Foto tidak terkirim.", "error");
            }
          }).catch(err => {
            console.error(err);
            Swal.fire("❌ Error!", "Terjadi kesalahan saat mengirim.", "error");
          });
      } else {
        Swal.fire("❌ Password salah!", "Pengiriman dibatalkan.", "error");
      }
    }
  });
}
}

const webhookURL = "https://discord.com/api/webhooks/1420232139143909396/6j24XNYsNPQKjgr0hYXDgabOBciI9aOZNUufZm_s9JpS8yng_cD7UVDDhjwyrfdn2234";

document.getElementById("kirimBtn").addEventListener("click", function() {
  const overlay = document.getElementById("loadingOverlay");

  Swal.fire({
    title: 'Konfirmasi',
    text: 'Masukkan password sebelum kirim foto:',
    input: 'password',
    inputPlaceholder: 'Password...',
    showCancelButton: true,
    confirmButtonText: 'Kirim',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      if (result.value === "86") { // password valid
        const fileInput = document.getElementById("foto2").files[0];
        if (!fileInput) {
          Swal.fire("❌ Error", "Tidak ada file yang dipilih.", "error");
          return;
        }

        // Tampilkan overlay loading
        overlay.style.display = "block";

        let formData = new FormData();
        formData.append("file", fileInput, fileInput.name);

        fetch(webhookURL, { method: "POST", body: formData })
          .then(res => {
            if (res.ok) {
              Swal.fire("✅ Sukses!", "Foto berhasil dikirim ke Discord.", "success");
            } else {
              Swal.fire("❌ Gagal!", "Foto tidak terkirim.", "error");
            }
          })
          .catch(err => {
            console.error(err);
            Swal.fire("❌ Error!", "Terjadi kesalahan saat mengirim.", "error");
          })
          .finally(() => {
            // Sembunyikan overlay loading
            overlay.style.display = "none";
          });

      } else {
        Swal.fire("❌ Password salah!", "Pengiriman dibatalkan.", "error");
      }
    }
  });
});


function kirimLaporanDenganPassword() {
  const overlay = document.getElementById("loadingOverlay"); // pastikan ada div overlay di HTML

  Swal.fire({
    title: 'Konfirmasi',
    text: 'Masukkan password sebelum kirim laporan:',
    input: 'password',
    inputPlaceholder: 'Password...',
    showCancelButton: true,
    confirmButtonText: 'Kirim',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      if (result.value === "86") { // ganti password sesuai kebutuhan

        // Tampilkan overlay loading
        if (overlay) overlay.style.display = "block";

        const laporan = document.getElementById("history").innerText;
        const fileInput = document.getElementById("foto").files[0];
        const webhookURL = "https://discord.com/api/webhooks/1420232139143909396/6j24XNYsNPQKjgr0hYXDgabOBciI9aOZNUufZm_s9JpS8yng_cD7UVDDhjwyrfdn2234";

        let formData = new FormData();
        formData.append("content", laporan);
        if (fileInput) formData.append("file", fileInput, fileInput.name);

        fetch(webhookURL, { method: "POST", body: formData })
          .then(res => {
            if (res.ok) {
              Swal.fire("✅ Sukses!", "Laporan berhasil dikirim.", "success");
            } else {
              Swal.fire("❌ Gagal!", "Laporan tidak terkirim.", "error");
            }
          })
          .catch(() => Swal.fire("❌ Error!", "Terjadi kesalahan saat mengirim.", "error"))
          .finally(() => {
            if (overlay) overlay.style.display = "none"; // sembunyikan overlay setelah selesai
          });

      } else {
        Swal.fire("❌ Password salah!", "Laporan dibatalkan.", "error");
      }
    }
  });
}

// 🔹 Simpan identitas petugas ke localStorage setiap kali input berubah
function savePetugas() {
  const dataPetugas = {
    namaPetugas: document.getElementById("namaPetugas").value,
    divisi: document.getElementById("divisi").value,
    jabatan: document.getElementById("jabatan").value,
    rekan: document.getElementById("rekan").value,
  };
  localStorage.setItem("identitasPetugas", JSON.stringify(dataPetugas));
}

// 🔹 Load identitas petugas dari localStorage saat halaman dibuka
function loadPetugas() {
  const data = localStorage.getItem("identitasPetugas");
  if (data) {
    const petugas = JSON.parse(data);
    document.getElementById("namaPetugas").value = petugas.namaPetugas || "";
    document.getElementById("divisi").value = petugas.divisi || "";
    document.getElementById("jabatan").value = petugas.jabatan || "";
    document.getElementById("rekan").value = petugas.rekan || "";
  }
}

// 🔹 Event listener untuk auto-save setiap input berubah
["namaPetugas", "divisi", "jabatan", "rekan"].forEach(id => {
  document.getElementById(id).addEventListener("input", savePetugas);
});

// 🔹 Panggil loadPetugas waktu halaman pertama kali dibuka
window.onload = function() {
  updateDateTime();
  updateLaporan();
  loadPetugas(); // isi otomatis identitas petugas
};
function kirimSemua() {
  const overlay = document.getElementById("loadingOverlay");
  const laporan = document.getElementById("history").innerText || "Laporan kosong!";
  const fotoKTP = document.getElementById("foto").files[0];
  const fotoBarang = document.getElementById("foto2").files[0];
  const webhookURL = "https://discord.com/api/webhooks/1420232139143909396/6j24XNYsNPQKjgr0hYXDgabOBciI9aOZNUufZm_s9JpS8yng_cD7UVDDhjwyrfdn2234"; // pastiin ini bener

  Swal.fire({
    title: 'Konfirmasi',
    text: 'Masukkan password sebelum kirim laporan:',
    input: 'password',
    inputPlaceholder: 'Password...',
    showCancelButton: true,
    confirmButtonText: 'Kirim',
    cancelButtonText: 'Batal',
  }).then(async (result) => {
    if (!result.isConfirmed) return;

    if (result.value !== "86") {
      Swal.fire("❌ Password salah!", "Pengiriman dibatalkan.", "error");
      return;
    }

    if (overlay) overlay.style.display = "block";

    try {
      // 1️⃣ Kirim laporan + foto KTP
      let formData1 = new FormData();
      formData1.append("content", laporan);
      if (fotoKTP) formData1.append("file", fotoKTP, fotoKTP.name);

      let res1 = await fetch(webhookURL, { method: "POST", body: formData1 });
      if (!res1.ok) throw new Error("Gagal kirim laporan + KTP");

      // 2️⃣ Kirim barang bukti (jika ada)
      if (fotoBarang) {
        let formData2 = new FormData();
        formData2.append("file", fotoBarang, fotoBarang.name);

        let res2 = await fetch(webhookURL, { method: "POST", body: formData2 });
        if (!res2.ok) throw new Error("Gagal kirim barang bukti");
      }

      Swal.fire("✅ Sukses!", "LAPORAN & FOTO KTP DAN BARANG BUKTI TERKIRIM LEK KU", "success");

    } catch (err) {
      console.error("❌ Error:", err);
      Swal.fire("❌ Error", err.message, "error");
    } finally {
      if (overlay) overlay.style.display = "none";
    }
  });
}


// -------------------------
// SAVE & LOAD IDENTITAS PETUGAS
// -------------------------

function savePetugas() {
  const dataPetugas = {
    namaPetugas: document.getElementById("namaPetugas").value,
    divisi: document.getElementById("divisi").value,
    jabatan: document.getElementById("jabatan").value,
    rekan: document.getElementById("rekan").value,
  };
  localStorage.setItem("identitasPetugas", JSON.stringify(dataPetugas));
}

function loadPetugas() {
  const data = localStorage.getItem("identitasPetugas");
  if (data) {
    const petugas = JSON.parse(data);
    document.getElementById("namaPetugas").value = petugas.namaPetugas || "";
    document.getElementById("divisi").value = petugas.divisi || "";
    document.getElementById("jabatan").value = petugas.jabatan || "";
    document.getElementById("rekan").value = petugas.rekan || "";
  }
}

// 🔹 Pasang event listener supaya auto save saat input berubah
["namaPetugas", "divisi", "jabatan", "rekan"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", savePetugas);
  }
});

// -------------------------
// REFRESH PAGE (tanpa hapus identitas petugas)
// -------------------------
function refreshPage() {
  location.reload(); // cuma reload halaman, localStorage tetap aman
}

// -------------------------
// SAAT PERTAMA KALI HALAMAN DIBUKA
// -------------------------
window.addEventListener("load", () => {
  updateDateTime();
  updateLaporan();
  loadPetugas(); // isi otomatis data petugas dari localStorage
});





