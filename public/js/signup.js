document.querySelector(".details-container_primary").addEventListener("submit",async(event)=>{
    event.preventDefault()

    const form = event.target
    const formObject = {
        email: form.email.value,
        password: form.password.value,
        confirmPassword: form.confirmPassword.value,
    }

    const res = await fetch('/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formObject),
    })

    const result = await res.json()
    console.log({ result})
    console.log( typeof result)


    if(res.ok){
        window.location="/category-list.html"
        const message = await response.text();
        alert(message);
    } else {
      // Registration failed
      const clonedResponse = res.clone();
      const error = await clonedResponse.json();
      const errorMessage = error.error;
      const emailInput = document.querySelector("#email");
      const errorElement = document.createElement("div");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = errors[0];
      emailInput.insertAdjacentElement("afterend", errorMessage);
    }
})

// password visiblility
function togglePassword(inputId, iconId) {
    var password = document.getElementById(inputId);
    var icon = document.getElementById(iconId);
    if (password.type === "password") {
      password.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      password.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  }
