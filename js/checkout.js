import { getCartItems, clearCart } from "./cart.js";

const cartItems = getCartItems();
const cartContainer = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalEl = document.querySelector(".total");
const checkoutBtn = document.getElementById("checkoutBtn");

function displayCartItems() {
  cartContainer.innerHTML = ""; 
  let total = 0;

  cartItems.forEach((item, index) => {
    const subtotal = item.price;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.title}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>1</td>
      <td>$${subtotal.toFixed(2)}</td>
      <td><button class="remove-btn" data-index="${index}">Remove</button></td>
    `;
    cartContainer.appendChild(row);
  });

  subtotalEl.textContent = `Subtotal: USD $${total.toFixed(2)}`;
  totalEl.textContent = `Order Total (incl. VAT): USD $${(total * 1.25).toFixed(2)}`;

  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.dataset.index;
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      displayCartItems(); 
    });
  });
}

checkoutBtn.addEventListener("click", () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  window.location.href = "confirmation.html";
});

displayCartItems();
