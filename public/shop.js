fetch('../api/products')
  .then(response => response.json())
  .then(data => {
    const productsList = data.map(product => {
      return `
        <div class="product">
          <h2 class="product-name">${product.product}</h2>
          <p class="product-description">${product.description}</p>
          <p class="product-price">$${product.price}</p>
          <p class="product-quantity">${product.quantity}</p>
        </div>
        <button class="purchaseBtn">Purchase</button>
      `;
    });

    // Insert the list of products into the card element
    const card = document.querySelector('.card');
    card.innerHTML = productsList.join('');  // Join the array of HTML strings into one string
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });
