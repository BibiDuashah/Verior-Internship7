document.addEventListener("DOMContentLoaded", function () {
  const productGrid = document.getElementById("product-grid");
  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("category-filter");

  const products = [
    {
      title: "Rose T-Shirt",
      price: "$20",
      category: "clothing",
      image: "tshirt.jpg"
    },
    {
      title: "Lemon Sunglasses",
      price: "$15",
      category: "accessories",
      image: "glasses.JFIF"
    },
    {
      title: "Pink Headphones",
      price: "$50",
      category: "electronics",
      image: "headphones.JFIF"
    },
    {
      title: "Summer Hat",
      price: "$18",
      category: "accessories",
      image: "hat.JFIF"
    },
    {
      title: "Tech Watch",
      price: "$80",
      category: "electronics",
      image: "watch.jpg"
    },
    {
      title: "Floral Dress",
      price: "$35",
      category: "clothing",
      image: "dress.JFIF"
    }
  ];

  function renderProducts(productArray) {
    productGrid.innerHTML = "";
    productArray.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" class="product-img" alt="${product.title}">
        <div class="product-details">
          <div class="product-title">${product.title}</div>
          <div class="product-price">${product.price}</div>
          <button class="add-to-cart">Add to Cart</button>
        </div>
      `;
      productGrid.appendChild(card);
    });
  }

  function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = products.filter(product => {
      const matchTitle = product.title.toLowerCase().includes(searchText);
      const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchTitle && matchCategory;
    });

    renderProducts(filtered);
  }

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);

  renderProducts(products);
});
