const apiURL = "https://api.noroff.dev/api/v1/rainy-days";
const productsContainer = document.querySelector(".products");

async function fetchProducts() {
  productsContainer.innerHTML = "<p>Loading products... :)</p>";

  try {
    const response = await fetch(apiURL);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    productsContainer.innerHTML = "<p>I'm still a noob, please have patience. Thank you! 🙏</p>";
  }
}

function displayProducts(products) {
  const currentPage = window.location.pathname;
  let productsToShow = products;

  if (currentPage.includes("index.html") || currentPage === "/") {
    productsToShow = products.slice(0, 3); 
  }

  renderProducts(productsToShow);


  if (currentPage.includes("shop-all.html")) {
    setupFilter(products);
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = ""; 

  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <h3>${product.title}</h3>
      <p class="price">$${product.price}</p>
      <a href="product.html?id=${product.id}" class="view-product-btn">View Product</a>
    `;

    productsContainer.appendChild(productCard);
  });
}
function setupFilter(allProducts) {
  const filterSelect = document.getElementById("genderFilter");
  if (!filterSelect) return;

  filterSelect.addEventListener("change", () => {
    const selected = filterSelect.value;

    const filtered = selected === "all"
      ? allProducts
      : allProducts.filter(product => product.gender === selected);

    renderProducts(filtered);
  });
}

fetchProducts();
