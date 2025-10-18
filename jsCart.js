    const buttons = document.querySelectorAll(".choose-btn");
    buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      const title = card.querySelector(".product-title").innerText;
      const price = card.querySelector(".new-price").innerText;
      const image = card.querySelector("img").getAttribute("src");

      const product = { title, price, image };
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${title} added to cart!`);
    });
  });

  // buka modal ketika klik gambar atau judul; isi konten dari element di kartu
  (function () {
    const modalEl = document.getElementById('productModal');
    const bsModal = new bootstrap.Modal(modalEl);

    document.querySelectorAll('.product-card').forEach(card => {
      if (card.closest('.readonly')) ;
      const img = card.querySelector('img');
      const titleEl = card.querySelector('.product-title');

      [img, titleEl].forEach(el => {
        if (!el) return;
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          // jangan buka modal saat klik tombol Add to Cart
          if (e.target.closest('.choose-btn')) return;

          const title = titleEl ? titleEl.innerText.trim() : (img.alt || 'Product');
          const priceEl = card.querySelector('.new-price');
          const price = priceEl ? priceEl.innerText.trim() : '';
          const starsEl = card.querySelector('.stars');
          const stars = starsEl ? starsEl.innerHTML : '';
          const image = img ? img.getAttribute('src') : '';
          const descEl = card.querySelector('.product-description');
          const desc = descEl
            ? (descEl.getAttribute('data-description') || descEl.innerText.trim() || 'No description available.')
            : 'No description available.';

          modalEl.querySelector('#modalTitle').innerText = title;
          modalEl.querySelector('#modalImage').setAttribute('src', image);
          modalEl.querySelector('#modalPrice').innerText = price;
          modalEl.querySelector('#modalStars').innerHTML = stars;
          modalEl.querySelector('#modalDesc').innerText = desc;

          bsModal.show();
        });
      });
    });

    // tombol Add to Cart dalam modal
    document.getElementById('modalAddBtn').addEventListener('click', () => {
      const title = modalEl.querySelector('#modalTitle').innerText;
      const price = modalEl.querySelector('#modalPrice').innerText;
      const image = modalEl.querySelector('#modalImage').getAttribute('src');

      const product = { title, price, image };
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));

      bsModal.hide();
      alert(`${title} added to cart!`);
    });
  })();