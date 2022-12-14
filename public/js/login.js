// const loginFormHandler = async (event) => {
//   event.preventDefault();

//   // Collect values from the login form
//   const username = document.querySelector('#username-login').value.trim();
//   const password = document.querySelector('#password-login').value.trim();

//   if (username && password) {
//     // Send a POST request to the API endpoint
//     const response = await fetch('/api/users/login', {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       // If successful, redirect the browser to the profile page
//       //document is an object with propterties that have access to a handful of the properties of the browser or window 
//       //but ones especially needed for navigation
//       //Location is the object containing the history of URLs you've been to (ie back button) 
//       //replace current entry with profile
//       document.location.replace('/profile');  //triggers server route called profile
//     } else {
//       alert(response.statusText);
//     }
//   }
// };

// const signupFormHandler = async (event) => {

//   event.preventDefault();

//   console.log("Signup Button Clicked!");

//   const name = document.querySelector('#name-signup').value.trim();
//   const username = document.querySelector('#username-signup').value.trim();
//   const password = document.querySelector('#password-signup').value.trim();

//   console.log(JSON.stringify({ name, username, password }));

//   if (name && username && password) {
//     const response = await fetch('/api/users', {
//       method: 'POST',
//       body: JSON.stringify({ name, username, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/register');
//     } else {
//       alert(response.statusText);
//     }
//   }
// };

// // var signupButton = document.querySelector('.signup-button')
// // var registerContainer = document.querySelector('.register-container')

// // signupButton.addEventListener("click", function() {
// //   registerContainer.style.display = "flex"
// // })

// document
//   .querySelector('.login-form')
//   .addEventListener('submit', loginFormHandler);

// document
//   .querySelector('.signup-form')
//   .addEventListener('submit', signupFormHandler);
