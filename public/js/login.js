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

// check if login or not
async function loginStatus() {
  console.log(`loginstatus function run`);
  let res = await fetch("/role");

  let result = await res.json();

  if (result.error) {
    return;
  }

  console.log(`check login status:`);
  console.log({ result });

  if (result.isLogin) {
    document.querySelector("#login_button").style.display = "none";
    document.querySelector("#signup_button").style.display = "none";
    document.querySelector("#logout_button").style.display = "block";
  } else {
    document.querySelector("#login_button").style.display = "block";
    document.querySelector("#signup_button").style.display = "block";
    document.querySelector("#logout_button").style.display = "none";
  }
}
