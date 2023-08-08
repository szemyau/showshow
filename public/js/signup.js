document.querySelector("#details-container_primary").addEventListener("submit",async(event)=>{
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

    if(res.ok){
        window.location="/select-category.html"
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
