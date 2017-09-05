(function() {
  'use strict';
  const form = document.getElementById('sign_up_form');
  const firstName = document.getElementById('first_name');
  const lastName = document.getElementById('last_name');
  const email = document.getElementById('email');
  const dob = document.getElementById('date_of_birth');
  const psw = document.getElementById('password');
  const greeting = document.querySelector('.greeting');
  const successDiv = document.querySelector('.success_message');
  window.onload = function() {
    if (!document.cookie) {
      form.addEventListener('submit', function(e) {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        formData.append('firstName', firstName.value);
        formData.append('lastName', lastName.value);
        formData.append('email', email.value);
        formData.append('DOB', dob.value);
        formData.append('password', psw.value);

        xhr.onload = function() {
          form.classList.add('submitted');
          successDiv.innerHTML = JSON.parse(xhr.response).data;
          document.cookie = `name=${firstName.value}`;
          console.log(document.cookie);
        };

        xhr.open('POST', '/create_account');
        xhr.send(formData);

        e.preventDefault();
      });
    } else {
      form.classList.add('is-hidden');
      let user = getCookies();
      greeting.innerHTML = `<h2>Welcome back ${user.name}!</h2>`
    }
  }

  function getCookies() {
    var cookieArray = document.cookie.split(';');
    var cookieObj = {};
    cookieArray.forEach(function(item) {
      var key = item.substring(0, item.indexOf('='));
      var value = item.substring(item.indexOf('=') + 1);
      cookieObj[key] = value;
    });
    return cookieObj;
  }

})();