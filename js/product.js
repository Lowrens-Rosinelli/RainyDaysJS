// product.js

import { addToCart } from "./cart.js";

const productContainer = document.querySelector(".product-detail");
const apiURL = "https://api.noroff.dev/api/v1/rainy-days";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  productContainer.innerHTML = "<p>Missing product ID.</p>";
} else {
  fetchProduct(id);
}
async function fetchProduct(productId) {
  productContainer.innerHTML = "<p>Loading product...</p>";

  try {
    const response = await fetch(`${apiURL}/${productId}`);
    const product = await response.json(); 
    displayProduct(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    productContainer.innerHTML = "<p>Something went wrong. Please try again later.</p>";
  }
}
function displayProduct(product) {
  productContainer.innerHTML = `
    <h1>${product.title}</h1>
    <img src="${product.image}" alt="${product.title}" class="product-detail-image">
    <p>${product.description}</p>
    <p>Price: $${product.price}</p>
    <button id="addToCartBtn">Add to Cart</button>
  `;

  const addToCartBtn = document.getElementById("addToCartBtn");
  addToCartBtn.addEventListener("click", function () {
    const productToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    };
    addToCart(productToAdd);
    alert("Product added to cart!");
  });
}
