document.getElementById('placeOrder').addEventListener('click', function(e) {
  e.preventDefault();

  // Example required fields
  const firstnameEl = document.getElementById('firstName');
  const lastnameEl = document.getElementById('lastName');
  const emailEl = document.getElementById('email');
  const numberEl = document.getElementById('number');
  const addressEl = document.getElementById('address');
  const cityEl = document.getElementById('city');
  const countryEl = document.getElementById('country');
  const zipEl = document.getElementById('zip');
  const sAddressEl = document.getElementById('s_address');
  const cardNumberEl = document.getElementById('card');
  const expDateEl = document.getElementById('exp');
  const cvvEl = document.getElementById('cvv');

  const firstname = firstnameEl.value.trim();
  const lastname = lastnameEl.value.trim();
  const email = emailEl.value.trim();
  const number = numberEl.value.trim();
  const address =  addressEl.value.trim();
  const city =  cityEl.value.trim();
  const country =  countryEl.value.trim();
  const zip =  zipEl.value.trim();
  const sAddress = sAddressEl.value.trim();
  const cardNumber = cardNumberEl.value.trim();
  const expDate = expDateEl.value.trim();
  const cvv = cvvEl.value.trim();

  if (
    firstname == '' &&
    address == '' &&
    email == '' &&
    lastname == '' &&
    number == '' &&
    city == '' &&
    country == '' &&
    zip == ''&&
    sAddress == '' ||
    cardNumber == '' ||
    expDate == '' ||
    cvv == ''
  ) {
    alert('Please fill in all required fields.');
    
     
  } else {
    alert('Order placed successfully!');
     localStorage.clear()
    // Optionally, redirect or reset form
    window.location.href = 'index.html';
  }
});