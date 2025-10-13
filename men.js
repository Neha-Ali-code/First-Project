let menproducts = document.querySelector('#men-products');
console.log(menproducts);

function showSkeletons(count = 9) {
  menproducts.innerHTML = ""; 
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.classList.add("skeleton-card");
    skeleton.innerHTML = `
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-price"></div>
    `;
    menproducts.appendChild(skeleton);
  }
}

let mencategories = [
  "mens-shirts",
  "mens-shoes",
  "mens-watches"
];

const APIcall = async () => {
  try {
    showSkeletons(15);
    let allproducts = [];

    for (let category of mencategories) {
      let response = await fetch(`https://dummyjson.com/products/category/${category}`);
      let data = await response.json();
      allproducts = allproducts.concat(data.products);
    }

    console.log("Fashion Collection:", allproducts);
    menproducts.innerHTML = "";

    allproducts.forEach((product) => {
      let product_card = document.createElement('div');
      product_card.classList.add('product-card');

      product_card.innerHTML = `
        <img class="product-img" src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p class="price">$${product.price}</p>
        <button class="btn">Check Detail</button>
      `;

      const button = product_card.querySelector(".btn");
      button.addEventListener("click", () => {
        localStorage.setItem("men-product-detail", JSON.stringify(product));
        window.location.href = "productDetail.html";
      });

      menproducts.appendChild(product_card);
    });
  } catch (error) {
    let errorMessage = document.createElement('h1');
    errorMessage.innerText = "404 — Products Not Found";
    menproducts.appendChild(errorMessage);
    console.error(error);
  }
};

APIcall();
