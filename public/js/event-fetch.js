let parmas = new URLSearchParams(location.search);
let id = parmas.get("id");
console.log({ id });
// join event
document
  .querySelector("#join-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formObject = {
      name: form.name.value,
      // people: form.people.value,
      // date: form.date.value,
      message: form.message.value,
      join: true,
    };

    // ajax to call server
    const res = await fetch(`/event-detail01/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    form.reset();

    // get back data once ready
    const result = await res.json();
    console.log({ result });

    if (result.error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.error,
      }).then(function () {
        window.location = "/login.html";
      });
      return;
    }
    // if no more error, redirect to select category
  });
