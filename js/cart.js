export function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function clearCart() {
  localStorage.removeItem("cart");
}
