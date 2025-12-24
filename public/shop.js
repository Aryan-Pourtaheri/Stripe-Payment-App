fetch('/api/products')
  .then(response => {
    console.log('Response Status:', response.status);  // Log the status code
    return response.text();  // Read the response as text first
  })
  .then(text => {
    try {
      const data = JSON.parse(text);  // Try to parse the text as JSON
      const productsList = data.map(product => {
        return `
          <div class="card">
            <div class="product">
              <h2 class="product-name">${product.product}</h2>
              <p class="product-description">${product.description}</p>
              <p class="product-price">$${(product.price / 100).toFixed(2)}</p>
              <p class="product-quantity">${product.quantity} left</p>
            </div>
            <button class="purchaseBtn">Purchase</button>
          </div>
        `;
      });

      // Insert the list of products into the card element
      const card = document.querySelector('.card-container');
      card.innerHTML = productsList.join('');
    } catch (error) {
      console.error('Error parsing JSON:', error);
      console.log('Received response:', text);  // Log the actual response for debugging
    }
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });
