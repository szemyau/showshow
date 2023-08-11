//login submit call
document
  .querySelector("#login_form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formObject = {
      email: form.email.value,
      password: form.password.value,
    };

    // ajax to call server
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    // get back data once ready
    const result = await res.json();
    console.log({ result });

    if (result.error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.error,
      });
      return;
    }

    // if no more error, redirect to select category
    window.location.href = "/home.html";
  });

// password visiblility (the eye)
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
