let PD = document.querySelector('#all-products');
console.log(PD);

function showSkeletons(count = 9) {
  PD.innerHTML = ""; 
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.classList.add("skeleton-card");
    skeleton.innerHTML = `
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-price"></div>
    `;
    PD.appendChild(skeleton);
  }
}

const clothingCategories = [
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'womens-dresses',
  'womens-shoes',
  'womens-jewellery'
];

const APIcall = async () => {
  try {
     showSkeletons(24)
    let allClothing = [];

    for (let category of clothingCategories) {
      let response = await fetch(`https://dummyjson.com/products/category/${category}`);
      let data = await response.json();
      allClothing = allClothing.concat(data.products);
    }

    console.log("🧥 Fashion Collection:", allClothing);
   PD.innerHTML = ""
    
    allClothing.forEach((product) => {
      let product_card = document.createElement('div');
      product_card.classList.add('product-card');

      product_card.innerHTML = `
        <img class="product-img" src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p class="price">$${product.price}</p>
        <button class="btn">Check Details</button>
      `;

      const button = product_card.querySelector(".btn")
button.addEventListener ("click", ()=> {
   localStorage.setItem("product-detail", JSON.stringify(product));
   setTimeout(() => {
    window.location.href = `productDetail.html?id=${product.id}`;
  }, 100);
});

      PD.appendChild(product_card);
    });

  } catch (error) {
    let errorMessage = document.createElement('h1');
    errorMessage.innerText = "404 — Products Not Found";
    PD.appendChild(errorMessage);
    console.log(error);
  }
};




APIcall();

