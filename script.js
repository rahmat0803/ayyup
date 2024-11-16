document.addEventListener("DOMContentLoaded", function () {
    // Inisialisasi Peta
    const map = L.map("map").setView([-6.1261842, 120.4642113], 18);

    // Lapisan Peta OSM Standar
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Lapisan Peta Default (jalanBentengku)
    // Inisialisasi peta



    // Tambahkan Kontrol Layer
    const baseMaps = {
        "OSM Standard": osmLayer,
        "Default": map,
    };

    L.control.layers(baseMaps).addTo(map);

    // Data UMKM
    const umkmData = {
        name: "Mie Jebew",
        rating: "4.2",
        reviews: 33,
        category: "Usaha makanan",
        buka: "Buka 07:30 Tutup pukul 21.00",
        alamat: "Jl. Jend. Ahmad Yani No.45, Benteng, Kec. Benteng, Kab. Kepulauan Selayar, Sulawesi Selatan 92812",
        phone: "082",
        coords: [-6.1261842, 120.4642113],
        imageUrl: "./miejebew.jpg",
    };

    // Tambahkan Marker
    const marker = L.marker(umkmData.coords).addTo(map);

    // Tooltip pada Marker
    marker.bindTooltip(umkmData.name, {
        permanent: true,
        direction: "top",
        className: "marker-tooltip",
    });

    // Popup pada Marker
    marker.bindPopup(`
        <div class="popup-container">
            <div class="popup-header">${umkmData.name}</div>
            <div class="popup-rating">⭐ ${umkmData.rating} <span>(${umkmData.reviews})</span></div>
            <div class="popup-category">${umkmData.category}</div>
            <img src="${umkmData.imageUrl}" alt="${umkmData.name}" class="popup-image" />
            <div class="popup-address"><i class="fas fa-map-marker-alt"></i> ${umkmData.alamat}</div>
            <div class="popup-hours"><i class="fas fa-clock"></i> <span>${umkmData.buka}</span></div>
            <div class="popup-contact"><i class="fas fa-phone-alt"></i> ${umkmData.phone}</div>
        </div>
    `);

    // Tambahkan GeoJSON untuk jalanBentengku
    fetch("./jalanBentengku.geojson")
        .then((response) => response.json())
        .then((geojsonData) => {
            L.geoJSON(geojsonData, {
                style: {
                    color: "#ff7800", // Warna garis
                    weight: 3,
                    opacity: 1,
                },
            }).addTo(map);
        })
        .catch((error) =>
            console.error("Error loading jalanBentengku GeoJSON:", error)
        );

    // Tambahkan GeoJSON untuk kecamatanBentengku
    fetch("./kecamatanBentengku.geojson")
        .then((response) => response.json())
        .then((geojsonData) => {
            L.geoJSON(geojsonData, {
                style: {
                    color: "#333", // Warna garis
                    weight: 1.5,
                    opacity: 0.8,
                    fillColor: "#333", // Warna isi
                    fillOpacity: 0.1, // Transparansi isi
                },
            }).addTo(map);
        })
        .catch((error) =>
            console.error("Error loading kecamatanBentengku GeoJSON:", error)
        );
});
