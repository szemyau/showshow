//sign up submit call
document
  .querySelector("#signup_form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formObject = {
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };

    // ajax to call server
    const res = await fetch("/signup", {
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
    // add window alert to let client know register successfully by chloe
    await Swal.fire(
      "You have successfully registered!",
      "You clicked the button!",
      "success"
    );
    // if no more error, redirect to select category => change to login.html by chloe
    window.location.href = "/login.html";
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
