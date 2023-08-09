const loginForm = document.querySelector('#login_submit');
const errorMessage = document.querySelector("#error-message");

console.log({loginForm})

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const response = await fetch('/login', {
    method: 'POST',
    body: formData
  });
  const result = await response.text();
  
  alert(result);
  console.log({result})

  if (res.ok) {
    window.location = "/home.html";
    const message = await response.text();
    alert(message);
  } else {
    // Login failed
    const errorMessage = await response.text();
    alert(errorMessage);
  }
});

