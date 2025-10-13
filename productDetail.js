 let product = JSON.parse(localStorage.getItem("product-detail"));

    const container = document.querySelector("#product-details");

    if (product) {
      container.innerHTML = `
        <div class="detail-card">
          <img src="${product.thumbnail}" alt="${product.title}" class="detail-img">
          <div class="detail-info">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p class="price">Price: $${product.price}</p>
            <button onclick="history.back()" class="btn">Back to Products</button>
            <button><a href "" alt "">Add to Cart</a></button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `<h2>No product selected!</h2>`;
    }