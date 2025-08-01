const endpoint = 'https://script.google.com/macros/s/YOUR_DEPLOYED_WEBAPP_URL/exec'; // Ganti dengan URL kamu

async function loadFeed() {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    const feedContainer = document.getElementById("feed");
    feedContainer.innerHTML = '';

    data.reverse().forEach(entry => {
      const card = document.createElement("div");
      card.className = "feed-card";

      const photo = document.createElement("img");
      photo.src = entry["Link Foto"];

      const info = document.createElement("div");
      info.className = "info";
      info.innerHTML = `
        <p><strong>${entry["Nama Pekerja"]}</strong> - ${entry["Activity"]}</p>
        <p>📍 <a href="https://maps.google.com/?q=${entry.Latitude},${entry.Longitude}" target="_blank">Lihat Lokasi</a></p>
        <p>👤 ${entry["Nama Nasabah"]}</p>
        <p>🕒 ${entry.Timestamp || ""}</p>
      `;

      card.appendChild(photo);
      card.appendChild(info);
      feedContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
}

window.onload = loadFeed;
