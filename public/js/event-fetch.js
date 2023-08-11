// join event
document
  .querySelector("#join-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formObject = {
      name: form.name.value,
      // people: form.people.value,
      // date: form.date.value,
      message: form.message.value,
      join: 
    };
  });
