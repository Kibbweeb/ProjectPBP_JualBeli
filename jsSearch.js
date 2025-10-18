// === UNIVERSAL SEARCH FUNCTION ===
document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
  if (keyword) {
    // Simpan kata kunci di localStorage agar bisa dipakai di halaman produk
    localStorage.setItem("searchKeyword", keyword);
    // Arahkan ke halaman produk
    window.location.href = "products.html";
  }
});

// === FILTER PRODUK BERDASARKAN KATA KUNCI ===
window.addEventListener("DOMContentLoaded", function() {
  const keyword = localStorage.getItem("searchKeyword");
  const cards = document.querySelectorAll(".product-card");

  if (keyword && keyword.length > 0) {
    let found = false;
    cards.forEach(card => {
      const title = card.querySelector(".product-title").innerText.toLowerCase();
      if (title.includes(keyword)) {
        card.parentElement.style.display = "block";
        found = true;
      } else {
        card.parentElement.style.display = "none";
      }
    });

    if (!found) {
      const container = document.querySelector(".product-container");
      container.innerHTML = `<p class="text-center mt-4">No products found for "<strong>${keyword}</strong>"</p>`;
    }
  }

  // Hapus kata kunci agar tidak nyangkut
  localStorage.removeItem("searchKeyword");
});