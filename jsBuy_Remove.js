    // ===// Ambil data dari localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    function renderCart() {
      cartItemsContainer.innerHTML = "";
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty lil bro</p>';
        totalDisplay.textContent = "";
        checkoutBtn.classList.add("d-none");
        return;
      }

      let total = 0;

      cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace(/[^\d]/g, ""));
        total += price;

        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="item-info">
            <div class="item-title">${item.title}</div>
            <div class="item-price">${item.price}</div>
          </div>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
      });

      totalDisplay.textContent = "Total: Rp " + total.toLocaleString("id-ID") + ",00";
      checkoutBtn.classList.remove("d-none");
    }

    function removeItem(index) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }

    renderCart();

    checkoutBtn.addEventListener("click", () => {
      alert("Thank you for your purchase! (Simulasi)");
      localStorage.removeItem("cart");
      renderCart();
    });