document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.querySelector(".menu-toggle");
  const placeOrderButton = document.querySelector(".place-order");


  toggleButton.addEventListener("click", toggleMenu);


  function toggleMenu() {
    const navMenu = document.getElementById("sidebar");
    navMenu.classList.toggle("active");
  }


  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalDisplay = document.querySelector(".total");

  let total = 0;

  document.querySelectorAll('.item').forEach(item => item.remove());

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
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    });

    div.appendChild(name);
    div.appendChild(price);
    div.appendChild(cancel);
    document.body.insertBefore(div, totalDisplay);

    total += parseFloat(item.price.replace('₱', ''));
  });

  totalDisplay.textContent = `Total: ₱${total.toFixed(2)}`;

  placeOrderButton.addEventListener('click', () => {
    const deliverySelected = document.querySelector('.buttons .selected');
    const paymentSelected = document.querySelector('.payment .selected');

    if (!deliverySelected || !paymentSelected) {
      alert("Please select both payment and delivery method.");
      return;
    }

    alert("Your order has been placed. Wait for your delivery and enjoy!");
    localStorage.removeItem('cart');
    location.reload();
  });

  document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.buttons button').forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
    });
  });

  document.querySelectorAll('.payment button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.payment button').forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
    });
  });
});
