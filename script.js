document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.querySelector(".menu-toggle");
  const placeOrderButton = document.querySelector(".place-order");

  // Toggle Sidebar
  toggleButton.addEventListener("click", toggleMenu);

  // Function to toggle the sidebar visibility
  function toggleMenu() {
    const navMenu = document.getElementById("sidebar");
    navMenu.classList.toggle("active"); // Toggle the 'active' class on the sidebar
  }

  // Load Cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalDisplay = document.querySelector(".total");

  let total = 0;

  // Clear existing items
  document.querySelectorAll('.item').forEach(item => item.remove());

  // Add items from cart to the page
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item';

    const name = document.createElement('span');
    name.textContent = item.name;

    const price = document.createElement('span');
    price.textContent = item.price;

    const cancel = document.createElement('button');
    cancel.textContent = "Cancel";
    cancel.addEventListener('click', () => {
      cart.splice(index, 1); // Remove item from cart
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload(); // Reload the page to reflect changes
    });

    div.appendChild(name);
    div.appendChild(price);
    div.appendChild(cancel);
    document.body.insertBefore(div, totalDisplay); // Insert item in the body

    total += parseFloat(item.price.replace('₱', '')); // Update the total price
  });

  totalDisplay.textContent = `Total: ₱${total.toFixed(2)}`;

  // Finalize Order Button
  placeOrderButton.addEventListener('click', () => {
    const deliverySelected = document.querySelector('.buttons .selected');
    const paymentSelected = document.querySelector('.payment .selected');

    if (!deliverySelected || !paymentSelected) {
      alert("Please select both payment and delivery method.");
      return;
    }

    alert("Your order has been placed. Wait for your delivery and enjoy!");
    localStorage.removeItem('cart'); // Clear the cart
    location.reload(); // Reload page to reset the cart
  });

  // Button selection for Delivery / Payment
  document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.buttons button').forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected'); // Mark selected button
    });
  });

  document.querySelectorAll('.payment button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.payment button').forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected'); // Mark selected button
    });
  });
});
